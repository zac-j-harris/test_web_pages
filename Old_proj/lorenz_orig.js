var X, Y, Z, s, r, b, dt, scale, xtrans, ytrans, yAng, xAng, zAng;

// window.resizeTo(1920, 1080);

X = 1.0;
Y = 1.0;
Z = 1.0;
s = 10.0;
r = 28.0;
b = 8.0/3.0;
dt = .0025;
scale = 17.00;
xtrans = window.innerWidth / 2.0;
ytrans = window.innerHeight;
xAng = 90.0;
yAng = 0.0;
zAng = 0.0;

function dX (s, Y, X) {
    return s * (Y - X);
}
function dY (X, r, Z, Y) {
    return X * (r - Z) - Y;
}
function dZ (X, Y, b, Z) {
    return X * Y - b * Z;
}

function rotation(x1, y1, z1) {
    var x1rad = (Math.PI / 180.0) * xAng;
    var yrad = (Math.PI / 180.0) * yAng;
    var z1rad = (Math.PI / 180.0) * zAng;
    // for x1 rot
    y1 = Math.cos(x1rad)*y1 - Math.sin(x1rad)*z1;
    z1 = Math.sin(x1rad)*y1 + Math.cos(x1rad)*z1;
    // for y1 rot
    x1 = Math.cos(yrad)*x1 + Math.sin(yrad)*z1;
    z1 = -Math.sin(yrad)*x1 + Math.cos(yrad)*z1;
    // for z1 rot
    x1 = Math.cos(z1rad)*x1 - Math.sin(z1rad)*y1;
    y1 = Math.sin(z1rad)*x1 + Math.cos(z1rad)*y1;
    return [x1, y1, z1];
}


// dX <- s * (Y - X)
// dY <- X * (r - Z) - Y
// dZ <- X * Y - b * Z

var i, X2, Y2;
var ary = [];
for (i = 0.00; i < 40.00; i = i + dt) {
    // window.alert(i);  // test if it works
    ary.push(i);
    X2 = X + dX(s, Y, X) * dt;
    Y2 = Y + dY(X, r, Z, Y) * dt;
    Z = Z + dZ(X, Y, b, Z) * dt;
    X = X2;
    Y = Y2;
    var temp = rotation(X, Y, Z);
    // var temp = [X, Y, Z];
    var X4 = temp[0];
    var Y4 = temp[1];
    var Z4 = temp[2];
    var dot;
    dot = document.createElement('div');
    var X3 = X4*scale + xtrans;
    var Y3 = Y4*scale + ytrans;
    var Z3 = Z4*scale;
    dot.className = "myClass";
    dot.style.left = X3 + "px";
    dot.style.top = Y3 + "px";
    window.alert([X3, Y3, Z3]);
    if (X3 >= 0.0 && Y3 >= 0.0) {
        document.body.appendChild(dot);
    }
}
