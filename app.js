console.log('Emporah Toolkit website loaded');

// Toggle Sidebar Functionality
const burgerButton = document.getElementById('left-menu-burger-button');
const sidebar = document.querySelector('nav');
const mainContent = document.querySelector('main');

burgerButton.addEventListener('click', () => {
    // Toggle the 'open' class on the sidebar
    sidebar.classList.toggle('open');

    // Toggle the 'sidebar-closed' class on the main content
    mainContent.classList.toggle('sidebar-closed');

    // Update aria-expanded for accessibility
    const expanded = burgerButton.getAttribute('aria-expanded') === 'true';
    burgerButton.setAttribute('aria-expanded', !expanded);

    // Optionally toggle active state for hamburger button animation
    burgerButton.classList.toggle('active');
});

document.getElementById('nav-calculator').addEventListener('click', () => {
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
});

// Calculator Functionality
function attachCalculatorFunctionality() {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultHeading = document.getElementById('result-heading');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('result-content');

    calculateBtn.addEventListener('click', () => {
        const incomeField = document.getElementById('income');
        const frequencyField = document.getElementById('income-frequency');
        const otherDeductionsField = document.getElementById('other-deductions');

        const income = parseFloat(incomeField.value);
        const frequency = frequencyField.value;
        const otherDeductions = parseFloat(otherDeductionsField.value);

        if (isNaN(income) || isNaN(otherDeductions)) {
            alert("Please fill out all fields correctly.");
            return;
        }

        let annualIncome;
        if (frequency === "yearly") annualIncome = income;
        if (frequency === "monthly") annualIncome = income * 12;
        if (frequency === "weekly") annualIncome = income * 52;

        const personalAllowance = 12570;
        const basicRateThreshold = 50270;
        const higherRateThreshold = 125140;

        let effectivePersonalAllowance = personalAllowance;
        if (annualIncome > 100000) {
            effectivePersonalAllowance -= (annualIncome - 100000) / 2;
            if (effectivePersonalAllowance < 0) effectivePersonalAllowance = 0;
        }

        const taxableIncome = annualIncome - effectivePersonalAllowance;
        let incomeTax = 0;

        if (taxableIncome > 0) {
            if (taxableIncome <= basicRateThreshold) {
                incomeTax += taxableIncome * 0.2;
            } else if (taxableIncome <= higherRateThreshold) {
                incomeTax += (basicRateThreshold - effectivePersonalAllowance) * 0.2;
                incomeTax += (taxableIncome - basicRateThreshold) * 0.4;
            } else {
                incomeTax += (basicRateThreshold - effectivePersonalAllowance) * 0.2;
                incomeTax += (higherRateThreshold - basicRateThreshold) * 0.4;
                incomeTax += (taxableIncome - higherRateThreshold) * 0.45;
            }
        }

        let nationalInsurance = 0;
        const weeklyIncome = annualIncome / 52;
        const weeklyLowerThreshold = 12570 / 52;
        const weeklyUpperThreshold = 50270 / 52;

        if (weeklyIncome > weeklyLowerThreshold) {
            if (weeklyIncome <= weeklyUpperThreshold) {
                nationalInsurance = (weeklyIncome - weeklyLowerThreshold) * 0.08 * 52;
            } else {
                nationalInsurance = (weeklyUpperThreshold - weeklyLowerThreshold) * 0.08 * 52;
                nationalInsurance += (weeklyIncome - weeklyUpperThreshold) * 0.02 * 52;
            }
        }

        const totalDeductions = incomeTax + nationalInsurance + otherDeductions;
        const takeHomePay = annualIncome - totalDeductions;

        const results = {
            yearly: { income: annualIncome, tax: incomeTax, ni: nationalInsurance, deductions: otherDeductions, takeHome: takeHomePay },
            monthly: { income: annualIncome / 12, tax: incomeTax / 12, ni: nationalInsurance / 12, deductions: otherDeductions / 12, takeHome: takeHomePay / 12 },
            weekly: { income: annualIncome / 52, tax: incomeTax / 52, ni: nationalInsurance / 52, deductions: otherDeductions / 52, takeHome: takeHomePay / 52 },
        };

        displayResults("yearly", results);

        document.getElementById('view-yearly').addEventListener('click', () => displayResults("yearly", results));
        document.getElementById('view-monthly').addEventListener('click', () => displayResults("monthly", results));
        document.getElementById('view-weekly').addEventListener('click', () => displayResults("weekly", results));
    });

    function displayResults(view, results) {
        const { income, tax, ni, deductions, takeHome } = results[view];
        resultHeading.style.display = "block";
        resultDiv.style.display = "block";
        resultContent.innerHTML = `
            <p><strong>Gross ${capitalize(view)} Income:</strong> £${income.toFixed(2)}</p>
            <p><strong>Income Tax:</strong> £${tax.toFixed(2)}</p>
            <p><strong>National Insurance:</strong> £${ni.toFixed(2)}</p>
            <p><strong>Other Deductions:</strong> £${deductions.toFixed(2)}</p>
            <p><strong>Take-Home Pay:</strong> £${takeHome.toFixed(2)}</p>
        `;
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}