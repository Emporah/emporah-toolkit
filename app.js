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
                <p class="description">Enhanced Pay Calculator: Adjust your parameters to calculate your net income accurately.</p>
            </div>
        </div>

        <form id="calculator-form">
        <label for="income">Gross Income (£):</label>
        <div class="income-group">
            <input type="number" id="income" placeholder="Enter your gross income" required>
            <select id="income-frequency">
                <option value="yearly">Per Year</option>
                <option value="monthly">Per Month</option>
                <option value="weekly">Per Week</option>
            </select>
        </div>

            <label for="tax-year">Tax Year:</label>
            <select id="tax-year">
                <option value="2024-2025">2024-2025</option>
                <!-- You can add more tax years as needed -->
            </select>

            <label for="tax-code">Tax Code:</label>
            <input type="text" id="tax-code" placeholder="e.g., 1257L" value="1257L">

            <label for="age">Age:</label>
            <input type="number" id="age" placeholder="Enter your age" required>

            <label for="pension">Pension Contribution (£):</label>
            <input type="number" id="pension" placeholder="Enter your annual pension contributions" value="0">

            <label for="student-loan-plan">Student Loan Plan:</label>
            <select id="student-loan-plan">
                <option value="None">None</option>
                <option value="Plan 1">Plan 1</option>
                <option value="Plan 2" selected>Plan 2</option>
                <option value="Postgraduate">Postgraduate</option>
            </select>

            <label for="other-deductions">Other Deductions (£):</label>
            <input type="number" id="other-deductions" placeholder="Enter additional deductions (if any)" value="0">

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

// Attach event listeners when the pay calculator content loads
function attachCalculatorFunctionality() {
    const calculateButton = document.getElementById('calculate-btn');
    if (!calculateButton) return;
    
    calculateButton.addEventListener('click', () => {
        // Parse input values
        let income = parseFloat(document.getElementById('income').value) || 0;
        const frequency = document.getElementById('income-frequency').value;
        let taxYear = document.getElementById('tax-year').value;
        let taxCode = document.getElementById('tax-code').value || "1257L";
        let age = parseInt(document.getElementById('age').value) || 0;
        let pension = parseFloat(document.getElementById('pension').value) || 0;
        let studentLoanPlan = document.getElementById('student-loan-plan').value;
        let otherDeductions = parseFloat(document.getElementById('other-deductions').value) || 0;

        if (income <= 0) {
            alert('Please enter a valid income amount.');
            return;
        }
        if (age <= 0) {
            alert('Please enter a valid age.');
            return;
        }
        
        // Convert income to yearly based on frequency
        let yearlyIncome = income;
        if (frequency === 'monthly') {
            yearlyIncome = income * 12;
        } else if (frequency === 'weekly') {
            yearlyIncome = income * 52;
        }

        // Tax rules configuration for tax year 2024-2025 (extend as needed)
        const taxRulesConfig = {
            "2024-2025": {
                personalAllowanceDefault: 12570,
                basicRateThreshold: 50270,
                higherRateThreshold: 125140,
                rates: {
                    basic: 0.20,
                    higher: 0.40,
                    additional: 0.45
                },
                niThreshold: 12570,
                niRate: 0.08,
                studentLoan: {
                    "Plan 1": { threshold: 20195, rate: 0.09 },
                    "Plan 2": { threshold: 27295, rate: 0.09 },
                    "Postgraduate": { threshold: 21000, rate: 0.06 }
                }
            }
        };

        let rules = taxRulesConfig[taxYear];
        if (!rules) {
            alert('Tax rules for the selected year are not available.');
            return;
        }

        // Determine personal allowance from the tax code (e.g., "1257L" => 12570)
        let personalAllowance = getPersonalAllowance(taxCode, rules.personalAllowanceDefault);

        // Adjusted income for tax calculation (subtract pension contributions)
        let adjustedIncome = Math.max(0, yearlyIncome - pension);

        // Calculate Income Tax on adjusted income
        let incomeTax = calculateIncomeTax(adjustedIncome, personalAllowance, rules);

        // Calculate National Insurance on the gross income (if age < 65)
        let nationalInsurance = calculateNI(yearlyIncome, age, rules.niThreshold, rules.niRate);

        // Calculate Student Loan deductions based on selected plan
        let studentLoan = calculateStudentLoan(yearlyIncome, studentLoanPlan, rules.studentLoan);

        // Total deductions (including pension as a deduction from take-home pay)
        let totalDeductions = incomeTax + nationalInsurance + studentLoan + otherDeductions + pension;

        // Net income calculation
        let netIncome = yearlyIncome - totalDeductions;
        let monthlyNet = netIncome / 12;
        let weeklyNet = netIncome / 52;

        // Display the results
        document.getElementById('result-heading').style.display = 'block';
        document.getElementById('result').style.display = 'block';
        document.getElementById('result-content').innerHTML = `
            <p id="yearly-result">
                <strong>Yearly:</strong> £${netIncome.toFixed(2)}<br>
                (Income Tax: £${incomeTax.toFixed(2)}, NI: £${nationalInsurance.toFixed(2)}, Student Loan: £${studentLoan.toFixed(2)}, Pension: £${pension.toFixed(2)}, Other: £${otherDeductions.toFixed(2)})
            </p>
            <p id="monthly-result" style="display:none;">
                <strong>Monthly:</strong> £${monthlyNet.toFixed(2)}
            </p>
            <p id="weekly-result" style="display:none;">
                <strong>Weekly:</strong> £${weeklyNet.toFixed(2)}
            </p>
        `;

        attachResultViewButtons(netIncome, monthlyNet, weeklyNet);
    });
}

