
function randInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function pick(arr) {
  return arr[(Math.random() * arr.length) | 0]
}


let library = "https://opensheet.elk.sh/1OV6LuUUmJuGLLDSNERuG83fAMfBZUanwNbQBcU8wedY/Inventory";

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
          </div>`).appendTo("#library")
          .css("width", randInt(70,93) + "%")
          .css("transform", "rotate(" + (_neg * _rotate) + "deg)");
      
      if(_acquisition == "wishlist"){
        bookDiv.find("strong").append("<sup>WISHLIST</sup>")
      }
      
      
    });
    
    
});
  
});
