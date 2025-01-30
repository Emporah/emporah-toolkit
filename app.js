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
    window.location.hash = page; // Only modify hash, no pushState
    loadContent(page);
}

window.onload = () => loadContent(window.location.hash.replace("#", "") || "/dashboard");

// Handle browser back/forward navigation
window.onhashchange = () => loadContent(window.location.hash.replace("#", ""));

// Content Functionality
function loadContent(page) {
    let pageContent = '';

    if (page === '/dashboard') {
        pageContent = `
            <h1>Welcome to Emporah</h1>
            <p>Select a tool from the navigation bar to get started.</p>
        `;

    } else if (page === '/pay-calculator') {
        pageContent = `
            <h1>Pay Calculator</h1>
            <p>IN PROGRESS...</p>
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

        // Attach functionality after content loads
        setTimeout(() => attachCalculatorFunctionality(), 0);

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