Introduction
Procuzy Medium Scraping is a Node.js project that scrapes Medium articles using Puppeteer and displays the scraped data in a frontend application built with React. This project aims to provide an easy way to collect and visualize Medium articles.

Features
Scrape Medium articles using Puppeteer
Store scraped data in MongoDB Atlas
Display the articles in a user-friendly frontend application
Efficient scraping with error handling and data validation
Tech Stack
Frontend: React.js, Axios, Bootstrap
Backend: Node.js, Express.js, Puppeteer
Database: MongoDB Atlas
Styling: CSS, Bootstrap
Installation
Prerequisites
Make sure you have the following installed on your system:

Node.js
MongoDB Atlas account
Backend Setup
Clone the repository:

bash

git clone https://github.com/kiruthikadev-r/procuzyMedium-scraping.git
cd procuzyMedium-scraping/backend
Install the required dependencies:

bash

npm install
Create a .env file in the backend directory and add your MongoDB Atlas connection string:

env

MONGODB_URI=your_mongodb_atlas_connection_string
Start the backend server:

bash

npm start
Frontend Setup
Navigate to the frontend directory:

bash

cd ../frontend
Install the required dependencies:

bash

npm install
Start the frontend application:

bash

npm start
Usage
Ensure that both the backend server and frontend application are running.
Open your browser and navigate to http://localhost:3000.
Use the interface to scrape Medium articles and view the results.


Project Structure

procuzyMedium-scraping/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── app.js
│   ├── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
├── README.md

