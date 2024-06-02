# Amazon Scraper API

## Description

The Amazon Scraper API is a tool created to extract data from Amazon products based on a provided keyword. This API was developed using Node.js and some important libraries, such as `axios` for making HTTP requests and `jsdom` for DOM manipulation and data extraction. The purpose of this API is to provide an efficient way to obtain information about Amazon products for various purposes, such as market analysis, price research, and more.

## Technologies Used

- **Node.js**: Development platform used for the API backend.
- **Express.js**: Framework for creating HTTP servers and routing.
- **Axios**: Library for making HTTP requests.
- **jsdom**: Library for DOM manipulation in Node.js, allowing data extraction from web pages.
- **Cors**: Middleware to allow access from different origins.

## Features

- **Amazon Product Scraping**: Extracts information about products such as title, rating, number of reviews, and image based on a keyword.
- **API Endpoint**: Provides a `/scrape` endpoint that accepts a keyword as a parameter and returns the extracted data.

## Response Format

The API returns a list of products, where each product is represented by a JSON object containing the following properties:

- **title**: Product title.
- **rating**: Product rating.
- **reviews**: Number of product reviews.
- **image**: Product image URL.

### Response Example

```json
[
    {
        "title": "Example Product 1",
        "rating": "4.5",
        "reviews": "150",
        "image": "https://example.com/image1.jpg"
    },
    {
        "title": "Example Product 2",
        "rating": "4.0",
        "reviews": "200",
        "image": "https://example.com/image2.jpg"
    }
]
```

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Installation Steps

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/plyrio/amazon-scraper-api.git
    ```
2. Navigate to the project directory.
    ```sh
    cd amazon-scraper-api
    ```
3. Install the project dependencies.
    ```sh
    npm install
    ```

## Usage

1. Start the server.
    ```sh
    npm start
    ```
    You will see a message in the console indicating that the server is running on port 3000 (or 3001).

2. Access the API via browser or a request tool (such as Postman). Use the `/api/scrape` endpoint with the `keyword` parameter.

### Request Example

```sh
GET http://localhost:3000/api/scrape?keyword=laptop
```


## Expected Response

The response will be a list of products that match the keyword "laptop", with detailed information as described earlier.

## Data Handling

The data is processed and filtered to ensure that only products with all necessary information (title, rating, number of reviews, and image) are returned. Any errors during the scraping process are captured, and a 500 (Internal Server Error) is returned to the client.