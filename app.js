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
function navigateTo(page, addToHistory = true) {
    console.log("Navigating to:", page);
    
    // Check if `addToHistory` is true and path isn't a duplicate
    if (addToHistory) {
        console.log("Before pushState - Current Path:", window.location.pathname);
        console.log("Attempting pushState for:", page);

        try {
            history.pushState({ path: page }, '', page.replace(/\?.*$/, ''));
            console.log("pushState SUCCESS:", window.location.pathname);
        } catch (error) {
            console.error("pushState FAILED:", error);
        }
    } else {
        console.log("Skipping pushState for:", page);
    }

    loadContent(page);
}

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

        // Reattach calculator functionality after loading content
        setTimeout(() => attachCalculatorFunctionality(), 0);

    } else if (page === '/budget-planner') {
        pageContent = `
            <h1>Budget Planner</h1>
            <p>Coming soon...</p>
        `;
    } else if (page === '/savings-tracker') {
        pageContent = `
            <h1>Savings Tracker</h1>
            <p>Coming soon...</p>
        `;
    } else if (page === '/investment-calculator') {
        pageContent = `
            <h1>Investment Calculator</h1>
            <p>Coming soon...</p>
        `;
    }

    mainContent.innerHTML = pageContent;
}

// Function to Attach Event Listeners for Calculator
function attachCalculatorFunctionality() {
    const calculateButton = document.getElementById('calculate-btn');

    if (calculateButton) {
        calculateButton.addEventListener('click', () => {
            const income = parseFloat(document.getElementById('income').value) || 0;
            const deductions = parseFloat(document.getElementById('other-deductions').value) || 0;
            const frequency = document.getElementById('income-frequency').value;

            if (income <= 0) {
                alert('Please enter a valid income amount.');
                return;
            }

            let netIncome = income - deductions;

            let yearly, monthly, weekly;
            if (frequency === 'yearly') {
                yearly = netIncome;
                monthly = yearly / 12;
                weekly = yearly / 52;
            } else if (frequency === 'monthly') {
                monthly = netIncome;
                yearly = monthly * 12;
                weekly = yearly / 52;
            } else if (frequency === 'weekly') {
                weekly = netIncome;
                yearly = weekly * 52;
                monthly = yearly / 12;
            }

            // Display results
            document.getElementById('result-heading').style.display = 'block';
            document.getElementById('result').style.display = 'block';
            document.getElementById('result-content').innerHTML = `
                <p id="yearly-result"><strong>Yearly:</strong> £${yearly.toFixed(2)}</p>
                <p id="monthly-result"><strong>Monthly:</strong> £${monthly.toFixed(2)}</p>
                <p id="weekly-result"><strong>Weekly:</strong> £${weekly.toFixed(2)}</p>
            `;

            // Attach event listeners for result view buttons
            attachResultViewButtons(yearly, monthly, weekly);
        });
    }
}

// Function to Handle View Switching
function attachResultViewButtons(yearly, monthly, weekly) {
    document.getElementById('view-yearly').addEventListener('click', () => {
        updateResultView(yearly, 'Yearly');
    });

    document.getElementById('view-monthly').addEventListener('click', () => {
        updateResultView(monthly, 'Monthly');
    });

    document.getElementById('view-weekly').addEventListener('click', () => {
        updateResultView(weekly, 'Weekly');
    });
}

// Function to Update Result View
function updateResultView(amount, label) {
    document.getElementById('result-content').innerHTML = `<p><strong>${label}:</strong> £${amount.toFixed(2)}</p>`;
}

// Handle Navigation Clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('nav a');
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
    }
});

// Handle Browser Back/Forward Navigation
window.onpopstate = (event) => {
    let path = event.state?.path || window.location.pathname;
    console.log("Handling back/forward navigation:", path);
    loadContent(path); // Avoid adding duplicate history entries
};

// Ensure Correct Page Loads on Refresh or Direct Visit
window.onload = () => {
    let path = window.location.pathname;

    console.log("Loading page on startup:", path);
    loadContent(path); // Load the correct content

    // Ensure that history reflects the correct path without modifying it unnecessarily
    if (!history.state || history.state.path !== path) {
        history.replaceState({ path: path }, '', path);
    }
};

// Prevent full page reload and reload content manually
window.addEventListener('beforeunload', (event) => {
    event.preventDefault(); // Prevent default refresh
    event.returnValue = ''; // Required for some browsers
});

// Detect and handle F5 keypress to fake a refresh
window.addEventListener('keydown', (event) => {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
        event.preventDefault(); // Stop default reload
        console.log("Fake refresh triggered");

        let path = window.location.pathname; // Keep user on the same page
        navigateTo(path, false); // Manually reload content
    }
});