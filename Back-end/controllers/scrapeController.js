const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = class AmazonScraper {
    // Static method to scrape Amazon based on the provided keyword
    static async scrapeAmazon(keyword) {
        // User-Agent string to mimic a real browser request
        const userAgent =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

        // Configuration object for the axios request
        const config = {
            headers: {
                "User-Agent": userAgent,
            },
        };

        console.log("Requesting Amazon with keyword:", keyword);
        try {
            // Construct the URL with the encoded keyword
            const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
            // Make an HTTP GET request to Amazon
            const response = await axios.get(url, config);

            // Array to store the extracted products
            const products = [];

            // Parse the response data using JSDOM
            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            // Select all product result items
            const items = document.querySelectorAll("div.s-result-item");

            // Iterate over each product item and extract details
            items.forEach((item) => {
                // Extract the product title
                const titleElement = item.querySelector("h2.a-size-mini");
                const title = titleElement
                    ? titleElement.textContent.trim()
                    : "N/A";

                // Extract the product rating
                const ratingElement = item.querySelector("span.a-icon-alt");
                const rating = ratingElement
                    ? ratingElement.textContent.trim().split(" ")[0]
                    : "N/A";

                // Extract the number of reviews
                const reviewsElement = item.querySelector("span.a-size-base");
                const reviews = reviewsElement
                    ? reviewsElement.textContent.trim()
                    : "N/A";

                // Extract the product image URL
                const imageElement = item.querySelector("img.s-image");
                const image = imageElement ? imageElement.src : "N/A";

                // Check if all details are available and add to products array
                if (
                    title !== "N/A" &&
                    rating !== "N/A" &&
                    reviews !== "N/A" &&
                    image !== "N/A"
                ) {
                    products.push({ title, rating, reviews, image });
                }
            });
            console.log("Scraped Amazon successfully");

            // Return the array of products
            return products;
        } catch (error) {
            // Log any errors that occur during the scraping process
            console.error("Error scraping Amazon:", error);
            // Throw a new error with a custom message
            throw new Error("Failed to scrape Amazon: " + error.message);
        }
    }
};
