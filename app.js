console.log('Emporah Toolkit website loaded');

const burgerButton = document.getElementById('left-menu-burger-button');
const sidebar = document.querySelector('nav');
const mainContent = document.getElementById('main-content');

// 🚀 Toggle Sidebar Functionality
burgerButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('sidebar-closed');

    const expanded = burgerButton.getAttribute('aria-expanded') === 'true';
    burgerButton.setAttribute('aria-expanded', !expanded);
    burgerButton.classList.toggle('active');
});

// 🚀 Function to Handle Navigation
function navigateTo(page) {
    history.pushState({}, '', page);

    if (page === '/' || page === '/home') {
        mainContent.innerHTML = `
            <h1>Welcome to Emporah</h1>
            <p>Select a tool from the navigation bar to get started.</p>
        `;
    } else if (page === '/pay-calculator') {
        mainContent.innerHTML = `
            <h1>Pay Calculator</h1>
            <form id="calculator-form">
                <label for="income">Gross (Pre-Tax) Income (£):</label>
                <input type="number" id="income" placeholder="Enter your gross income" required>
                <select id="income-frequency">
                    <option value="yearly">Per Year</option>
                    <option value="monthly">Per Month</option>
                    <option value="weekly">Per Week</option>
                </select>
                <br><br>

                <label for="other-deductions">Other Deductions (£):</label>
                <input type="number" id="other-deductions" placeholder="Enter additional deductions (if any)" value="0">
                <br><br>

                <button type="button" id="calculate-btn">Calculate</button>
            </form>

            <h2 id="result-heading" style="display: none;">Results:</h2>
            <div id="result" style="display: none;">
                <div id="result-controls" style="margin-bottom: 10px;">
                    <button type="button" id="view-yearly">Yearly</button>
                    <button type="button" id="view-monthly">Monthly</button>
                    <button type="button" id="view-weekly">Weekly</button>
                </div>
                <div id="result-content"></div>
            </div>
        `;
        attachCalculatorFunctionality();
    }
}

// 🚀 Add Event Listeners When the Page Loads
window.onload = () => {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.currentTarget.getAttribute('href')); // Ensures correct navigation
        });
    });

    // Load the correct page when opening the site directly
    navigateTo(window.location.pathname);
};

// 🚀 Handle Browser Back/Forward Buttons
window.onpopstate = () => {
    navigateTo(window.location.pathname);
};