/*jQuery function*/
$(document).ready(function(){
    $(".fa-search").click(function(){
        $(this).hide();
        $(".fa-search-close").show();
        $(".navbar .navbar-left").hide();
        $(".navbar .search-box").show();
        $("#form-search").fadeIn();
        $("#mkdocs-search-results").fadeIn();
        $(".search-backdrop").show();
    });
    $(".fa-search-close").click(function(){
        $(this).hide();
        $(".fa-search").show();
        $(".navbar .navbar-left").show();
        $(".navbar .search-box").hide();
        $("#form-search").hide();
        $("#mkdocs-search-results").fadeOut();
        $(".search-backdrop").fadeOut();
    });

    //protect table width
    $('.main-content div[role="main"] > table').wrap('<div class="protect-table"></div>');

    //Scroll app
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.bs-sidenav a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('.bs-sidenav li').removeClass('active');
        $(this).parent().addClass('active');

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    //hide sidebar when have only one item
    if ($('#sideNav > ul > li').length <= 1) {
        $('#sideNav').hide();
    } else {
        $('#sideNav').show();
    }

    //show hide sidebar
    $('#sideNav.bs-sidebar').click(function(){
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });

    //calculate height of sidebar to fit with window height
    var sidenav = $('#sideNav .bs-sidenav');
    if (sidenav.height() + sidenav.position().top > $(window).height()) {
        var padding_bott = sidenav.height() + sidenav.position().top - $(window).height();
        if (padding_bott > 200) {
            padding_bott = 200;
        } else if (padding_bott < 50) {
            padding_bott = 50;
        }
        sidenav.css({'height': ($(window).height() - sidenav.position().top) + 'px', 'overflow-y': 'scroll', 'padding-bottom': padding_bott+'px'});
    }

    //back to Top
    if ($('#back-to-top').length) {
        //fixed by window viewport
        $('#back-to-top').css({'left':($(window).width()-64)+'px', 'top':($(window).height()-64)+'px'});

        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    var wimHeight = $(window).height();
    $('ul.bs-sidenav li > a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top < scrollPos + wimHeight) {
            $('ul.bs-sidenav li').removeClass("active");
            currLink.parent().addClass("active");
        }
        else{
            //currLink.parent().removeClass("active");
        }
    });
}