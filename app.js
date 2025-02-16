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
const pageTitles = {
    "/dashboard": "Dashboard",
    "/pay-calculator": "Pay Calculator",
    "/budget-planner": "Budget Planner",
    "/savings-tracker": "Savings Tracker",
    "/investment-calculator": "Investment Calculator",
    "/loan-calculator": "Loan Calculator",
    "/debt-tracker": "Debt Tracker",
    "/income-tracker": "Income Tracker",
    "/expenses-tracker": "Expenses Tracker",
    "/overdraft-calculator": "Overdraft Calculator",
    "/profit-loss-tracker": "Profit & Loss Tracker",
    "/gross-income-calculator": "Gross Income Calculator"
};

function updateBreadcrumb(page) {
    const breadcrumbNav = document.getElementById("breadcrumb-nav");
    if (!breadcrumbNav) return console.error("Error: breadcrumb-nav element not found.");

    breadcrumbNav.innerHTML = page === '/welcome' ? '' :
        `<div class="breadcrumb">
            <a href="#/welcome" onclick="navigateTo('/welcome')">Home</a>
            ${pageTitles[page] ? `<span class="select-indicator">›</span> <span>${pageTitles[page]}</span>` : ''}
        </div>`;
}

// =====================================================================
// Sidebar Navigation
// =====================================================================
// Main Sidebar
burgerButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    document.getElementById("main-content-container").classList.toggle('sidebar-closed');
    burgerButton.classList.toggle('active');
    burgerButton.setAttribute('aria-expanded', sidebar.classList.contains('open'));
});

