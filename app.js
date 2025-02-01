console.log('Emporah Toolkit website loaded');

const burgerButton = document.getElementById('left-menu-burger-button');
const sidebar = document.querySelector('nav');
const mainContent = document.getElementById('main-content');

function updateBreadcrumb(page) {
    const breadcrumbNav = document.getElementById("breadcrumb-nav");

    if (!breadcrumbNav) {
        console.error("Error: breadcrumb-nav element not found.");
        return;
    }

    // Hide breadcrumb on the welcome page
    if (page === '/welcome') {
        breadcrumbNav.innerHTML = ''; // Clear it
        return;
    }

    // Define page titles
    const pageTitles = {
        "/dashboard": "Dashboard",
        "/pay-calculator": "Pay Calculator",
        "/budget-planner": "Budget Planner",
        "/savings-tracker": "Savings Tracker",
        "/investment-calculator": "Investment Calculator"
    };

    let breadcrumbHTML = `<div class="breadcrumb">
        <a href="#/welcome" onclick="navigateTo('/welcome')">Home</a>`;

    if (pageTitles[page]) {
        breadcrumbHTML += ` <span class="select-indicator">›</span> <span>${pageTitles[page]}</span>`;
    }

    breadcrumbHTML += `</div>`;

    breadcrumbNav.innerHTML = breadcrumbHTML;
}

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
    window.location.hash = page; // Only modify hash, no pushState
    loadContent(page);
}

window.onload = () => {
    let path = window.location.hash.replace("#", "") || "/welcome"; // Default is now /welcome
    loadContent(path);
};

// Handle browser back/forward navigation
window.onhashchange = () => loadContent(window.location.hash.replace("#", ""));

// Content Functionality
function loadContent(page) {
    let mainContent = document.getElementById("main-content");
    if (!mainContent) {
        console.error("Error: main-content element not found!");
        return;
    }

    // Ensure breadcrumb-nav exists inside main-content
    if (!document.getElementById("breadcrumb-nav")) {
        mainContent.innerHTML = '<div id="breadcrumb-nav"></div>' + mainContent.innerHTML;
    }

    let pageContent = '';

    if (page === '/welcome') { // Default landing page
        pageContent = `
            <div class="marketing-widget">
                <span class="title"><b>Welcome to Emporah</b></span>
                <span class="description">Select a tool from the menu to your left or go to your dashboard to get started.</span>
                <button class="dashboard-btn" onclick="navigateTo('/dashboard')">Go to Dashboard</button>
            </div>
        `;
    } 
    else if (page === '/dashboard') { // Dashboard
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Dashboard</h1>
                    <p class="description">Welcome to your Emporah Dashboard. This is your central hub for managing and accessing financial tools quickly.</p>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-tile" onclick="navigateTo('/pay-calculator')">
                    <i class="fas fa-calculator"></i>
                    <span>Pay Calculator</span>
                </div>
                <div class="dashboard-tile" onclick="navigateTo('/budget-planner')">
                    <i class="fas fa-wallet"></i>
                    <span>Budget Planner</span>
                </div>
                <div class="dashboard-tile" onclick="navigateTo('/savings-tracker')">
                    <i class="fas fa-piggy-bank"></i>
                    <span>Savings Tracker</span>
                </div>
                <div class="dashboard-tile" onclick="navigateTo('/investment-calculator')">
                    <i class="fas fa-chart-line"></i>
                    <span>Investment Calculator</span>
                </div>
            </div>
        `;
    } 
    else if (page === '/pay-calculator') { // Pay Calculator
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Pay Calculator</h1>
                    <p class="description">IN PROGRESS...</p>
                </div>
            </div>
            
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

        setTimeout(() => attachCalculatorFunctionality(), 0);
    } 
    else if (page === '/budget-planner') {
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Budget Planner</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    } 
    else if (page === '/savings-tracker') {
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Savings Tracker</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    } 
    else if (page === '/investment-calculator') {
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Investment Calculator</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    } 
    else {
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Page Not Found</h1>
                    <p class="description">The requested page does not exist.</p>
                </div>
            </div>
        `;
    }

    // Update only the content inside main-content, preserving breadcrumb-nav
    document.getElementById("breadcrumb-nav").innerHTML = ''; // Clear breadcrumb for welcome page
    mainContent.innerHTML = `<div id="breadcrumb-nav"></div>` + pageContent;

    //Footer
    mainContent.innerHTML += `
        <footer id="site-footer">
            <img src="assets/header_logo.svg" alt="Emporah Logo" id="footer-logo">
            <div class="footer-info-links">
                <a class="link">About</a>
                <a class="link">Contact</a>
                <a class="link">Help Centre</a>
            </div>
            <div class="footer-legal-links">
                <a class="link">Terms</a>
                <a class="link">Privacy Policy</a>
            </div>
            <div class="footer-legal-info"><a class="link">&copy; <span id="footer-year"></span> Emporah. All rights reserved.</a></div>
        </footer>
    `;

    document.getElementById("footer-year").textContent = new Date().getFullYear();

    updateBreadcrumb(page);
}

