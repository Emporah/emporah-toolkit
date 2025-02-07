// =====================================================================
// Initialisation
// =====================================================================
console.log('Emporah Toolkit website loaded');

const burgerButton = document.getElementById('left-menu-burger-button');
const sidebar = document.querySelector('nav');
const mainContent = document.getElementById('main-content');

// =====================================================================
// Breadcrumb Navigation
// =====================================================================
function updateBreadcrumb(page) {
    const breadcrumbNav = document.getElementById("breadcrumb-nav");

    if (!breadcrumbNav) {
        console.error("Error: breadcrumb-nav element not found.");
        return;
    }

    // Hide breadcrumb on the welcome page
    if (page === '/welcome') {
        breadcrumbNav.innerHTML = '';
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

// =====================================================================
// Sidebar Navigation
// =====================================================================
burgerButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('sidebar-closed');

    const expanded = burgerButton.getAttribute('aria-expanded') === 'true';
    burgerButton.setAttribute('aria-expanded', !expanded);
    burgerButton.classList.toggle('active');
});

function navigateTo(page) {
    window.location.hash = page;
    loadContent(page);
}

// =====================================================================
// Page Load and Navigation Handling
// =====================================================================
window.onload = () => {
    let path = window.location.hash.replace("#", "") || "/welcome";
    loadContent(path);
};

// Browser back/forward navigation
window.onhashchange = () => loadContent(window.location.hash.replace("#", ""));

// Handle Navigation Clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('nav a');
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute('href').replace("#", ""));
    }
});

