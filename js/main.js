document.addEventListener('DOMContentLoaded', () => {
    renderCompanyCards();
    renderStockChart();
    renderMetrics();
    setupFilters();
});

function renderCompanyCards() {
    const container = document.getElementById('companyCards');
    container.innerHTML = '';
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
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Stock Price ($)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function renderMetrics() {
    const container = document.getElementById('metricsGrid');
    container.innerHTML = '';
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

function setupFilters() {
    const sortOptions = ['marketCap', 'revenue', 'employees', 'stockPrice'];
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="sort-controls">
            <label>Sort by: 
                <select id="sortSelect">
                    ${sortOptions.map(opt => `<option value="${opt}">${opt.charAt(0).toUpperCase() + opt.slice(1)}</option>`).join('')}
                </select>
            </label>
            <button id="sortOrder">↓</button>
        </div>
    `;
    
    document.querySelector('.company-overview').insertBefore(filterContainer, document.getElementById('companyCards'));
    
    let ascending = false;
    document.getElementById('sortOrder').addEventListener('click', (e) => {
        ascending = !ascending;
        e.target.textContent = ascending ? '↑' : '↓';
        sortCompanies();
    });
    
    document.getElementById('sortSelect').addEventListener('change', sortCompanies);
}

function sortCompanies() {
    const sortBy = document.getElementById('sortSelect').value;
    const ascending = document.getElementById('sortOrder').textContent === '↑';
    
    companiesData.companies.sort((a, b) => {
        let aVal = parseFloat(a[sortBy].replace(/[^0-9.]/g, ''));
        let bVal = parseFloat(b[sortBy].replace(/[^0-9.]/g, ''));
        return ascending ? aVal - bVal : bVal - aVal;
    });
    
    renderCompanyCards();
    renderMetrics();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}