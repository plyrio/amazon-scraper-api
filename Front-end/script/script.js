// Define the API URL for the backend endpoint
const API_URL = 'https://amazon-scraper-api-e84u.onrender.com';

// Add an event listener to the search button to trigger a function when clicked
document.getElementById('search-btn').addEventListener('click', function () {
    // Get the keyword input value from the search field
    const keyword = document.getElementById('keyword-input').value;

    // Make an AJAX call to the backend endpoint using the Fetch API
    fetch(API_URL + `/api/scrape?keyword=${keyword}`)
        .then(response => response.json()) // Convert the response to JSON
        .then(data => {
            displayProducts(data); // Pass the JSON data to the displayProducts function
        })
        .catch(error => console.error('Error fetching products:', error)); // Handle any errors
});

// Function to display the products on the webpage
function displayProducts(products) {
    // Get the container element where the products will be displayed
    const productsContainer = document.getElementById('products-container');
    // Clear any existing content in the products container
    productsContainer.innerHTML = '';

    // Iterate over each product in the products array
    products.forEach(product => {
        // Create a new div element for each product card
        const productCard = document.createElement('div');
        // Add a class to the product card for styling
        productCard.classList.add('product-card');
        // Set the inner HTML of the product card with product details
        productCard.innerHTML = `
<div class="card mb-3" style="max-width: 100vw;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">Rating: ${product.rating}</p>
        <p class="card-text">Reviews: ${product.reviews}</p>
      </div>
    </div>
  </div>
</div>
        `;
        // Append the product card to the products container
        productsContainer.appendChild(productCard);
    });
}
