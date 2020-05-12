/**
 * === Slick Slider ===
 */

import "slick-carousel";

const initSlider = function() {
  $(".slick-slider").slick({
    dots: true,
    arrows: true,
    rows: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    customPaging: function(slider, i) {
      return '<span class="dot"></span>';
    },
    appendDots: ".slides-item__dots",
    appendArrows: ".slides-item__arrows",
    prevArrow: '<span class="slick-arrow slick-arrow--prev"></span>',
    nextArrow: '<span class="slick-arrow slick-arrow--next"></span>',
  });
};

/**
 * === Hero Home ===
 */

const setbackgroundImageByViewport = function(element) {
  const el = $(element);
  const bgMobile = el.data("bgMobile");
  const bgTablet = el.data("bgTablet");
  const bgDesktop = el.data("bgDesktop");

  const _isMobile = function() {
    return window.innerWidth < 768;
  };

  const _isTablet = function() {
    return window.innerWidth >= 768 && window.innerWidth < 1200;
  };

  const heroBg = _isMobile() ? bgMobile : _isTablet() ? bgTablet : bgDesktop;
  el.css("background-image", "url(" + heroBg + ")");
};

/**
 * === Mobile Menu ===
 */

function handleMobileMenu() {
  var menuInner = $(".js-menu-inner"),
    menuTrigger = $(".js-menu-trigger"),
    menuInnerBackgroundItem = $(".js-menu-inner-background").find("i"),
    menuItem = $(".js-menu-items-list").find("li"),
    menuItemsShape = $(".js-menu-items-shape"),
    menuClose = $(".js-menu-close"),
    timeline = new TimelineMax({
      paused: true,
    }),
    _self,
    linksWrapper = $(".js-menu-items-wrapper"),
    linksItems = $(".js-menu-items-list").find("li"),
    activeItem = $(".js-menu-item.is-active"),
    activeItemPosition = activeItem.position().top,
    menuItemsShapePath = $(".js-items-shape-path"),
    topOffset = 8;

  timeline
    .to(
      menuInner,
      1,
      {
        autoAlpha: 1,
        ease: Power4.easeOut,
      },
      "start"
    )
    .fromTo(
      menuInnerBackgroundItem,
      0.25,
      {
        x: "-100%",
        autoAlpha: 0,
      },
      {
        x: "0%",
        autoAlpha: 1,
        ease: Power1.easeOut,
      },
      "start"
    )
    .staggerFromTo(
      menuItem,
      0.4,
      {
        x: -30,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 0.35,
        ease: Back.easeOut.config(1),
      },
      0.15,
      "start"
    )
    .fromTo(
      menuItemsShape,
      0.25,
      {
        scale: 0.7,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        delay: 0.95,
        ease: Back.easeOut.config(1.7),
      },
      "start"
    )
    .fromTo(
      menuClose,
      0.2,
      {
        x: -10,
        autoAlpha: 0,
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 1,
        ease: Power1.easeOut,
      },
      "start"
    );

  function _hoverAnimation() {
    TweenMax.set(menuItemsShape, {
      y: activeItemPosition + topOffset,
    });

    linksItems.on({
      mouseenter: function() {
        _self = $(this);
        var selfParent = _self.closest(linksWrapper),
          targetCircle = selfParent.find(menuItemsShape),
          circlePosition = _self.position().top;

        TweenMax.to(targetCircle, 0.4, {
          y: circlePosition + topOffset,
          ease: Power2.easeOut,
        });

        TweenMax.to(menuItemsShapePath, 1, { morphSVG: this.dataset.morph });
      },
    });

    linksWrapper.on({
      mouseleave: function() {
        _self = $(this);
        var selfParent = _self.closest(linksWrapper),
          activeLink = selfParent.find(activeItem),
          targetCircle = selfParent.find(menuItemsShape),
          activeLinkPosition = activeLink.position().top;

        TweenMax.to(targetCircle, 0.4, {
          y: activeLinkPosition + topOffset,
          ease: Power2.easeOut,
        });

        TweenMax.to(menuItemsShapePath, 1, { morphSVG: menuItemsShapePath });
      },
    });
  }

  menuTrigger.on("click", function() {
    $(".menu").css("visibility", "visible");
    $("body, html").addClass("menu-open");
    timeline.play();
  });

  menuClose.on("click", function() {
    $("body, html").removeClass("menu-open");
    timeline.timeScale(1.25);
    timeline.reverse();
    setTimeout(() => {
      $(".menu").css("visibility", "hidden");
    }, 2000);
  });

  _hoverAnimation();
}

/**
 * Add to cart
 */

const handleAddToCart = function() {
  var isClicked = false;

  $(".btn-add-to-cart").click(function(e) {
    e.preventDefault();

    if (isClicked === false) {
      $(this).html("Go to cart");
      $(this).attr("href", "/cart");
      isClicked = true;
      return;
    }

    window.location = "/cart";

    console.log(e.target);
  });
};

/**
 * INIT JS
 */

$(window).ready(function() {
  initSlider();
  setbackgroundImageByViewport("#hero-home");
  handleMobileMenu();
  handleAddToCart();
});

$(window).resize(function() {
  setbackgroundImageByViewport("#hero-home");
});
