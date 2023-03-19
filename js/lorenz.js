(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
    "./src/js/index.js": [function(require, module, exports) {
        var count_parts = 5000, // 2000
            fps = 60; // 40
        var Particle = require('./particles'),
            canvas = document.querySelector('#particlesField'),
            ctx = canvas.getContext('2d'),
            width = window.innerWidth,
            height = window.innerHeight,

            presetDefault = {
                // count: 1000,
                count: count_parts,
                // size: Math.max(width, height) / 40,
                size: Math.max(Math.max(width, height) / count_parts, 0.55),
                minSpeed: 2, // 1, 50
                maxSpeed: 50, // 50, 2000
                dt: fps / count_parts,
                startOrigin: {
                    // x: window.innerWidth / 2.0,
                    // y: window.innerHeight / 2.0
                    x: undefined,
                    y: undefined
                }
            },


            settings = presetDefault;
            // settings = presetModerate;
            // ctx.globalAlpha = 1.0;
            // settings = presetCentralExplode;
            // settings = presetInsaneRandomSizeFromCenter;
        function dX (s, Y, X) {
            // window.alert(X);
            return s * (Y - X);
        }
        function dY (X, r, Z, Y) {
            return X * (r - Z) - Y;
        }
        function dZ (X, Y, b, Z) {
            return X * Y - b * Z;
        }

        function rotation(x1, y1, z1, xAng, yAng, zAng) {
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

        function get_next_pos(X, Y, Z, dt) {
            var s, r, b, scale, xtrans, ytrans, yAng, xAng, zAng;
            X_or = 1.0; // 1
            Y_or = 1.0; // 1
            Z_or = 1.0; // 1
            s = 10.0; // 10, 45
            r = 28.0; // 28
            b = 8.0/3.0; // 8/3
            // dt = .0025;
            // dt = 40.0 / num_dots;
            scale = 15.00; // 17
            xtrans = window.innerWidth / 2;
            ytrans = window.innerHeight;
            xAng = 90.0; // 90
            yAng = 0.0;
            zAng = 0.0;
            // window.alert('test');  // test if it works
            // var time = Math.min(movetime / 1000, 3);
            // var time = movetime / 1000;

            var i, X2, Y2;
            // var X = X,
            // Y = this.position.y;
            // Z = this.position.z;
            // for (i = 0.00; i < 40.00; i = i + dt) {
            // window.alert(i);  // test if it works
            // ary.push(i);
            // window.alert(X);
            X2 = X + dX(s, Y, X) * dt;
            Y2 = Y + dY(X, r, Z, Y) * dt;
            Z2 = Z + dZ(X, Y, b, Z) * dt;
            var temp = rotation(X2, Y2, Z2, xAng, yAng, zAng);
            // var temp = [X, Y, Z];
            var X4 = temp[0];
            var Y4 = temp[1];
            var Z4 = temp[2];
            // var dot;
            // dot = document.createElement('div');
            var X3 = X4*scale + xtrans;
            var Y3 = Y4*scale + ytrans;
            var Z3 = Z4*scale;
            // window.alert([X3, Y3, Z3]);
            return [X3, Y3, Z3, X2, Y2, Z2];
        }

        window.generateParticles = function(count, size, originX, originY) {

            window.particles = window.particles || [];
            var x2 = 1.0,
                y2 = 1.0,
                z2 = 1.0;
            var x, y, z;
            for (var i = 0; i < 40.0; i += settings.dt) {
                // var x = originX || Math.random() * window.innerWidth,
                    // y = originY || Math.random() * window.innerHeight;
                out = get_next_pos(x2, y2, z2, settings.dt);
                x2 = out[3];
                y2 = out[4];
                z2 = out[5];
                x = out[0];
                y = out[1];
                z = out[2];
                // window.alert(out);
                // window.alert(x + ', ' + y + ', ' + z);  // test if it works
                (function(particle) {
                    window.particles.push(particle);
                })(new Particle(x, y, z, x2, y2, z2, size));
            }
        };

        /* ======================= */

        resize();

        window.addEventListener('resize', resize, false);

        generateParticles(settings.count, settings.size, settings.startOrigin.x, settings.startOrigin.y);

        animate();

        /* ======================= */

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;

            if (window.particles) {

                for (var i = 0; i < window.particles.length; i++) {
                    if (window.particles[i].position.x > width) {
                        window.particles[i].stop();
                        window.particles[i].position.x = width;
                    }

                    if (window.particles[i].position.y > height) {
                        window.particles[i].stop();
                        window.particles[i].position.y = height;
                    }

                }
            }

        }

        function renderCanvas() {
            // ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
            // ctx.globalCompositeOperation = 'darken';
            // ctx.globalCompositeOperation = "screen";
            // ctx.globalCompositeOperation = 'destination-over'; // really cool flower thing if from center, and not switched to SO
            // ctx.globalCompositeOperation = 'destination-out';
            // ctx.globalCompositeOperation = 'destination-in';
            // ctx.globalCompositeOperation = 'lighter';
            // ctx.globalCompositeOperation = 'color';

            // ctx.globalAlpha = 0.01;                     // fade rate
            // ctx.globalCompositeOperation = "destination-out"    // fade out destination pixels
            // ctx.fillRect(0,0,width,height)
            // ctx.globalCompositeOperation = "source-over"
            // ctx.globalAlpha = 1;                     // reset alpha


            // ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = 'rgba(1,4.5,11.75,1.0)';    // this is how it gives it a tail: fills everything gradually this color
            // lower alpha, longer tails
            ctx.fillRect(0, 0, width, height);
            
            // ctx.globalCompositeOperation = 'source-over';    // compositor operation for balls source-over
            // ctx.fillStyle = 'rgba(1,4.5,11.75,0.05)';
            // ctx.fillRect(0, 0, width, height);
            // ctx.globalAlpha = 0.1;
            ctx.fillStyle = "rgba(255,255,255,1.0)";            // Color of the balls 
            // ctx.fillStyle = "rgba(4,18,47,0.1)";             // Color of the balls

            if (window.particles) {
                for (var i = 0; i < window.particles.length; i++) {
                    var ball = window.particles[i];
                    ctx.beginPath();
                    ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, false);
                    // ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                }


                // ctx.globalCompositeOperation = 'destination-out';
                // // ctx.globalCompositeOperation = 'source-atop';
                // // ctx.globalCompositeOperation = 'darken';
                // ctx.fillStyle = 'rgba(1,4.5,11.75,0.025)';
                // ctx.fillRect(0, 0, width, height);

                // ctx.globalCompositeOperation = 'darken';
                // ctx.fillRect(0, 0, width, height);
            }

        }

        function animate(time) {
            requestAnimationFrame(animate);

            if (width !== canvas.width) {
                canvas.width = width;
            }

            if (height !== canvas.height) {
                canvas.height = height;
            }

            if (window.particles) {
                for (var i = 0; i < window.particles.length; i++) {
                    var ball = window.particles[i];
                    // if (!ball.getPosition(time)) { // Time is the problem with why they all speed up
                    // if ball not exists, make another
                    var x2 = ball.position.x2,
                        y2 = ball.position.y2,
                        z2 = ball.position.z2;
                    var out = get_next_pos(x2, y2, z2, settings.dt * (speed/100));
                    // window.alert(out);
                    var x = out[0],
                        y = out[1],
                        z = out[2];
                    x2 = out[3],
                    y2 = out[4],
                    z2 = out[5]
                    var speed = settings.minSpeed;
                    ball.move(x, y, z, x2, y2, z2, speed);
                    // }
                }
            }

            renderCanvas();
            // Currently working on: replacing all old tails with this garbage
         //    if (time > 1000) {
                //     for (var x = 0; x < window.innerWidth; x++) {
                //            for (var y = 0; y < window.innerHeight; y++) {
                //                    var data = ctx.getImageData(x, y, 1, 1).data;
                //                    // alert(data[1]);
                //                    if (data[3] / 255 < 0.052 && data[0] != 1) {
                //                            ctx.putImageData('rgba(1,4.5,11.75,0.05)', x, y);
                //                    }
                //            }
                //     }
            // }
        }

    }, {
        "./particles": "./index.js"
    }],
    "./index.js": [function(require, module, exports) {
        var Particle;

        Particle = function(posx, posy, posz, posx2, posy2, posz2, radius) {

            if (radius < 0) {
                throw "Error! Given the particle radius " + radius + " pixels, but the radius cannot be negative!";
            }

            this.startOrigin_x = posx;
            this.startOrigin_y = posy;
            this.startOrigin_z = posz;
            this.startOrigin_x2 = posx2;
            this.startOrigin_y2 = posy2;
            this.startOrigin_z2 = posz2;

            this.position = {
                x:  posx || 1.0,
                y:  posy || 1.0,
                z:  posz || 1.0,
                x2: posx2 || 1.0,
                y2: posy2 || 1.0, 
                z2: posz2 || 1.0
            };

            if (typeof radius == 'function') {
                this.radius = radius();
            } else {
                this.radius = radius || 0;
            }

            this.status = 'standing'; // Statuses: standing || moving

            this.direction = this.position;

            this.speed = 1; // 1 pixels per second
            // this.speed =    Math.round(Math.random()) + Math.round(Math.random()) * 2;

            this.spotlightTimeStamp = undefined;

        };

        Particle.prototype.stop = function() {
            // alert("stop")
            var randRad = Math.random() * Math.PI * 2.0,
                    scale = 0; // pixels
            this.position = {
                x: this.startOrigin_x + Math.cos(randRad) * scale,
                y: this.startOrigin_y + Math.sin(randRad) * scale,
                z: this.startOrigin_z + Math.sin(randRad) * scale,
                x2: this.startOrigin_x2,
                y2: this.startOrigin_y2,
                z2: this.startOrigin_z2
            };
            this.status = 'standing';
            this.spotlightTimeStamp = undefined;
            this.direction = this.position;
        };

        Particle.prototype.move = function(posx, posy, posz, posx2, posy2, posz2, speed) {

            this.status = 'moving';
            // window.alert([posx2, posy2, posz2]);

            this.spotlightTimeStamp = undefined;
            // var deltaX = posx - this.position.x,
            //     deltaY = posy - this.position.y,
            //     deltaZ = posz - this.position.z,
            //     distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);


            this.position = {
                x:  posx || 1.0,
                y:  posy || 1.0,
                z:  posz || 1.0,
                x2: posx2 || 1.0,
                y2: posy2 || 1.0, 
                z2: posz2 || 1.0
                // distance: distance
                // sin: Math.sin(this.slope),
                // cos: Math.cos(this.slope),
                // this.slope = Math.atan(this.direction.sin / this.direction.cos);
                // slope: Math.random() * Math.PI * 2.0,
                // chosenSlope: Math.random() * Math.PI * 2.0
            };

            // if (Math.abs(this.slope + Math.PI * 2.0 - this.direction.chosenSlope) < Math.abs(this.slope - this.direction.chosenSlope)) {
            //             this.slope += Math.PI * 2.0
            //     }
            // if (Math.abs(this.slope - Math.PI * 2.0 - this.direction.chosenSlope) < Math.abs(this.slope - this.direction.chosenSlope)) {
            //     this.slope -= Math.PI * 2.0
            // }

            this.startPoint = this.position;

            this.speed = speed || 1;
            // this.speed = speed;
        };

        Particle.prototype.turn = function turn(direction_gradient) {
            // if you've reached chosen direction, choose another
            if (Math.abs(this.slope - this.direction.chosenSlope) < direction_gradient * 100) {
                // if (Math.random() < 0.01) {
                this.direction.chosenSlope = Math.random() * Math.PI * 2.0 - 0.0001;

                if (Math.abs(this.slope + Math.PI * 2.0 - this.direction.chosenSlope) < Math.abs(this.slope - this.direction.chosenSlope)) {
                        this.slope += Math.PI * 2.0
                }
                if (Math.abs(this.slope - Math.PI * 2.0 - this.direction.chosenSlope) < Math.abs(this.slope - this.direction.chosenSlope)) {
                        this.slope -= Math.PI * 2.0
                }
            }

                // turn towards chosen direction
            if (this.slope > this.direction.chosenSlope) {
                this.slope -= Math.random() * direction_gradient;
                // this.slope = this.slope - Math.random(0, Math.random()); // cool spirals
                // this.slope = Math.max(0.001, this.slope);
            } else {
                this.slope += Math.random() * direction_gradient;
                // this.slope = this.slope + Math.random(0, Math.random());
                // this.slope = Math.min((Math.PI * 2.0) - 0.0001, this.slope);
            }

            // something went wrong
            // if (this.slope > Math.PI * 2.0 || this.slope < 0.001) {
            //        alert("Direction is off" + this.slope);
            // }
        };

        Particle.prototype.getPosition = function getPosition(movetime) {
            // Returns new positions
            
            // dot.className = "myClass";
            // dot.style.left = X3 + "px";
            // dot.style.top = Y3 + "px";
            // window.alert(X3 + ", " + Y3);
            // if (X3 >= 0.0 && Y3 >= 0.0) {
            //     // document.body.appendChild(dot);
            //     ctx.beginPath();
            //     ctx.arc(X3, Y3, size, 0, Math.PI * 2, false);
            //     // ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI, false);
            //     ctx.closePath();
            //     ctx.fill();
            // }
            // }

            if (this.status == 'moving') {
                // if (this.spotlightTimeStamp) {
                //     // var posy = 

                //     // move
                //     this.position = {
                //         x: X3,
                //         y: Y3,
                //         z: Z3
                //     };
                    
                // } else {
                //     this.spotlightTimeStamp = time;
                // }
                return this.position;
            } else {
                return false;
            }
        };

        module.exports = Particle;
    }, {}]
}, {}, ["./src/js/index.js"])


