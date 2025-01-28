console.log('Emporah Toolkit website loaded');

// Select elements
const calculateBtn = document.getElementById('calculate-btn');
const resultHeading = document.getElementById('result-heading');
const resultDiv = document.getElementById('result');
const resultContent = document.getElementById('result-content');

// Add event listener for the Calculate button
calculateBtn.addEventListener('click', () => {
    // Get input values
    const income = parseFloat(document.getElementById('income').value);
    const frequency = document.getElementById('income-frequency').value;
    const otherDeductions = parseFloat(document.getElementById('other-deductions').value);

    // Validate inputs
    if (isNaN(income) || isNaN(otherDeductions)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    // Convert income to annual equivalent
    let annualIncome;
    if (frequency === "yearly") {
        annualIncome = income;
    } else if (frequency === "monthly") {
        annualIncome = income * 12;
    } else if (frequency === "weekly") {
        annualIncome = income * 52;
    }

    // UK Tax Bands
    const personalAllowance = 12570;
    const basicRateThreshold = 50270;
    const higherRateThreshold = 125140;

    // Calculate Personal Allowance Reduction
    let effectivePersonalAllowance = personalAllowance;
    if (annualIncome > 100000) {
        effectivePersonalAllowance -= (annualIncome - 100000) / 2;
        if (effectivePersonalAllowance < 0) effectivePersonalAllowance = 0;
    }

    // Calculate Taxable Income
    const taxableIncome = annualIncome - effectivePersonalAllowance;

    // Calculate Income Tax
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

    // Calculate National Insurance
    let nationalInsurance = 0;
    if (annualIncome > 12570) {
        if (annualIncome <= basicRateThreshold) {
            nationalInsurance += (annualIncome - 12570) * 0.08;
        } else {
            nationalInsurance += (basicRateThreshold - 12570) * 0.08;
            nationalInsurance += (annualIncome - basicRateThreshold) * 0.02;
        }
    }

    // Total Deductions
    const totalDeductions = incomeTax + nationalInsurance + otherDeductions;

    // Take-Home Pay
    const takeHomePay = annualIncome - totalDeductions;

    // Store values for all timeframes
    const results = {
        yearly: {
            income: annualIncome,
            tax: incomeTax,
            ni: nationalInsurance,
            deductions: otherDeductions,
            takeHome: takeHomePay,
        },
        monthly: {
            income: annualIncome / 12,
            tax: incomeTax / 12,
            ni: nationalInsurance / 12,
            deductions: otherDeductions / 12,
            takeHome: takeHomePay / 12,
        },
        weekly: {
            income: annualIncome / 52,
            tax: incomeTax / 52,
            ni: nationalInsurance / 52,
            deductions: otherDeductions / 52,
            takeHome: takeHomePay / 52,
        },
    };

    // Display yearly results by default
    displayResults("yearly", results);

    // Add event listeners to view buttons
    document.getElementById('view-yearly').addEventListener('click', () => displayResults("yearly", results));
    document.getElementById('view-monthly').addEventListener('click', () => displayResults("monthly", results));
    document.getElementById('view-weekly').addEventListener('click', () => displayResults("weekly", results));
});

// Function to display results for a specific timeframe
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

// Helper function to capitalize view names
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
