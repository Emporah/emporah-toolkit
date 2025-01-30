console.log('Emporah Toolkit website loaded');

const burgerButton = document.getElementById('left-menu-burger-button');
const sidebar = document.querySelector('nav');
const mainContent = document.getElementById('main-content');

// Toggle Sidebar Functionality
burgerButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('sidebar-closed');

    const expanded = burgerButton.getAttribute('aria-expanded') === 'true';
    burgerButton.setAttribute('aria-expanded', !expanded);
    burgerButton.classList.toggle('active');
});

// Function to Handle Navigation and URL Updates
function navigateTo(page) {
    console.log("Navigating to:", page);
    window.location.hash = page; // Only modify hash, no pushState
    loadContent(page);
}

// Load content on page load
window.onload = () => {
    let path = window.location.hash.replace("#", "") || "/dashboard"; 
    console.log("Loading page on startup:", path);
    loadContent(path);
};

// Handle browser back/forward navigation
window.onhashchange = () => {
    let path = window.location.hash.replace("#", "");
    console.log("Handling back/forward navigation:", path);
    loadContent(path);
};

// Function to Load Content Based on the Path
function loadContent(page) {
    let pageContent = '';

    if (page === '/' || page === '/dashboard') {
        pageContent = `
            <h1>Welcome to Emporah</h1>
            <p>Select a tool from the navigation bar to get started.</p>
        `;

    } else if (page === '/pay-calculator') {
        pageContent = `
            <h1>Pay Calculator</h1>
            <p>Calculator functionality here...</p>
        `;

    } else if (page === '/budget-planner') {
        pageContent = `<h1>Budget Planner</h1><p>Coming soon...</p>`;
    } else if (page === '/savings-tracker') {
        pageContent = `<h1>Savings Tracker</h1><p>Coming soon...</p>`;
    } else if (page === '/investment-calculator') {
        pageContent = `<h1>Investment Calculator</h1><p>Coming soon...</p>`;
    } else {
        pageContent = `<h1>Page Not Found</h1><p>The requested page does not exist.</p>`;
    }

    mainContent.innerHTML = pageContent;
}

// Handle Navigation Clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('nav a');
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute('href').replace("#", ""));
    }
});