document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        closeBtn.style.display = 'none';
        menuBtn.style.display = 'block';
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});

let cart = [];

function addToCart(productName, quantity, pricePerUnit, unit) {
    quantity = parseFloat(quantity);
    if (quantity <= 0 || isNaN(quantity)) {
        alert('Please enter a valid quantity.');
        return;
    }

    const product = {
        name: productName,
        quantity: quantity,
        price: quantity * pricePerUnit,
        unit: unit
    };

    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex >= 0) {
        cart[existingProductIndex] = product; // Replace the old item with the new one
    } else {
        cart.push(product);
    }

    updateCart();
}

function updateCart() {
    const tableBody = document.querySelector('#orderTable tbody');
    tableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>x${item.quantity} </td><td>Rs. ${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>`;
        tableBody.appendChild(row);
        total += item.price;
    });

    document.getElementById('totalPrice').textContent = `Rs. ${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function buyNow() {
    alert('Proceeding to buy now...');
}

function addToFavourites() {
    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
    alert('Order saved to favourites');
}

function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        cart = favouriteOrder;
        updateCart();
    } else {
        alert('No favourites found');
    }
}

function toggleProducts(sectionId) {
    const grid = document.getElementById(`${sectionId}-grid`);
    const isExpanded = grid.style.display === 'none';
    grid.style.display = isExpanded ? 'flex' : 'none';

    const section = grid.closest('.product-section');
    section.setAttribute('aria-expanded', isExpanded);
}