// Function to Attach Event Listeners for Pay Calculator
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

            // Convert income to yearly
            let yearlyIncome = frequency === 'monthly' ? income * 12 :
                               frequency === 'weekly' ? income * 52 :
                               income;

            // Tax Calculations
            const taxFreeAllowance = 12570;
            const basicRate = 0.2, higherRate = 0.4, additionalRate = 0.45;
            let taxableIncome = Math.max(0, yearlyIncome - taxFreeAllowance);
            let incomeTax = 0;

            if (taxableIncome > 125140) {
                incomeTax += (taxableIncome - 125140) * additionalRate;
                taxableIncome = 125140;
            }
            if (taxableIncome > 50270) {
                incomeTax += (taxableIncome - 50270) * higherRate;
                taxableIncome = 50270;
            }
            if (taxableIncome > 0) {
                incomeTax += taxableIncome * basicRate;
            }

            // National Insurance (8% above £12,570)
            const niThreshold = 12570;
            const niRate = 0.08;
            const nationalInsurance = yearlyIncome > niThreshold ? (yearlyIncome - niThreshold) * niRate : 0;

            // Student Loan (Assuming Plan 2: 9% above £27,295)
            const studentLoanThreshold = 27295;
            const studentLoanRate = 0.09;
            const studentLoan = yearlyIncome > studentLoanThreshold ? (yearlyIncome - studentLoanThreshold) * studentLoanRate : 0;

            // Apply deductions
            let totalDeductions = incomeTax + nationalInsurance + studentLoan + deductions;
            let netIncome = yearlyIncome - totalDeductions;

            // Convert results to different time frames
            let monthlyNet = netIncome / 12, weeklyNet = netIncome / 52;
            let monthlyTax = incomeTax / 12, weeklyTax = incomeTax / 52;
            let monthlyNI = nationalInsurance / 12, weeklyNI = nationalInsurance / 52;
            let monthlySL = studentLoan / 12, weeklySL = studentLoan / 52;

            // Display results
            document.getElementById('result-heading').style.display = 'block';
            document.getElementById('result').style.display = 'block';
            document.getElementById('result-content').innerHTML = `
                <p id="yearly-result">
                    <strong>Yearly:</strong> £${netIncome.toFixed(2)} (Tax: £${incomeTax.toFixed(2)}, NI: £${nationalInsurance.toFixed(2)}, SL: £${studentLoan.toFixed(2)})
                </p>
                <p id="monthly-result">
                    <strong>Monthly:</strong> £${monthlyNet.toFixed(2)} (Tax: £${monthlyTax.toFixed(2)}, NI: £${monthlyNI.toFixed(2)}, SL: £${monthlySL.toFixed(2)})
                </p>
                <p id="weekly-result">
                    <strong>Weekly:</strong> £${weeklyNet.toFixed(2)} (Tax: £${weeklyTax.toFixed(2)}, NI: £${weeklyNI.toFixed(2)}, SL: £${weeklySL.toFixed(2)})
                </p>
            `;

            // Attach event listeners for result view buttons
            attachResultViewButtons(netIncome, monthlyNet, weeklyNet);
        });
    }
}

// Function to Handle View Switching
function attachResultViewButtons(yearly, monthly, weekly) {
    document.getElementById('view-yearly').addEventListener('click', () => updateResultView(yearly, 'Yearly'));
    document.getElementById('view-monthly').addEventListener('click', () => updateResultView(monthly, 'Monthly'));
    document.getElementById('view-weekly').addEventListener('click', () => updateResultView(weekly, 'Weekly'));
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
        navigateTo(link.getAttribute('href').replace("#", ""));
    }
});