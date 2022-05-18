
// var canvas = document.querySelector('.myCanvas');


var canvas = document.createElement("CANVAS");
var ctx = canvas.getContext('2d');


// ctx.fillStyle = "#FF0000";
// ctx.fillRect(20, 20, 150, 100);

canvas.className = "myCanvas";


var width = canvas.width = 500; // window.innerWidth/2; // 500
var height = canvas.height = 250; // window.innerHeight/2; // 250

canvas.style.left = window.innerWidth/2 - 250 + "px";
canvas.style.top = 100 + "px";


// ctx.fillStyle = 'rgb(70, 130, 180)'; // steel blue


// ctx.fillStyle = 'rgb(0, 0, 0)'
ctx.fillStyle = 'rgb(50,50,50)';
ctx.fillRect(0, 0, width, height);	 // (left x, top y, right x, bottom y)

function circle(x, y, r, col) {
    ctx.lineWidth = 0.01;
    ctx.beginPath();
    ctx.strokeStyle = col; //'rgb(70, 130, 180)';
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(x, y, radius, startAngle, endAngle=rad, anticlockwise=true/false)
    ctx.fillStyle = col;
    ctx.fill();
    ctx.stroke();
}

circle(200, 200, 30, 'rgba(70, 100, 180, 75)');


var grd = ctx.createLinearGradient(0, 0, 0, 115);
grd.addColorStop(0, "rgb(255, 255, 255)");
grd.addColorStop(1, "rgb(70, 130, 180)");

circle(100, 100, 30, grd)


document.body.appendChild(canvas);

/**
 * The Plan:
 *
 * Learn to make the circles with a gradient
 * Learn to make the circles move around on different levels of each other
 * Make the circles randomly merge should they be touching
 * Make the circles pull on each other
 * Learn to alter the edges of the circles until they can randomly spike out
 * Control the spiking angles, and amplitudes
 * Revert the pulling to a non-visible component
 * Merge the pulling and the spiking to get a complete product
 *
 * */