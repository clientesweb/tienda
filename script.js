$(document).ready(function() {
    // Hero Slider
    $('.hero-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
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

    // Horizontal Scroll for Categories and Products
    $('.category-grid, .product-grid').each(function() {
        var $this = $(this);
        var scrollSpeed = 0;
        var scrolling = false;

        $this.on('mouseenter', function() {
            scrolling = true;
            scrollContent();
        }).on('mouseleave', function() {
            scrolling = false;
        });

        $this.on('wheel', function(e) {
            e.preventDefault();
            var delta = e.originalEvent.deltaY;
            scrollSpeed = delta * 0.5;
            if (!scrolling) {
                scrolling = true;
                scrollContent();
            }
        });

        function scrollContent() {
            if (scrolling) {
                $this.scrollLeft($this.scrollLeft() + scrollSpeed);
                requestAnimationFrame(scrollContent);
            }
        }
    });

    // Lazy Loading Images
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        }
    });

    // Add to Cart Animation
    $('.btn').on('click', function(e) {
        if ($(this).text() === 'Añadir al Carrito') {
            e.preventDefault();
            $(this).addClass('added');
            $(this).text('Añadido al Carrito');
            setTimeout(() => {
                $(this).removeClass('added');
                $(this).text('Añadir al Carrito');
            }, 2000);
        }
    });
});