
function randInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function pick(arr) {
  return arr[(Math.random() * arr.length) | 0]
}


let library = "https://opensheet.elk.sh/1OV6LuUUmJuGLLDSNERuG83fAMfBZUanwNbQBcU8wedY/Inventory";

const libraries = {
  
}


$( document ).ready(function() {
    console.log( "ready!" );
  
  $.getJSON(library, function(data) {
    // JSON result in `data` variable
//    console.log(data);
    
    data.forEach(function(book, i){
      
      if(!book.hasOwnProperty('Book')) return;
      
      console.log(book, i);
      
      let _acquisition;
      let _neg = pick([-1, 1]);
      let _rotate = randInt(0, 2);
      
      if(book.STATUS == "WISHLIST") _acquisition = "wishlist";
      if(book.STATUS == "ACQUIRED") _acquisition = "have";
      
      let bookDiv = $(`<div class='book' type='` + _acquisition + `'>
          <strong name='title'>` + book.Book + `</strong><br>
          <u name='author'>` + book.Author + `</u><br>
          </div>`).appendTo(".library-wrapper")
          .css("width", randInt(36,45) + "%")
//          .css("transform", "rotate(" + (_neg * _rotate) + "deg)")
      
      if(_acquisition == "wishlist"){
        bookDiv.find("strong").append("<sup>WISHLIST</sup>")
      }
      
      
    });
    
    
});
  
});

$(function () {
  
  console.log("FUCK");
    var n = { x: -1, y: -1 };
    $(document).mousemove(function (i) {
        (n.x = i.pageX), (n.y = i.pageY);
    });
    var i = function () {
        return "hsla(" + (n.y / $(window).height()) * 360 + ", 60%, 50%, 1)";
    };
  
    $(".library-wrapper").on("mouseenter", ".book", 
        function () {
          console.log("...");
            var n = i();
            $(this).css("color", n), $(this).css("border", "1px solid " + n);
        }
    ); 
  
  $(".library-wrapper").on("mouseleave", ".book", 
        function () { 
    $(this).css("color", "black"), $(this).css("border", "1px solid black");
        }
    );
});
