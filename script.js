document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });

    // Simple newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Gracias por suscribirte con el email: ${email}`);
        this.reset();
    });

    // Responsive menu handling
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.style.display = 'block';
        } else {
            mainNav.style.display = 'none';
        }
    });

    // You might want to add more JavaScript for additional functionality
    // such as image sliders, product quick views, etc.
});