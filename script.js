$(document).ready(function() {
    // Hero Slider
    $('.hero-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000
    });

    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('.main-nav').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Sticky Header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.main-header').addClass('scrolled');
        } else {
            $('.main-header').removeClass('scrolled');
        }
    });

    // Smooth Scroll
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Newsletter Form Submission
    $('#newsletter-form').submit(function(e) {
        e.preventDefault();
        var email = $(this).find('input[type="email"]').val();
        alert('Gracias por suscribirte con el email: ' + email);
        this.reset();
    });

    // Product Hover Effect
    $('.product-item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );

    // Responsive Menu Handling
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.main-nav').removeClass('active');
            $('.mobile-menu-toggle').removeClass('active');
        }
    });
});