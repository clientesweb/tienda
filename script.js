document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slider = document.querySelector('.hero-slider .slides');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.hero-slider .prev');
    const nextBtn = document.querySelector('.hero-slider .next');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance slides
    setInterval(nextSlide, slideInterval);

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulating form submission (replace with actual AJAX call)
        setTimeout(() => {
            newsletterMessage.textContent = `¡Gracias por suscribirte, ${email}!`;
            newsletterMessage.classList.remove('hidden');
            newsletterMessage.classList.add('fade-in');
            this.reset();
        }, 1000);
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('loading');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        //  Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('loading');
        });
    }

    // Animate on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('slide-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Add to Cart Animation
    const addToCartButtons = document.querySelectorAll('.product-item .btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cart = document.querySelector('.cart-icon');
            const productImage = this.closest('.product-item').querySelector('img');

            const flyingImage = productImage.cloneNode();
            flyingImage.style.position = 'fixed';
            flyingImage.style.zIndex = '10000';
            flyingImage.style.width = '50px';
            flyingImage.style.height = '50px';
            flyingImage.style.borderRadius = '50%';
            flyingImage.style.objectFit = 'cover';
            
            const start = productImage.getBoundingClientRect();
            const end = cart.getBoundingClientRect();

            flyingImage.style.top = `${start.top}px`;
            flyingImage.style.left = `${start.left}px`;

            document.body.appendChild(flyingImage);

            flyingImage.style.transition = 'all 1s ease-in-out';
            setTimeout(() => {
                flyingImage.style.top = `${end.top}px`;
                flyingImage.style.left = `${end.left}px`;
                flyingImage.style.width = '20px';
                flyingImage.style.height = '20px';
                flyingImage.style.opacity = '0';
            }, 0);

            setTimeout(() => {
                flyingImage.remove();
                cart.classList.add('pulse');
                setTimeout(() => cart.classList.remove('pulse'), 300);
            }, 1000);
        });
    });
});