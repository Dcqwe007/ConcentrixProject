// Get elements from DOM
const buttons = document.querySelectorAll('.nav-btn');
const iframe = document.getElementById('site-panel');
const placeholder = document.getElementById('placeholder');
const searchInput = document.getElementById('dashboard-search');
const searchButton = document.getElementById('search-submit-btn');

// --- LOGIN LOGIC ---
const loginButton = document.getElementById('login-button');
const loginOverlay = document.getElementById('login-overlay');
const leftNavbar = document.querySelector('.left-navbar');
const mainContainer = document.querySelector('.main-container');

loginButton.addEventListener('click', () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    // Checks if fields are not empty
    if (user !== "" && pass !== "") {
        loginOverlay.style.display = 'none';
        leftNavbar.style.display = 'flex';
        mainContainer.style.display = 'flex';
    } else {
        alert("Please enter both username and password to log in.");
    }
});

// --- SIDEBAR FUNCTIONALITY ---
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'active' class from all buttons and add to the clicked one
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Get the URL from the data-url attribute
        const targetUrl = this.getAttribute('data-url');

        // Hide the placeholder text and show the iframe panel
        placeholder.style.display = 'none';
        iframe.style.display = 'block';

        // Change the iframe source to load the target website inside the dashboard
        iframe.src = targetUrl;
    });
});

// --- OPTIONAL SEARCH FUNCTIONALITY ---
function executeSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") return;

    let matchFound = false;
    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(query) && !matchFound) {
            button.click(); // Automatically trigger the sidebar click logic
            matchFound = true;
        }
    });

    if (!matchFound) {
        placeholder.style.display = 'none';
        iframe.style.display = 'block';
        iframe.src = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchInput.value.trim())}`;
    }
}

// Trigger search on button click
searchButton.addEventListener('click', executeSearch);

// Trigger search when pressing "Enter" key inside the search bar box
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        executeSearch();
    }
});