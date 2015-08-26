$(document).ready(function(){
  console.log('ready');

/*********************************************/
                // FUNCTIONS //
/*********************************************/

//Displays the intro with slideup onclick
$('#introScreen').ready(function(){
        intro.delay(5000).slideUp('slow');
});

//CLICK COUNTER ON MOUSE-UP - called within ball
function clickCounter() {
    counter++;
    $("#theCount").text('Shots : ' + counter);
};

/*********************************************/
        //DECALRE THE GLOBAL VARIABLES//
/*********************************************/
var ball = $("#box"); //<--- Golf Ball
var r;
var counter = 0;
var hole = $('#example');
var intro = $('#introScreen');


//COORDINATES DEFINED TO THE LEFT
var y = $('#box').offset().top;
var x = $('#box').offset().left;
// GOLF BALL ROTATE FUNCTION
(function() {
    
    var RAD2DEG = 180 / Math.PI;            
    //Rotate from the middle of the ball
    ball.centerX = ball.offset().left + ball.width()/2;
    ball.centerY =  ball.offset().top + ball.height()/2;

    var offset, dragging=false;
    ball.mousedown(function(e) {
    dragging = true;
    offset = Math.atan2(ball.centerY - e.pageY, e.pageX - ball.centerX);
    console.log('mousedown');

    // EVENT LISTENER: ADD TRAJECTORY GUIDE
    $('#box').css('background-image', 'url(images/arrow2.png)');
})

    // EVENT LISTENER FOR MOUSEUP
    $(document).mouseup(function() {
      dragging = false
      
        // Ball travel
        var dx = Math.cos(r) * 100/200; //<--
        var dy = Math.sin(r) * 100/200; //<--0.5 per 10ms
        // var xn = x0 + v * t * cos(theta)
        // var xn = x + 100 * 100/200 * Math.cos(r)
        // var yn = y + 100 * 100/200 * Math.sin(r)
        var orgx = x;
        var orgy = y;
        var movement = setInterval(function(){
            $("#box").offset({top: y, left: x});
            
            x += dx;
            y += dy;
            if (Math.cos(r) !== 0) {
                if ( Math.abs((x - orgx) * Math.cos(r)) > 200 ){
                clearInterval(movement);
                } 
            }
            else if (Math.abs(y - orgy) > 200) {
                clearInterval(movement);
            }
        }, 1)

        $('#box').css('background-image', 'url(images/golf-ball.png)');
        clickCounter()

    })  // <---end of mouseUp
    
    // EVENT LISTENER: DIRECTION OF ROTATE
    $(document).mousemove(function(e) {
      if (dragging) { 
        // Recalculating the end position after drag
        var newOffset = Math.atan2(ball.centerY - e.pageY, e.pageX - ball.centerX);
        // r = Prjected angle
        r = (offset - newOffset); // <---Deleted Degree Conversion from here

        ball.css('-webkit-transform', 'rotate(' + r + 'rad)');
        
      }
    })
}());


// var colliders_selector = $("#box");
// var obstacles_selector = $("#example");
// var hits = $(colliders_selector).collision(obstacles_selector);
// console.log($(colliders_selector).collision(obstacles_selector));


//  if ball hits coordinates offsetx && offsety {
//     then change background. plus display alert!
//     now its player 2's turn.
//  } 
//  else if {}

// function collisionHole() {
 
// if($('#box').css('left') === '468px') {
//     // (x > 300) {
//     $('#box').css("background-image","none")
//     // .offset.top <= 100) {
    
//     }
// };


}); // <--- Closing the Doc Ready