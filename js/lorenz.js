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
})

({
    "./src/js/index.js": [function(require, module, exports) {
        var num_balls = 5000, // 2000
            max_t = 35; // 40
        var Particle = require('./particles'),
            canvas = document.querySelector('#particlesField'),
            ctx = canvas.getContext('2d'),
            width = window.innerWidth,
            height = window.innerHeight,

            presetDefault = {
                count: num_balls,
                // size: Math.max(Math.max(width, height) / count_parts, 0.55),  //  Math.max(width, height) / 40
                size: 0.55,
                minSpeed: 2, // 1, 50
                maxSpeed: 50, // 50, 2000
                dt: max_t / num_balls,
                max_t: max_t,
                s: 10.0, // 10, 45
                r: 28.0, // 28
                b: 8.0/3.0, // 8/3
                scale: 15.00, // 17
                xtrans: window.innerWidth / 2,
                ytrans: window.innerHeight,
                xAng: 90.0, // 90
                yAng: 0.0,
                zAng: 0.0
            },
            
            settings = presetDefault;

        canvas.width = width;
        canvas.height = height;
        ctx.globalCompositeOperation = 'source-over';


        function dX (s, Y, X) {
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
            // var yrad = (Math.PI / 180.0) * yAng;
            // var z1rad = (Math.PI / 180.0) * zAng;
            // for x1 rot
            y1 = Math.cos(x1rad)*y1 - Math.sin(x1rad)*z1;
            z1 = Math.sin(x1rad)*y1 + Math.cos(x1rad)*z1;
            // // for y1 rot
            // x1 = Math.cos(yrad)*x1 + Math.sin(yrad)*z1;
            // z1 = -Math.sin(yrad)*x1 + Math.cos(yrad)*z1;
            // // for z1 rot
            // x1 = Math.cos(z1rad)*x1 - Math.sin(z1rad)*y1;
            // y1 = Math.sin(z1rad)*x1 + Math.cos(z1rad)*y1;
            return [x1, y1, z1];
        }

        function get_next_pos(X, Y, Z, dt) {
            var X2 = X + dX(settings.s, Y, X) * dt,
                Y2 = Y + dY(X, settings.r, Z, Y) * dt,
                Z2 = Z + dZ(X, Y, settings.b, Z) * dt;
            var temp = rotation(X2, Y2, Z2, settings.xAng, settings.yAng, settings.zAng);
            var X3 = temp[0]*settings.scale + settings.xtrans,
                Y3 = temp[1]*settings.scale + settings.ytrans,
                Z3 = temp[2]*settings.scale;
            return [X3, Y3, Z3, X2, Y2, Z2];
        }

        window.generateParticles = function(count, size) {
            window.particles = window.particles || [];
            var x2 = 1.0,
                y2 = 3.0,
                z2 = 1.0;
            for (var i = 0; i < settings.max_t; i += settings.dt) {
                out = get_next_pos(x2, y2, z2, settings.dt);
                x2 = out[3];
                y2 = out[4];
                z2 = out[5];
                (function(particle) {
                    window.particles.push(particle);
                })(new Particle(out, size));
            }
        };

        /* ======================= */

        generateParticles(settings.count, settings.size);

        animate();

        /* ======================= */

        function renderCanvas() {
            if (window.particles) {
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = "rgba(255,255,255,1.0)";            // Color of the balls 
                for (i in window.particles) {
                    ctx.beginPath();
                    ctx.arc(window.particles[i].position.x, window.particles[i].position.y, window.particles[i].radius, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.fillStyle = 'rgba(1,4.5,11.75,1.0)';    // this is how it gives it a tail: fills everything gradually this color
                // lower alpha, longer tails
        }}

        function animate(time) {
            requestAnimationFrame(animate);

            if (window.particles) {
                for (i in window.particles) {
                    var out = get_next_pos(window.particles[i].position.x2, window.particles[i].position.y2, window.particles[i].position.z2, settings.dt * (settings.minSpeed/100));
                    window.particles[i].move(out, settings.minSpeed);
            }}
            renderCanvas();
    }}, 
    {
        "./particles": "./index.js"
    }],
    "./index.js": [function(require, module, exports) {
        
        var Particle;
        Particle = function(vec_in, radius) {
            if (radius < 0) {
                throw "Error! Given the particle radius " + radius + " pixels, but the radius cannot be negative!";
            }

            this.startOrigin_x = vec_in[0];
            this.startOrigin_y = vec_in[1];
            this.startOrigin_z = vec_in[2];
            this.startOrigin_x2 = vec_in[3];
            this.startOrigin_y2 = vec_in[4];
            this.startOrigin_z2 = vec_in[5];

            this.position = {
                x:  vec_in[0],
                y:  vec_in[1],
                z:  vec_in[2],
                x2: vec_in[3],
                y2: vec_in[4],
                z2: vec_in[5]
            };

            if (typeof radius == 'function') {
                this.radius = radius();
            } else {
                this.radius = radius || 0;
            }

            this.direction = this.position;

            this.speed = 1; // 1 pixels per second

            this.spotlightTimeStamp = undefined;

        };

        Particle.prototype.stop = function() {
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
            this.spotlightTimeStamp = undefined;
            this.direction = this.position;
        };

        // Particle.prototype.move = function(posx, posy, posz, posx2, posy2, posz2, speed) {
        Particle.prototype.move = function(vec_in, speed) {
            this.spotlightTimeStamp = undefined;

            this.position = {
                x:  vec_in[0],
                y:  vec_in[1],
                z:  vec_in[2],
                x2: vec_in[3],
                y2: vec_in[4], 
                z2: vec_in[5]
            };

            this.startPoint = this.position;

            this.speed = speed;
        };

        module.exports = Particle;
    }, {}]
}, {}, ["./src/js/index.js"])