// Extract personal allowance from the tax code by taking the digits and multiplying by 10
function getPersonalAllowance(taxCode, defaultAllowance) {
    let codeNum = parseFloat(taxCode.replace(/\D/g, ''));
    return codeNum ? codeNum * 10 : defaultAllowance;
}

// Calculate income tax using the band thresholds and rates
function calculateIncomeTax(adjustedIncome, personalAllowance, rules) {
    let taxableIncome = Math.max(0, adjustedIncome - personalAllowance);
    let tax = 0;
    if (taxableIncome > rules.higherRateThreshold) {
        tax += (taxableIncome - rules.higherRateThreshold) * rules.rates.additional;
        taxableIncome = rules.higherRateThreshold;
    }
    if (taxableIncome > rules.basicRateThreshold) {
        tax += (taxableIncome - rules.basicRateThreshold) * rules.rates.higher;
        taxableIncome = rules.basicRateThreshold;
    }
    if (taxableIncome > 0) {
        tax += taxableIncome * rules.rates.basic;
    }
    return tax;
}

// Calculate National Insurance (NI); assume NI is not due if age is 65 or above
function calculateNI(grossIncome, age, niThreshold, niRate) {
    if (age >= 65) {
        return 0;
    }
    return grossIncome > niThreshold ? (grossIncome - niThreshold) * niRate : 0;
}

// Calculate student loan deductions based on the selected plan
function calculateStudentLoan(grossIncome, plan, studentLoanRules) {
    if (plan === "None") return 0;
    let rule = studentLoanRules[plan];
    if (!rule) return 0;
    return grossIncome > rule.threshold ? (grossIncome - rule.threshold) * rule.rate : 0;
}

// Attach event listeners to the result view buttons to switch between yearly, monthly, and weekly displays
function attachResultViewButtons(yearly, monthly, weekly) {
    document.getElementById('view-yearly').addEventListener('click', () => updateResultView(yearly, 'Yearly'));
    document.getElementById('view-monthly').addEventListener('click', () => updateResultView(monthly, 'Monthly'));
    document.getElementById('view-weekly').addEventListener('click', () => updateResultView(weekly, 'Weekly'));
}

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