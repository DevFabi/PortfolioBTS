(function($) {
  $(window).load(function() {
    $(".loader").fadeOut("1000");
  });

  $("#accueil").parallax("center", 1, 0.1);
  $("#qui").parallax("center", 0.5, 0.4);

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  $(".js-scrollTo").on("click", function() {
    // Au clic sur un Ã©lÃ©ment
    var page = $(this).attr("href"); // Page cible
    var speed = 750; // DurÃ©e de l'animation (en ms)
    $("html, body").animate({ scrollTop: $(page).offset().top }, speed); // Go
    return false;
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $(".portfolio-modal").on("show.bs.modal", function(e) {
    $(".navbar").addClass("d-none");
  });
  $(".portfolio-modal").on("hidden.bs.modal", function(e) {
    $(".navbar").removeClass("d-none");
  });

  // GALERIE POUR AXE CUBE

  var fast = 200;
  $("#reali li").hover(
    function(e) {
      var liPos = $(this).offset();
      var bord = comingMouse(
        e.pageX - liPos.left,
        e.pageY - liPos.top,
        $(this).width(),
        $(this).height()
      );
      var overlay = $(this).find($(".overlay"));
      switch (bord) {
        case "left":
          overlay.css({ top: 0, left: "-100%" });
          overlay.stop().animate({ left: 0 }, fast, "linear");
          break;
        case "right":
          overlay.css({ top: 0, left: "100%" });
          overlay.stop().animate({ left: 0 }, fast, "linear");
          break;
        case "top":
          overlay.css({ top: "-100%", left: 0 });
          overlay.stop().animate({ top: 0 }, fast, "linear");
          break;
        case "bottom":
          overlay.css({ top: "100%", left: 0 });
          overlay.stop().animate({ top: 0 }, fast, "linear");
          break;
      }
    },
    function(e) {
      var liPos = $(this).offset();
      var bord = comingMouse(
        e.pageX - liPos.left,
        e.pageY - liPos.top,
        $(this).width(),
        $(this).height()
      );
      var overlay = $(this).find($(".overlay"));
      switch (bord) {
        case "left":
          overlay.stop().animate({ left: "-100%" }, fast);
          break;
        case "right":
          overlay.stop().animate({ left: "100%" }, fast);
          break;
        case "top":
          overlay.stop().animate({ top: "-100%" }, fast);
          break;
        case "bottom":
          overlay.stop().animate({ top: "100%" }, fast);
          break;
      }
    }
  );

  function comingMouse(hor, vert, larg, haut) {
    var top = Math.abs(vert),
      bottom = Math.abs(vert - haut),
      left = Math.abs(hor),
      right = Math.abs(hor - larg);

    var min = Math.min(top, bottom, left, right);
    switch (min) {
      case left:
        return "left";
      case right:
        return "right";
      case top:
        return "top";
      case bottom:
        return "bottom";
    }
  }
  function moveToSelected(element) {
    if (element == "next") {
      var selected = $(".selected").next();
    } else if (element == "prev") {
      var selected = $(".selected").prev();
    } else {
      var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();

    $(selected)
      .removeClass()
      .addClass("selected");

    $(prev)
      .removeClass()
      .addClass("prev");
    $(next)
      .removeClass()
      .addClass("next");

    $(nextSecond)
      .removeClass()
      .addClass("nextRightSecond");
    $(prevSecond)
      .removeClass()
      .addClass("prevLeftSecond");

    $(nextSecond)
      .nextAll()
      .removeClass()
      .addClass("hideRight");
    $(prevSecond)
      .prevAll()
      .removeClass()
      .addClass("hideLeft");
  }

  $("#carousel div").click(function() {
    moveToSelected($(this));
  });

  //galerie graphique

  $(".filter-button").click(function() {
    var value = $(this).attr("data-filter");

    if (value == "all") {
      $(".filter").show("1000");
    } else {
      $(".filter")
        .not("." + value)
        .hide("3000");
      $(".filter")
        .filter("." + value)
        .show("3000");
    }
  });

  if ($(".filter-button").removeClass("active")) {
    $(this).removeClass("active");
  }
  $(this).addClass("active");

  $(document).ready(function() {
    $(".thumbnail").on("click", function() {
      $(".box > img").attr("src", $(this).attr("src"));
      $(".box > p").html($(this).attr("description"));
      $("#lightbox")
        .find(".modal-dialog")
        .css({ width: $("img").width() });
      $("#lightbox").modal("toggle");
      $("#lightbox").modal("show");
    });
  });
})(jQuery); // End of use strict