const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = class AmazonScraper {
    static userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1"
    ];

    static getRandomUserAgent() {
        return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    }

    static async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async scrapeAmazon(keyword) {
        const userAgent = this.getRandomUserAgent();
        
        const config = {
            headers: {
                "User-Agent": userAgent,
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Connection": "keep-alive",
                "DNT": "1",
                "Upgrade-Insecure-Requests": "1",
            },
        };

        console.log("Requesting Amazon with keyword:", keyword);
        try {
            const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
            await this.delay(Math.floor(Math.random() * 3000) + 1000); // Delay between 1-4 seconds
            const response = await axios.get(url, config);

            const products = [];
            const virtualConsole = new jsdom.VirtualConsole();
            virtualConsole.sendTo(console, { omitJSDOMErrors: true });
            const dom = new JSDOM(response.data, { virtualConsole });

            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            const items = document.querySelectorAll("div.s-result-item");

            items.forEach((item) => {
                const titleElement = item.querySelector("h2.a-size-mini");
                const title = titleElement ? titleElement.textContent.trim() : "N/A";

                const ratingElement = item.querySelector("span.a-icon-alt");
                const rating = ratingElement ? ratingElement.textContent.trim().split(" ")[0] : "N/A";

                const reviewsElement = item.querySelector("span.a-size-base");
                const reviews = reviewsElement ? reviewsElement.textContent.trim() : "N/A";

                const imageElement = item.querySelector("img.s-image");
                const image = imageElement ? imageElement.src : "N/A";

                if (title !== "N/A" && rating !== "N/A" && reviews !== "N/A" && image !== "N/A") {
                    products.push({ title, rating, reviews, image });
                }
            });

            console.log("Scraped Amazon successfully");
            return products;
        } catch (error) {
            console.error("Error scraping Amazon:", error);
            throw new Error("Failed to scrape Amazon: " + error.message);
        }
    }
};