// var X, Y, Z, s, r, b, dt, scale, xtrans, ytrans, yAng, xAng, zAng;

// window.resizeTo(1920, 1080);

// X = 1.0;
// Y = 1.0;
// Z = 1.0;
// s = 10.0;
// r = 28.0;
// b = 8.0/3.0;
// dt = .0025;
// scale = 30.00;
// xtrans = 1000;
// ytrans = 1550;
// xAng = 90.0;
// yAng = 0.0;
// zAng = 0.0;

// function dX (s, Y, X) {
//     return s * (Y - X);
// }
// function dY (X, r, Z, Y) {
//     return X * (r - Z) - Y;
// }
// function dZ (X, Y, b, Z) {
//     return X * Y - b * Z;
// }

// function rotation(x1, y1, z1) {
//     var x1rad = (Math.PI / 180.0) * xAng;
//     var yrad = (Math.PI / 180.0) * yAng;
//     var z1rad = (Math.PI / 180.0) * zAng;
//     // for x1 rot
//     y1 = Math.cos(x1rad)*y1 - Math.sin(x1rad)*z1;
//     z1 = Math.sin(x1rad)*y1 + Math.cos(x1rad)*z1;
//     // for y1 rot
//     x1 = Math.cos(yrad)*x1 + Math.sin(yrad)*z1;
//     z1 = -Math.sin(yrad)*x1 + Math.cos(yrad)*z1;
//     // for z1 rot
//     x1 = Math.cos(z1rad)*x1 - Math.sin(z1rad)*y1;
//     y1 = Math.sin(z1rad)*x1 + Math.cos(z1rad)*y1;
//     return [x1, y1, z1];
// }


// // dX <- s * (Y - X)
// // dY <- X * (r - Z) - Y
// // dZ <- X * Y - b * Z

// var i, X2, Y2;
// var ary = [];
// for (i = 0.00; i < 40.00; i = i + dt) {
//     // window.alert(i);  // test if it works
//     ary.push(i);
//     X2 = X + dX(s, Y, X) * dt;
//     Y2 = Y + dY(X, r, Z, Y) * dt;
//     Z = Z + dZ(X, Y, b, Z) * dt;
//     X = X2;
//     Y = Y2;
//     var temp = rotation(X, Y, Z);
//     // var temp = [X, Y, Z];
//     var X4 = temp[0];
//     var Y4 = temp[1];
//     var Z4 = temp[2];
//     var dot;
//     dot = document.createElement('div');
//     var X3 = X4*scale + xtrans;
//     var Y3 = Y4*scale + ytrans;
//     var Z3 = Z4*scale;
//     dot.className = "myClass";
//     dot.style.left = X3 + "px";
//     dot.style.top = Y3 + "px";
//     // window.alert(X3 + ", " + Y3);
//     if (X3 >= 0.0 && Y3 >= 0.0) {
//         document.body.appendChild(dot);
//     }
// }



