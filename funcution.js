// Get elements from DOM
const buttons = document.querySelectorAll('.nav-btn');
const iframe = document.getElementById('site-panel');
const placeholder = document.getElementById('placeholder');
const searchInput = document.getElementById('dashboard-search');
const searchButton = document.getElementById('search-submit-btn');

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
// This takes whatever you type and looks it up inside Google right inside your dashboard panel layout
function executeSearch() {
    const query = searchInput.value.trim();
    if (query !== "") {
        placeholder.style.display = 'none';
        iframe.style.display = 'block';
        
        // Note: Some search engines block iframes. Google requires an embed format or external target
        // For testing, this sets it up to load a duckduckgo embed frame, or you can link it to your own databases
        iframe.src = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
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