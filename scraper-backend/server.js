const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scrapeMedium = require('./scraper.js');
const app = express();
const port = 5005;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());

const mongoURI = 'mongodb+srv://priyakiruthi21:S3mDeVjsPR4QyEPW@procuzydatacluster.tps4peq.mongodb.net/?retryWrites=true&w=majority&appName=procuzydatacluster';


const articleSchema = new mongoose.Schema({
    h2: String,
    h3: String,
    author: String,
    publicationDate: String,
    url: String
});

const Article = mongoose.model('Article', articleSchema);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

    
app.post('/scrape', async (req, res) => {
    const { topic } = req.body;
    try {
        const articles = await scrapeMedium(topic);
        console.log(articles);

        const savedArticles = await Article.insertMany(articles);
        console.log(`${savedArticles.length} articles saved to MongoDB`);

        res.send(savedArticles);
    } catch (error) {
        console.error('Error scraping and storing articles:', error);
        res.status(500).json({ error: 'Failed to scrape and store Medium articles' });
    }
});

app.get('/scrape', async (req, res) => {
    const { topic } = req.query;
    try {
        const articles = await scrapeMedium(topic);
        console.log(articles);

        const savedArticles = await Article.insertMany(articles);
        console.log(`${savedArticles.length} articles saved to MongoDB`);

        res.send(savedArticles);
    } catch (error) {
        console.error('Error scraping and storing articles:', error);
        res.status(500).json({ error: 'Failed to scrape and store Medium articles' });
    }
});

app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find().limit(5);
        console.log("success");
        res.send(articles);
    } catch (error) {
        console.error('Error fetching articles from MongoDB:', error);
        res.status(500).json({ error: 'Failed to fetch articles from MongoDB' });
    }
});
