document.addEventListener('DOMContentLoaded', () => {
    renderCompanyCards();
    renderStockChart();
    renderMetrics();
});

function renderCompanyCards() {
    const container = document.getElementById('companyCards');
    companiesData.companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <h3>${company.name} (${company.ticker})</h3>
            <p>Market Cap: ${company.marketCap}</p>
            <p>Stock Price: $${company.stockPrice}</p>
            <p>Founded: ${company.yearFounded}</p>
        `;
        container.appendChild(card);
    });
}

function renderStockChart() {
    const ctx = document.getElementById('stockChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: companiesData.companies.map(company => ({
                label: company.name,
                data: company.performance,
                borderColor: getRandomColor(),
                tension: 0.1
            }))
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '5-Month Stock Performance'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function renderMetrics() {
    const container = document.getElementById('metricsGrid');
    companiesData.companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'metric-card';
        card.innerHTML = `
            <h4>${company.name}</h4>
            <p>Revenue: ${company.revenue}</p>
            <p>Employees: ${company.employees}</p>
        `;
        container.appendChild(card);
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}