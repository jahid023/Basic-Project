document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            localStorage.setItem('theme', body.getAttribute('data-theme'));
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
        }
    }

    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.querySelector('.main-content');
    const topBar = document.querySelector('.top-bar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
            topBar.classList.toggle('sidebar-active');
        });
    }

    // Highlight active nav item
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.sidebar-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active');
        }
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Initialize charts
    initializeCharts();

    // Initialize user table
    initializeUserTable();

    // Initialize product grid
    initializeProductGrid();
});

// Chart functions
function initializeCharts() {
    // Sample data for charts
    const sampleData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#2563eb',
                tension: 0.1
            }
        ]
    };

    // Line chart
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: sampleData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// User table functions
function initializeUserTable() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive' },
        // Add more sample users
    ];

    const tableBody = document.getElementById('userTableBody');
    if (tableBody) {
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <span class="status-badge ${user.status}">${user.status}</span>
                </td>
                <td>
                    <button class="btn btn-primary" data-modal="viewUserModal">View</button>
                    <button class="btn btn-success" data-modal="editUserModal">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Product grid functions
function initializeProductGrid() {
    const products = [
        { id: 1, name: 'Product 1', price: '$99.99', stock: 'In Stock' },
        { id: 2, name: 'Product 2', price: '$149.99', stock: 'Low Stock' },
        // Add more sample products
    ];

    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="assets/default-product.png" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <span class="stock-status ${product.stock.toLowerCase()}">${product.stock}</span>
                </div>
                <button class="btn btn-primary">Edit</button>
            `;
            productGrid.appendChild(card);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
