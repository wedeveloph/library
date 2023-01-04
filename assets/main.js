let library = "https://opensheet.elk.sh/1OV6LuUUmJuGLLDSNERuG83fAMfBZUanwNbQBcU8wedY/Inventory";

$( document ).ready(function() {
    console.log( "ready!" );
  
  $.getJSON(library, function(data) {
    // JSON result in `data` variable
    console.log(data);
});
  
});
