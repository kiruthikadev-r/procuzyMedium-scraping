import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';

function App() {
    const [topic, setTopic] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScrape = async () => {
        if (!topic) {
            setError('Topic is required');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:5005/scrape', { topic });
            setArticles(response.data);
        } catch (error) {
            setError('Failed to scrape articles');
        }
        setLoading(false);

    };


    return (
        <div className="container">
            <h1 className="header">Medium Article Scraper</h1>
            <div className="input-group">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic"
                />
                <button className="scrape-button" onClick={handleScrape}>Scrape Articles</button>
            </div>
            {loading && 
            <div className="loader-container">
            <ClipLoader color={"#36D7B7"} loading={loading} size={50}/>
            </div>}
            {error && <p className="error-message">*{error}</p>}
            <ul className="article-list">
                {articles.map((article, index) => (
                    <li className="article-item" key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <h2 className="article-heading">Heading: {article.h2}</h2>
                            <p className="article-description">Description: {article.h3}</p>
                            <p className="article-author">Author: {article.author}</p>
                            <p className="article-date">Date of publication: {article.publicationDate}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}

export default App;
