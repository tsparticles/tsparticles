$(document).ready(function(){

    // The following code is based off a toggle menu by @Bradcomp
    (function() {
        var burger = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.nav-menu');
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    })();

    //Left hamburger
    $(".hamburger-btn, #panel-close").on("click", function(i) {
        $('.menu-toggle .icon-box-toggle').toggleClass('active');
    });

    //function to add a data attribute management support
    $( "*" ).each(function() {
        //Background images
        var attr = $(this).attr('data-background-img');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background', 'url('+attr+')');
        }

    });

    //reveal elements on scroll so animations trigger the right way
    var $window           = $(window),
        win_height_padded = $window.height() * 1.1,
        isTouch           = Modernizr.touch;

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var scrolled = $window.scrollTop();
        $(".revealOnScroll:not(.animated)").each(function () {
            var $this     = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function(){
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'),10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
    }

    // Back to Top button behaviour
    var pxShow = 600;
    var scrollSpeed = 500;
    $(window).scroll(function() {
        if ($(window).scrollTop() >= pxShow) {
            $("#backtotop").addClass('visible');
        } else {
            $("#backtotop").removeClass('visible');
        }
    });
    $('#backtotop a').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, scrollSpeed);
        return false;
    });

    //Preloader
    $(window).on('load', function() { // makes sure the whole site is loaded 
        $('#status').fadeOut(); // will first fade out the loading animation 
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
        $('body').delay(350).css({'overflow':'visible'});
    })

    //Left Sidebar init and ps-scrollbar init
    if ($('#panel-trigger').length) {
        $('#panel-trigger, #panel-close').panelslider({
            clickClose: false,
        });
    }

    //Active sidebar links
    $(".side-menu-item").click(function() {
        $(".side-menu-item.is-active").removeClass('is-active');
        $(this).addClass('is-active');
        $(this).next('ul').toggle( "slide", function() {
        });
    });

    //Active sidebar sublinks
    $(".side-menu-subitem").click(function() {
        $(".side-menu-subitem.is-subactive").removeClass('is-subactive');
        $(this).addClass('is-subactive');
    });

    //expandable menu caret animation
    $('a.is-expandable').click(function(){
        $(this).toggleClass('expanded');
        $(this).children('i.end-icon').toggleClass('caret-rotate');
    })

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 550, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
})