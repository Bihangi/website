document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const paymentForm = document.getElementById('paymentForm');
    const submitButton = document.getElementById('payButton');

    // Menu button toggle
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        closeBtn.style.display = 'none';
        menuBtn.style.display = 'block';
    });

    // Dropdowns toggle
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });


    // Payment form 
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Perform validation and show the thank you message
        if (validateForm()) {
            const deliveryDate = calculateDeliveryDate();
            alert(`Thank you for your purchase! Your items will be delivered on ${deliveryDate}.`);
        } else {
            alert('Please fill in all the required fields.');
        }
    });


    // Function to validate the form
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();

        return name !== '' && email !== '' && address !== '';
    }


    // Function to calculate the delivery date
    function calculateDeliveryDate() {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 7);
        return deliveryDate.toDateString();
    }
});
