
var x, dx, scale, xtrans, ytrans, min, max;


dx = .01;
scale = 10;
min = 1.0;
max = 100.0;
xtrans = 300;
ytrans = 300;



// y = x^2
// y = Math.cos(x)*50 / x

function y(x) {
    return Math.cos(x)*50 / x;
}


var dot;

for (x = min; x < max; x = x + dx) {
    dot = document.createElement('div');
    dot.className = "myClass";
    dot.style.left = x*scale + xtrans + "px";
    dot.style.top = -y(x)*scale + ytrans + "px";
    document.body.appendChild(dot);
}