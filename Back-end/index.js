const express = require('express');
const app = express();
const port = 3000 || 3001;
const scrapeRouter = require('./routes/scrapeRoutes');
const cors = require('cors');
require('dotenv').config();

// Configure CORS options
const corsOptions = {
  origin: process.env.FRONT_URL
};
app.use(cors(corsOptions));

// Parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up route for '/api' using scrapeRouter
app.use('/api', scrapeRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});