function navigateTo(page) {
    window.location.hash = page;
    loadContent(page);

    // Remove .active class from all sidebar links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.classList.remove("active");
    });

    // Find the link that matches the current page and add .active
    const activeLink = document.querySelector(`nav ul li a[href="#${page}"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}

// Settings Sidebar
document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settings-icon').closest('.header-item');
    const rightSidebar = document.getElementById('right-sidebar');
    const closeRightSidebar = document.getElementById('close-right-sidebar');
    const mainContent = document.getElementById('main-content');

    if (settingsButton && rightSidebar && closeRightSidebar) {
        settingsButton.addEventListener('click', (event) => {
            event.stopPropagation();
            rightSidebar.classList.toggle('open');
            document.getElementById("main-content-container").classList.toggle('sidebar-right-open');
            settingsButton.closest('.header-item').classList.toggle('active', rightSidebar.classList.contains('open'));
            settingsButton.setAttribute('aria-expanded', rightSidebar.classList.contains('open'));
        });        

        closeRightSidebar.addEventListener('click', () => {
            rightSidebar.classList.remove('open');
            mainContent.classList.remove('sidebar-right-open');
            settingsButton.classList.remove('active');
            settingsButton.setAttribute('aria-expanded', "false");
        });

        document.addEventListener('click', (event) => {
            const isClickOnSettingsButton = event.target === settingsButton;
            const isClickOnCloseButton = event.target === closeRightSidebar;
        
            if (isClickOnSettingsButton) {
                rightSidebar.classList.toggle('open');
                mainContent.classList.toggle('sidebar-right-open');
                settingsButton.classList.toggle('active');
                settingsButton.setAttribute('aria-expanded', rightSidebar.classList.contains('open'));
            } else if (isClickOnCloseButton) {
                rightSidebar.classList.remove('open');
                mainContent.classList.remove('sidebar-right-open');
                settingsButton.classList.remove('active');
                settingsButton.setAttribute('aria-expanded', "false");
            }
        });
        
    } else {
        console.error("Error: One or more sidebar elements were not found in the DOM.");
    }
});

// =====================================================================
// Page Load and Navigation Handling
// =====================================================================
function handleNavigation() {
    loadContent(window.location.hash.replace("#", "") || "/welcome");
}

window.onload = handleNavigation;
window.onhashchange = handleNavigation;

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

    // Define the mapping of page routes to their respective HTML files
    const pagePaths = {
        "/pay-calculator": "pages/pay-calculator.html"
    };

    // Ensure breadcrumb-nav exists inside main-content
    document.addEventListener("DOMContentLoaded", () => {
        if (!document.getElementById("breadcrumb-nav")) {
            mainContent.insertAdjacentHTML('afterbegin', '<div id="breadcrumb-nav"></div>');
        }
    });    

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
                    <p class="description">Welcome to your Emporah Dashboard. This is your central hub for managing your financial tools access and financial summary.</p>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-tile" onclick="navigateTo('/budget-planner')">
                    <i class="fas fa-wallet"></i>
                    <span>Budget Planner</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/income-tracker')">
                    <i class="fas fa-money-check-alt"></i>
                    <span>Income Tracker</span>
                </div>                

                <div class="dashboard-tile" onclick="navigateTo('/savings-tracker')">
                    <i class="fas fa-piggy-bank"></i>
                    <span>Savings Tracker</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/debt-tracker')">
                    <i class="fas fa-file-invoice-dollar"></i>
                    <span>Debt Tracker</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/expenses-tracker')">
                    <i class="fas fa-receipt"></i>
                    <span>Expenses Tracker</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/profit-loss-tracker')">
                    <i class="fas fa-balance-scale"></i>
                    <span>Profit & Loss Tracker</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/pay-calculator')">
                    <i class="fas fa-calculator"></i>
                    <span>Pay Calculator</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/gross-income-calculator')">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>Gross Income Calculator</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/loan-calculator')">
                    <i class="fas fa-coins"></i>
                    <span>Loan Calculator</span>
                </div>

                <div class="dashboard-tile" onclick="navigateTo('/overdraft-calculator')">
                    <i class="fas fa-university"></i>
                    <span>Overdraft Calculator</span>
                </div>
                
                <div class="dashboard-tile" onclick="navigateTo('/investment-calculator')">
                    <i class="fas fa-chart-line"></i>
                    <span>Investment Calculator</span>
                </div>
            </div>
        `;
    }
    else if (page === '/pay-calculator') { 
        fetch("pages/pay-calculator.html")
            .then(response => response.text())
            .then(html => {
                document.getElementById("main-content").innerHTML = `<div id="breadcrumb-nav"></div>` + html;
                updateBreadcrumb(page);
                attachCalculatorFunctionality(); // Ensure calculator scripts reapply
            })
            .catch(error => {
                console.error("Error loading Pay Calculator page:", error);
                document.getElementById("main-content").innerHTML = `<h2>Page not found</h2>`;
            });

        if (page === "/pay-calculator") {
            setTimeout(() => {
                attachCalculatorFunctionality();
                setDefaultPensionValues(); // Ensure pension defaults are set on load
            }, 0);
        }        
        
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
    else if (page === "/loan-calculator") {
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Loan Calculator</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === "/debt-tracker") { // Debt Tracker
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Debt Tracker</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === "/income-tracker") { // Income Tracker
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Income Tracker</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === "/expenses-tracker") { // Expenses Tracker
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Expenses Tracker</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === "/overdraft-calculator") { // Overdraft Calculator
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Overdraft Calculator</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === "/profit-loss-tracker") { // Profit & Loss Tracker
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Profit & Loss Tracker</h1>
                    <p class="description">Coming soon...</p>
                </div>
            </div>
        `;
    }
    else if (page === "/gross-income-calculator") { // Gross Income Calculator
        pageContent = `
            <div class="generic-header">
                <div class="header-content">
                    <h1 class="title">Gross Income Calculator</h1>
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

    updateBreadcrumb(page);
}

// =====================================================================
// Pay Calculator Functionality
// =====================================================================
// Attach event listeners when the pay calculator content loads
function attachCalculatorFunctionality() {
    const calculateButton = document.getElementById('calculate-btn');
    if (!calculateButton) return;

    attachFormPersistence(); // Add this line to make form persistence work

        const clearButton = document.getElementById('clear-btn');
        if (clearButton) {
            clearButton.addEventListener("click", function () {
                document.getElementById("income").value = "";
                document.getElementById("income-frequency").value = "yearly";
                document.getElementById("tax-year").value = "2024-2025";
                document.getElementById("age").value = "under-66";
                document.getElementById("pension").value = "";
                document.getElementById("pension-type-fixed").checked = false;
                document.getElementById("pension-type-percentage").checked = true;
                document.getElementById("pension-frequency").value = "yearly";
                document.getElementById("tax-code").value = "1257L";
                document.getElementById("student-loan-plan").value = "None";
                document.getElementById("other-deductions").value = "";
                
                // Hide results
                document.getElementById('result-heading').style.display = 'none';
                document.getElementById('result').style.display = 'none';
                document.getElementById('result-content').innerHTML = "";
            });
        }    

        // Toggle advanced fields visibility
        document.getElementById('mode-toggle').addEventListener('change', function() {
            document.getElementById('advanced-container').style.display = this.checked ? 'block' : 'none';
            document.getElementById('toggle-label').textContent = this.checked ? 'Advanced Mode' : 'Basic Mode';
        });                 
    
        // Attach input error message event listeners after the form is loaded
        const incomeInput = document.getElementById("income");
        const incomeError = document.getElementById("income-error");
        const inputPrefix = incomeInput.previousElementSibling;

        incomeInput.addEventListener("input", function () {
            let rawValue = this.value.replace(/,/g, ''); // Remove commas for processing
        
            // Ensure the value contains only numbers and at most one decimal with two decimal places
            if (!/^\d*\.?\d{0,2}$/.test(rawValue)) {
                this.value = this.dataset.rawValue || ""; // Revert to last valid value
                return;
            }
        
            this.dataset.rawValue = rawValue; // Store the raw value without formatting
        });
        
        incomeInput.addEventListener("blur", function () {
            if (this.dataset.rawValue) {
                let formattedValue = parseFloat(this.dataset.rawValue).toLocaleString('en-GB', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
                this.value = formattedValue; // Format only on blur
            }
        });                         

        function toggleErrorState(isError) {
            incomeInput.classList.toggle("error", isError);
            inputPrefix.classList.toggle("error", isError);
            incomeError.style.display = isError ? "flex" : "none";
        }
        
        incomeInput.addEventListener("blur", () => toggleErrorState(!incomeInput.value));
        incomeInput.addEventListener("input", () => toggleErrorState(false));        

        calculateButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate income
            const incomeInput = document.getElementById('income');
            const inputPrefix = incomeInput.previousElementSibling;
            const incomeError = document.getElementById("income-error");

            // Ensure we properly get the value from incomeInput
            let income = parseFloat(incomeInput.value.replace(/,/g, '')) || 0;

            if (income <= 0) {
                incomeInput.classList.add('error');
                inputPrefix.classList.add('error');
                incomeError.style.display = "flex";
                alert('Please enter a valid income amount.');
                return;
            }

            // Reset error state if input is valid
            incomeInput.classList.remove('error');
            inputPrefix.classList.remove('error');
            incomeError.style.display = "none";

        const grossIncome = parseFloat(document.getElementById('income').value.replace(/,/g, '')) || 0;
        const frequency = document.getElementById('income-frequency').value;
        let taxYear = document.getElementById('tax-year').value;
        let taxCode = document.getElementById('tax-code').value || "1257L";
        let ageBracket = document.getElementById('age').value;
        let studentLoanPlan = document.getElementById('student-loan-plan').value;
        let otherDeductions = parseFloat(document.getElementById('other-deductions').value) || 0;

        // Validate gross income input values
        if (income <= 0) {
            alert('Please enter a valid income amount.');
            return;
        }
        
        const multipliers = { monthly: 12, weekly: 52, yearly: 1 };
        const yearlyIncome = (parseFloat(document.getElementById('income').value.replace(/,/g, '')) || 0) * multipliers[frequency];
        const pensionInput = document.getElementById('pension');
        const pensionFixed = document.getElementById('pension-type-fixed');
        const pensionPercentage = document.getElementById('pension-type-percentage');

        if (pensionFixed && pensionPercentage) {
            pensionFixed.addEventListener('change', () => {
                if (pensionInput) pensionInput.placeholder = "Enter fixed amount";
            });

            pensionPercentage.addEventListener('change', () => {
                if (pensionInput) pensionInput.placeholder = "Enter percentage";
            });
        } else {
            console.error("Pension radio buttons not found.");
        }

        const pensionFrequency = document.getElementById('pension-frequency').value;
        const isPercentage = document.getElementById('pension-type-percentage').checked;
        let pension = parseFloat(pensionInput.value) || 0;

        // Convert percentage to fixed amount if percentage is selected
        const pensionMultipliers = { yearly: 1, monthly: 12, weekly: 52 };
        const pensionBaseIncome = yearlyIncome / pensionMultipliers[pensionFrequency]; 
        pension = isPercentage ? (pensionBaseIncome * pension) / 100 : pension;                

        // Convert pension contributions to yearly based on the selected frequency
        if (pensionFrequency === "monthly") {
            pension *= 12;
        } else if (pensionFrequency === "weekly") {
            pension *= 52;
        }

        pensionFixed.addEventListener('change', () => {
            pensionInput.placeholder = "Enter fixed amount";
        });
        
        pensionPercentage.addEventListener('change', () => {
            pensionInput.placeholder = "Enter percentage";
        });

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

                <table class="payslip-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gross Income</td>
                            <td id="result-gross-income" class="result-value">£0.00</td>
                        </tr>
                        <tr>
                            <td>Income Tax</td>
                            <td id="result-income-tax" class="result-value">£0.00</td>
                        </tr>
                        <tr>
                            <td>National Insurance</td>
                            <td id="result-ni" class="result-value">£0.00</td>
                        </tr>
                        <tr>
                            <td>Student Loan</td>
                            <td id="result-student-loan" class="result-value">£0.00</td>
                        </tr>
                        <tr>
                            <td>Pension</td>
                            <td id="result-pension" class="result-value">£0.00</td>
                        </tr>
                        <tr>
                            <td>Other Deductions</td>
                            <td id="result-other-deductions" class="result-value">£0.00</td>
                        </tr>
                        <tr class="net-income">
                            <td><strong style="color: white;">Net Income</strong></td>
                            <td id="result-net-income" class="result-value">£0.00</td>
                        </tr>
                    </tbody>
                </table>

        `;

        attachResultViewButtons(
            yearlyIncome, 
            incomeTax, nationalInsurance, studentLoan, pension, otherDeductions, netIncome
        );
        
    });

        // Tooltip Click Handling
        document.addEventListener("click", function (event) {
            const tooltipIcon = event.target.closest(".tooltip-icon");
        
            if (tooltipIcon) {
                event.stopPropagation(); // Prevent click from closing itself
        
                // Close all other tooltips first
                document.querySelectorAll(".tooltip-icon").forEach(tip => {
                    if (tip !== tooltipIcon) {
                        tip.classList.remove("active");
                    }
                });
        
                // Toggle the clicked tooltip
                tooltipIcon.classList.toggle("active");
            } else {
                // If clicking outside any tooltip, close all tooltips
                document.querySelectorAll(".tooltip-icon").forEach(icon => {
                    icon.classList.remove("active");
                });
            }
        });                     

}

function setDefaultPensionValues() {
    const pensionInput = document.getElementById('pension');
    const pensionFixed = document.getElementById('pension-type-fixed');
    const pensionPercentage = document.getElementById('pension-type-percentage');
    const pensionFrequency = document.getElementById('pension-frequency');

    // Restore saved pension contribution value
    if (pensionInput) pensionInput.value = localStorage.getItem("pension") || "0";

    // Restore pension type selection
    const savedPensionType = localStorage.getItem("pension-type");
    if (savedPensionType === "fixed") {
        pensionFixed.checked = true;
    } else {
        pensionPercentage.checked = true;
    }

    // Restore pension frequency selection
    if (pensionFrequency) {
        pensionFrequency.value = localStorage.getItem("pension-frequency") || "yearly";
    }
}

// Extract personal allowance from the tax code by taking the digits and multiplying by 10
function getPersonalAllowance(taxCode, defaultAllowance) {
    let codeNum = parseFloat(taxCode.replace(/\D/g, ''));
    return codeNum ? codeNum * 10 : defaultAllowance;
}

// Calculate income tax using the band thresholds and rates
function calculateIncomeTax(adjustedIncome, personalAllowance, rules) {
    let taxableIncome = Math.max(0, adjustedIncome - personalAllowance);
    return [
        { threshold: rules.higherRateThreshold, rate: rules.rates.additional },
        { threshold: rules.basicRateThreshold, rate: rules.rates.higher },
        { threshold: 0, rate: rules.rates.basic }
    ].reduce((tax, { threshold, rate }) => {
        if (taxableIncome > threshold) {
            tax += (taxableIncome - threshold) * rate;
            taxableIncome = threshold;
        }
        return tax;
    }, 0);
}

// Calculate National Insurance (NI); assume NI is not due if age is 65 or above
function calculateNI(grossIncome, ageBracket, niThreshold, niRate) {
    if (ageBracket === "66-74" || ageBracket === "75-plus") {
        return 0; // No NI if 66+
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

        document.getElementById('result-gross-income').textContent = 
        `£${(yearlyIncome * factor).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
        document.getElementById('result-income-tax').textContent = `£${(incomeTax * factor).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('result-ni').textContent = `£${(nationalInsurance * factor).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('result-student-loan').textContent = `£${(studentLoan * factor).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        document.getElementById('result-pension').textContent = 
        activeKey === "yearly" ? `£${pension.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` :
        activeKey === "monthly" ? `£${(pension / 12).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` :
        `£${(pension / 52).toFixed(2)}`;

        document.getElementById('result-other-deductions').textContent = `£${(otherDeductions * factor).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('result-net-income').textContent = `£${(netIncome * factor).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    }

    // Determine default view based on user's selected income frequency
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

// Form Persistence Functionality
function attachFormPersistence() {
    const form = document.getElementById("calculator-form");
    if (!form) return;

    const inputs = form.querySelectorAll("input, select");

    // Load saved form data on page load
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            if (input.type === "checkbox" || input.type === "radio") {
                input.checked = savedValue === "true";
            } else {
                input.value = savedValue;
            }
        }
    });

    // Save pension type selection (fixed or percentage)
    const pensionFixed = document.getElementById("pension-type-fixed");
    const pensionPercentage = document.getElementById("pension-type-percentage");

    pensionFixed.addEventListener("change", () => {
        localStorage.setItem("pension-type", "fixed");
    });

    pensionPercentage.addEventListener("change", () => {
        localStorage.setItem("pension-type", "percentage");
    });

    // Restore pension type selection
    const savedPensionType = localStorage.getItem("pension-type");
    if (savedPensionType === "fixed") {
        pensionFixed.checked = true;
    } else {
        pensionPercentage.checked = true;
    }

    // Save & Restore Pension Contribution Input
    const pensionInput = document.getElementById("pension");
    if (pensionInput) {
        pensionInput.value = localStorage.getItem("pension") || "";

        pensionInput.addEventListener("input", () => {
            localStorage.setItem("pension", pensionInput.value);
        });
    }

    // Save & Restore Pension Frequency Selection
    const pensionFrequency = document.getElementById("pension-frequency");
    if (pensionFrequency) {
        pensionFrequency.value = localStorage.getItem("pension-frequency") || "yearly";

        pensionFrequency.addEventListener("change", () => {
            localStorage.setItem("pension-frequency", pensionFrequency.value);
        });
    }

    // Save & Restore Advanced Mode
    const modeToggle = document.getElementById("mode-toggle");
    if (modeToggle) {
        modeToggle.checked = localStorage.getItem("advanced-mode") === "true";
        document.getElementById('advanced-container').style.display = modeToggle.checked ? 'block' : 'none';
        document.getElementById('toggle-label').textContent = modeToggle.checked ? 'Advanced Mode' : 'Basic Mode';

        modeToggle.addEventListener("change", () => {
            localStorage.setItem("advanced-mode", modeToggle.checked);
            document.getElementById('advanced-container').style.display = modeToggle.checked ? 'block' : 'none';
            document.getElementById('toggle-label').textContent = modeToggle.checked ? 'Advanced Mode' : 'Basic Mode';
        });
    }

    // Save other input values
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.type === "checkbox" || input.type === "radio") {
                localStorage.setItem(input.id, input.checked);
            } else {
                localStorage.setItem(input.id, input.value);
            }
        });
    });

    // Clear form data when clicking "Clear" button
    const clearButton = document.getElementById("clear-btn");
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            inputs.forEach(input => {
                localStorage.removeItem(input.id);
            });
            localStorage.removeItem("pension-type");
            localStorage.removeItem("pension");
            localStorage.removeItem("pension-frequency");
            localStorage.removeItem("advanced-mode");
        });
    }
}

function updateResultView(amount, label) {
    document.getElementById('result-content').innerHTML = `<p><strong>${label}:</strong> £${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;
}

// =====================================================================
// NEXT TOOL FUNCTIONALITY BELOW HERE...
// =====================================================================