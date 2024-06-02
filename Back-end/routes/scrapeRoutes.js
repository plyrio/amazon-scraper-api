const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

// Root route for the API that provides a welcome message and usage instructions
router.get('/', (req, res) => {
  return res.send(
    'Welcome to the Amazon Scraper API! Please use the /API/scrape?keyword={} endpoint to scrape data.'
  );
});

// Scrape route that takes a keyword as a query parameter
router.get('/scrape', async (req, res) => {
    // Extract the keyword from the query parameters
    const keyword = req.query.keyword;

    try {
        // Call the scrapeAmazon method from the scrapeController with the keyword
        const products = await scrapeController.scrapeAmazon(keyword);
        // Send the scraped products as a JSON response
        res.json(products);
    } catch (error) {
        // Log any errors that occur during the scraping process
        console.error('Error scraping Amazon:', error);
        // Send a 500 Internal Server Error response with an error message
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
