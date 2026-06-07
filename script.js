// Get elements from DOM
const buttons = document.querySelectorAll('.nav-btn');
const iframe = document.getElementById('site-panel');
const placeholder = document.getElementById('placeholder');
const searchInput = document.getElementById('dashboard-search');
const searchButton = document.getElementById('search-submit-btn');
const backBtn = document.getElementById('back-to-dash-btn');

// --- LOGIN LOGIC ---
const loginButton = document.getElementById('login-button');
const loginOverlay = document.getElementById('login-overlay');
const leftNavbar = document.querySelector('.left-navbar');
const mainContainer = document.querySelector('.main-container');
const displayUsername = document.getElementById('display-username');
const logoutBtn = document.getElementById('logout-btn');

loginButton.addEventListener('click', () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user !== "" && pass !== "") {
        displayUsername.textContent = user;
        loginOverlay.style.display = 'none';
        leftNavbar.style.display = 'flex';
        mainContainer.style.display = 'flex';

        // Check for IT Ops role
        if (user.toLowerCase() === 'dominic.carreon@concentrix.com' || user.toLowerCase().includes('it')) {
            document.querySelectorAll('.it-ops-only').forEach(btn => {
                btn.style.display = 'flex';
            });
            document.querySelector('#placeholder h1').innerText = "Welcome to IT Ops Dashboard";
        } else {
            document.querySelectorAll('.it-ops-only').forEach(btn => {
                btn.style.display = 'none';
            });
            document.querySelector('#placeholder h1').innerText = "Welcome to Concentrix PH Hub";
        }
    } else {
        alert("Please enter both username and password to log in.");
    }
});

// --- LOGOUT LOGIC ---
logoutBtn.addEventListener('click', () => {
    // Reset login fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Show login overlay, hide dashboard
    loginOverlay.style.display = 'flex';
    leftNavbar.style.display = 'none';
    mainContainer.style.display = 'none';

    // Reset iframe and placeholder
    iframe.src = '';
    iframe.style.display = 'none';
    placeholder.style.display = 'flex';
    backBtn.style.display = 'none';
    
    // Clear active buttons
    buttons.forEach(btn => btn.classList.remove('active'));
});

// --- SIDEBAR FUNCTIONALITY ---
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'active' class from all buttons and add to the clicked one
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Get the URL from the data-url attribute
        const targetUrl = this.getAttribute('data-url');

        // Hide placeholder and show iframe
        placeholder.style.display = 'none';
        iframe.style.display = 'block';
        backBtn.style.display = 'flex';

        // Load the website inside the dashboard panel
        iframe.src = targetUrl;
    });
});

// --- BACK BUTTON FUNCTIONALITY ---
backBtn.addEventListener('click', () => {
    // Clear the iframe and hide it
    iframe.src = '';
    iframe.style.display = 'none';
    
    // Show the welcome background and hide the back button
    placeholder.style.display = 'flex';
    backBtn.style.display = 'none';
    
    // Remove the highlight class from all sidebar buttons
    buttons.forEach(btn => btn.classList.remove('active'));
});

// --- OPTIONAL SEARCH FUNCTIONALITY ---
// This takes whatever you type and looks it up inside Google right inside your dashboard panel layout
function executeSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") return;

    let matchFound = false;
    buttons.forEach(button => {
        // Skip hidden buttons so normal users can't search them
        if (window.getComputedStyle(button).display === 'none') return;

        if (button.textContent.toLowerCase().includes(query) && !matchFound) {
            button.click(); // Automatically trigger the navigation logic
            matchFound = true;
        }
    });

    if (!matchFound) {
        placeholder.style.display = 'none';
        iframe.style.display = 'block';
        iframe.src = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchInput.value.trim())}`;
        backBtn.style.display = 'flex';
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