// =====================================================================
// CORE CONTENT LOADING
// =====================================================================
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

    if (page === '/welcome') { // Homepage
        pageContent = `
            <div class="marketing-widget">
                <span class="title"><b>Welcome to Emporah</b></span>
                <span class="description">Select a tool from the menu to your left or go to your dashboard to get started.</span>
                <button class="dashboard-btn" onclick="navigateTo('/dashboard')">Go to Dashboard</button>
            </div>
        `;
    }
    else if (page === '/dashboard') { // User Dashboard
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
                <p class="description">Adjust your details to calculate your take-home pay accurately.</p>
            </div>
        </div>

        <div class="form-header">
            <span>Your Details</span>
            <div class="toggle-container">
                <span id="toggle-label">Basic Mode</span>
                <label class="toggle-switch">
                    <input type="checkbox" id="mode-toggle">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        </div>

        <form id="calculator-form">
            <label for="income">Gross Income:</label>
            <div class="income-group">
                <div class="income-input-wrapper">
                    <div class="income-input">
                        <span class="input-prefix">£</span>
                        <input type="number" id="income" placeholder="Enter your gross income" required>
                    </div>
                    <div class="error-message" id="income-error" style="display: none;">
                        <i class="fas fa-exclamation-circle"></i> Required
                    </div>
                </div>
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

            <label for="age">Age:</label>
            <input type="number" id="age" placeholder="Enter your age" required>

            <label for="pension">Pension Contribution (£):</label>
            <input type="number" id="pension" placeholder="Enter your annual pension contributions" value="0">

            <div id="advanced-container" class="advanced-fields">
                <label for="tax-code">Tax Code:</label>
                <input type="text" id="tax-code" placeholder="e.g., 1257L" value="1257L">

                <label for="student-loan-plan">Student Loan Plan:</label>
                <select id="student-loan-plan">
                    <option value="None">None</option>
                    <option value="Plan 1">Plan 1</option>
                    <option value="Plan 2" selected>Plan 2</option>
                    <option value="Postgraduate">Postgraduate</option>
                </select>

                <label for="other-deductions">Other Deductions (£):</label>
                <input type="number" id="other-deductions" placeholder="Enter additional deductions (if any)" value="0">
            </div>

            <button type="button" id="calculate-btn">Calculate</button>
            
        </form>

        <div id="result-heading" style="display: none;">
            <span>Results</span>
        </div>
        <div id="result" style="display: none;">
            <div id="result-controls">
                <button type="button" id="view-yearly">Yearly</button>
                <button type="button" id="view-monthly">Monthly</button>
                <button type="button" id="view-weekly">Weekly</button>
            </div>
            <div id="result-content"></div>
        </div>
        `;

        setTimeout(() => attachCalculatorFunctionality(), 0);
    }
    else if (page === '/budget-planner') { // Budget Planner
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Budget Planner</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === '/savings-tracker') { // Savings Tracker
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Savings Tracker</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === '/investment-calculator') { // Investment Calculator
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Investment Calculator</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else { // Page Not Found
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
    document.getElementById("breadcrumb-nav").innerHTML = '';
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

// =====================================================================
// Pay Calculator Functionality
// =====================================================================
// Validate the form
function validateForm() {
    const incomeInput = document.getElementById('income');
    const inputPrefix = document.querySelector('.input-prefix');
    const incomeValue = incomeInput.value;

    // Error message handling
    incomeInput.classList.remove('error');
    inputPrefix.classList.remove('error');

    if (!incomeValue || isNaN(incomeValue)) {
        alert('Please enter a valid gross income.');

        incomeInput.classList.add('error');
        inputPrefix.classList.add('error');

        return false;
    }

    return true;
}

// Attach event listeners when the pay calculator content loads
function attachCalculatorFunctionality() {
    const calculateButton = document.getElementById('calculate-btn');
    if (!calculateButton) return;

        // Toggle advanced fields visibility
        document.getElementById('mode-toggle').addEventListener('change', function() {
            var advContainer = document.getElementById('advanced-container');
            var toggleLabel = document.getElementById('toggle-label');
            if (this.checked) {
              // Show advanced fields and update label
              advContainer.style.display = 'block';
              toggleLabel.textContent = 'Advanced Mode';
            } else {
              // Hide advanced fields and update label
              advContainer.style.display = 'none';
              toggleLabel.textContent = 'Basic Mode';
            }
          });          
    
        // Attach input error message event listeners after the form is loaded
        const incomeInput = document.getElementById("income");
        const incomeError = document.getElementById("income-error");
        const inputPrefix = incomeInput.previousElementSibling;

        incomeInput.addEventListener("blur", () => {
            if (!incomeInput.value) {
                incomeInput.classList.add("error");
                inputPrefix.classList.add("error");
                incomeError.style.display = "flex";
            } else {
                incomeInput.classList.remove("error");
                inputPrefix.classList.remove("error");
                incomeError.style.display = "none";
            }
        });

        incomeInput.addEventListener("input", () => {
            if (incomeInput.value) {
                incomeError.style.display = "none";
                incomeInput.classList.remove("error");
                inputPrefix.classList.remove("error");
            }
        });

        calculateButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate income
            const incomeInput = document.getElementById('income');
            const inputPrefix = incomeInput.previousElementSibling;
            let income = parseFloat(incomeInput.value) || 0;
            if (income <= 0) {
                incomeInput.classList.add('error');
                inputPrefix.classList.add('error');
                alert('Please enter a valid income amount.');
                return;
            }
            incomeInput.classList.remove('error');
            inputPrefix.classList.remove('error');

        // Parse input values
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
            <ul id="result-list">
                <li><strong>Gross Income:</strong> <span id="result-gross-income">£${yearlyIncome.toFixed(2)}</span></li>
                <li>Income Tax: <span id="result-income-tax">£${incomeTax.toFixed(2)}</span></li>
                <li>National Insurance: <span id="result-ni">£${nationalInsurance.toFixed(2)}</span></li>
                <li>Student Loan: <span id="result-student-loan">£${studentLoan.toFixed(2)}</span></li>
                <li>Pension: <span id="result-pension">£${pension.toFixed(2)}</span></li>
                <li>Other Deductions: <span id="result-other-deductions">£${otherDeductions.toFixed(2)}</span></li>
                <li class="net-income">
                    <strong>Take-Home Pay:</strong> <span id="result-net-income">£${netIncome.toFixed(2)}</span>
                </li>                               
            </ul>
        `;

        attachResultViewButtons(
            yearlyIncome, 
            incomeTax, nationalInsurance, studentLoan, pension, otherDeductions, netIncome
        );        
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

// Results View Switch Buttons
function attachResultViewButtons(yearlyIncome, 
    incomeTax, nationalInsurance, studentLoan, pension, otherDeductions, netIncome) {

    const buttons = {
        yearly: document.getElementById('view-yearly'),
        monthly: document.getElementById('view-monthly'),
        weekly: document.getElementById('view-weekly')
    };

    function setActiveButton(activeKey) {
        Object.keys(buttons).forEach(key => {
            if (key === activeKey) {
                buttons[key].classList.add('active');
            } else {
                buttons[key].classList.remove('active');
            }
        });

        // Convert values dynamically based on selected frequency
        const factor = activeKey === "yearly" ? 1 : activeKey === "monthly" ? 1 / 12 : 1 / 52;

        document.getElementById('result-gross-income').textContent = `£${(yearlyIncome * factor).toFixed(2)}`;
        document.getElementById('result-income-tax').textContent = `£${(incomeTax * factor).toFixed(2)}`;
        document.getElementById('result-ni').textContent = `£${(nationalInsurance * factor).toFixed(2)}`;
        document.getElementById('result-student-loan').textContent = `£${(studentLoan * factor).toFixed(2)}`;
        document.getElementById('result-pension').textContent = `£${(pension * factor).toFixed(2)}`;
        document.getElementById('result-other-deductions').textContent = `£${(otherDeductions * factor).toFixed(2)}`;
        document.getElementById('result-net-income').textContent = `£${(netIncome * factor).toFixed(2)}`;
    }

    // Determine default view based on user's selected frequency
    const incomeFrequency = document.getElementById('income-frequency').value;
    let defaultView = "yearly"; 

    if (incomeFrequency === "monthly") {
        defaultView = "monthly";
    } else if (incomeFrequency === "weekly") {
        defaultView = "weekly";
    }

    setActiveButton(defaultView); // Apply the default view based on selection

    // Event listeners for switching views
    buttons.yearly.addEventListener('click', () => setActiveButton('yearly'));
    buttons.monthly.addEventListener('click', () => setActiveButton('monthly'));
    buttons.weekly.addEventListener('click', () => setActiveButton('weekly'));
}

function updateResultView(amount, label) {
    document.getElementById('result-content').innerHTML = `<p><strong>${label}:</strong> £${amount.toFixed(2)}</p>`;
}

// =====================================================================
// NEXT TOOL FUNCTIONALITY BELOW HERE...
// =====================================================================