function randInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function pick(arr) {
  return arr[(Math.random() * arr.length) | 0]
}


let library = "https://opensheet.elk.sh/1OV6LuUUmJuGLLDSNERuG83fAMfBZUanwNbQBcU8wedY/Inventory";

const libraries = {

}


function viewBook(_title, _author, _color, _acquisition) {


  $(".library-view-wrapper").removeClass("wishlist");
  $(".library-view-list .book").removeClass("active");


  // scroll
  $('html, body').animate({
    scrollTop: $("#library").offset().top
  }, 500);


  $(".library-view-details *[name='title']").html(_title);
  $(".library-view-details span[name='author']").html(_author);



  // handle colors
  $(".library-view-horizontal .book[title='" + _title + "']").css("background", _color);
  $(".library-view-book").css("background", _color);

}



$(document).ready(function () {


  console.log("ready!");

  // Color

  var n = {
    x: -1,
    y: -1
  };
  $(document).mousemove(function (i) {
    (n.x = i.pageX), (n.y = i.pageY);
  });

  var i = function () {
    return "hsla(" + (n.y / $(window).height()) * 360 + ", 60%, 50%, 1)";
  };

  var iJ = function () {
    return "hsla(" + (n.x / n.y) * 720 + ", 60%, 50%, 1)";
  };


  // Handle navigation
  $("#top .subnav").on("click", "h2", function () {
    let g = $(this).attr("goto");

    console.log(g);

    $("#top .info .info-wrapper").hide();
    $("#top .info .info-wrapper[content=" + g + "]").show();

  });


  // Get books
  $.getJSON(library, function (data) {

    data.forEach(function (book, i) {

      if (!book.hasOwnProperty('Book')) return;

      //      console.log(book, i);

      let _acquisition;
      let _neg = pick([-1, 1]);
      let _rotate = randInt(0, 2);

      if (book.STATUS == "WISHLIST") _acquisition = "wishlist";
      if (book.STATUS == "ACQUIRED") _acquisition = "have";

      let bookHorizontalDiv = $(`<div class='book' type='` + _acquisition + `' title='` + book.Book +`'>
          <div class="book-content">
          <span name='title'>` + book.Book + `</span><br>
          <span name='author'>` + book.Author + `</span>
          </div>
          </div>`).appendTo(".library-view-horizontal")
        //          .css("width", randInt(25,40) + "px")
        .css("height", randInt(100, 180) + "px");

      let bookDiv = $(`<div class='book' type='` + _acquisition + `'>
          <span name='title'>` + book.Book + `</span>
          <span name='author'>` + book.Author + `</span>
          </div>`).appendTo(".library-view-list");

      if (_acquisition == "wishlist") {
        bookDiv.find("strong").append("<sup>WISHLIST</sup>")
      }

      if (book.Tags && book.Tags.length !== 0) {
        let tags = book.Tags.split(",");
        let finalTags = "";

        $.each(tags, function (i, tag) {
          finalTags += tag.trim().toLowerCase();
          finalTags += " ";
        });

        $(bookDiv).attr("tags", finalTags);
      }

      if (book.Donor && book.Donor.length !== 0) {
        bookDiv.append("<span class='donor'>(Donated by " + book.Donor + ")</span>");
      }


    });


  });

  // ADD VERTICAL SCROLL
  //  $(".library-view-horizontal-wrapper").addEventListener('wheel', (ev) => {
  //  ev.preventDefault();  // stop scrolling in another direction
  //  $(".library-view-horizontal-wrapper").scrollLeft += (ev.deltaY + ev.deltaX);
  //});
  //  

  $(".library-view-horizontal").on("mouseover", ".book", function () {

    let _title = $(this).find("[name='title']").html();
    let _author = $(this).find("[name='author']").html();
    var n = iJ();

    console.log("!", _title, _author);

    viewBook(_title, _author, n, $(this).attr("type"));

    // if unacquired
    if ($(this).attr("type") == "wishlist") {
      $(".library-view-wrapper").addClass("wishlist");
    }

  });


  $(".library-view-horizontal").on("mouseleave", ".book", function () {
    $(".library-view-wrapper").removeClass("wishlist");
  });


  $(".library-view-horizontal-wrapper").mousewheel(function (event, delta) {
    this.scrollLeft -= (delta * 1.2);
    event.preventDefault();
  });


  $(".library-view-list").on("click", ".book",
    function () {

      $(".library-view-wrapper").removeClass("wishlist");
      $(".library-view-list .book").removeClass("active");
      $(".library-view-horizontal .book").css("background", "#000000");

      $(this).addClass("active");

      let n = i();
      $(this).css("color", n);

      // if unacquired
      if ($(this).attr("type") == "wishlist") {
        $(".library-view-wrapper").addClass("wishlist");
      }


      let _title = $(this).find("[name='title']").html();
      let _author = $(this).find("[name='author']").html();


      viewBook(_title, _author, n, $(this).attr("type"));


    });


  $(".library-wrapper").on("mouseenter", ".book",
    function () {
      console.log("...");
      var n = i();
      $(this).css("color", n);
      if (!window.matchMedia("(max-width: 700px)")) {
        $(this).css("border", "1px solid " + n);
      }
    }
  );


  $(".library-wrapper").on("mouseleave", ".book",
    function () {
      $(this).css("color", "black");
      if (!window.matchMedia("(max-width: 700px)")) {
        $(this).css("border", "1px solid black");
      }
    }
  );


  //    $(".library-view-horizontal").on("mouseenter", ".book", 
  //        function () {
  //          console.log("...");
  //            var n = iJ();
  //            $(this).css("background", n );
  //            $(".library-view-book").css("background", n );
  //        }
  //    ); 

  $(".library-view-horizontal").on("mouseleave", ".book",
    function () {
      $(this).css("background", "#000");
    }
  );


});
