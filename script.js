document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });

    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Gracias por suscribirte con el email: ${email}`);
        this.reset();
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }
    });
});
