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
    var speed_div = 165;
    // Function that returns a Promise for the FPS
    const getFPS = () =>
      new Promise(resolve =>
        requestAnimationFrame(t1 =>
          requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
        )
      )

    // Calling the function to get the FPS
    getFPS().then(speed_div);
    speed_div = speed_div / 60;
    var count_parts = 2000;
    var Particle = require('./particles'),
      canvas = document.querySelector('#particlesField'),
      ctx = canvas.getContext('2d'),
      width = window.innerWidth,
      height = window.innerHeight,

      presetDefault = {
        // count: 1000,
        count: count_parts,
        size: Math.max(width, height) / count_parts,
        minSpeed: 1/speed_div,
        maxSpeed: 50/speed_div,
        startOrigin: {
          x: undefined,
          y: undefined
        }
      },

      presetModerate = {
        // count: 1000,
        count: count_parts,
        // size: Math.max(width, height) / count_parts,
        // size: Math.max(width, height) / 4500,
        size: Math.max(width, height) / 8000,
        minSpeed: 10/speed_div,
        maxSpeed: 50/speed_div,
        startOrigin: {
          x: undefined,
          y: undefined
        }
      },

      presetFast = {
        count: 1000,
        size: Math.max(width, height) / count_parts,
        minSpeed: 20/speed_div,
        maxSpeed: 100/speed_div,
        startOrigin: {
          x: undefined,
          y: undefined
        }
      },

      presetCentralExplode = {
        count: count_parts / 2,
        size: Math.max(width, height) / count_parts,
        minSpeed: 1/speed_div,
        maxSpeed: 100/speed_div,
        startOrigin: {
          x: width / 2,
          y: height / 2
        }
      },

      presetInsaneRandomSizeFromLeftTop = {
        count: count_parts,
        size: function() {
          return Math.random() * 10 + 1;
        },
        minSpeed: 20/speed_div,
        maxSpeed: 100/speed_div,
        startOrigin: {
          x: 1,
          y: 1
        }
      },

      presetInsaneRandomSizeFromCenter = {
        count: count_parts,
        size: function() {
          return Math.random() * 2 + 0.2;
        },
        minSpeed: 20/speed_div,
        maxSpeed: 100/speed_div,
        startOrigin: {
          x: width / 2,
          y: height / 2
        }
      },

      // settings = presetDefault;
      settings = presetModerate;
      // ctx.globalAlpha = 1.0;
      // settings = presetCentralExplode;
      // settings = presetInsaneRandomSizeFromCenter;

    window.generateParticles = function(count, size, originX, originY) {

      window.particles = window.particles || [];

      for (var i = 0; i < count; i++) {
        var x = originX || Math.random() * window.innerWidth,
          y = originY || Math.random() * window.innerHeight;
        (function(particle) {
          window.particles.push(particle);
        })(new Particle(x, y, size));
      }
    };

    /* ======================= */

    resize();

    window.addEventListener('resize', resize, false);

    generateParticles(settings.count, settings.size, settings.startOrigin.x, settings.startOrigin.y);
    
    var test_bg = true,
        count_bg = 0;

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

      // ctx.globalAlpha = 0.01;           // fade rate
      // ctx.globalCompositeOperation = "destination-out"  // fade out destination pixels
      // ctx.fillRect(0,0,width,height)
      // ctx.globalCompositeOperation = "source-over"
      // ctx.globalAlpha = 1;           // reset alpha

      // if (test_bg) {
      //   if (count_bg >= 1) {
      //     ctx.fillStyle = 'rgba(255,255,255,255,1.0)';
      //     ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      //     test_bg = false;
      //   }
      //   count_bg++;
      // }

      // ctx.clearRect(0, 0, width, height);

      // ctx.fillStyle = 'rgba(1,2.5,4,0.05)'; ORIG
      ctx.fillStyle = 'rgba(0,0,0,1)';
      // ctx.fillStyle = 'rgba(1,4.5,11.75,0.05)';  // this is how it gives it a tail: fills everything gradually this color
      // lower alpha, longer tails
      ctx.fillRect(0, 0, width, height);
      
      // ctx.globalCompositeOperation = 'source-over';	// compositor operation for balls source-over
      // ctx.fillStyle = 'rgba(1,4.5,11.75,0.05)';
      // ctx.fillRect(0, 0, width, height);
      // ctx.globalAlpha = 0.1;
      ctx.fillStyle = "rgba(255,255,255,1.0)";		// Color of the balls 
      // ctx.fillStyle = "rgba(4,18,47,0.1)";		// Color of the balls

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
          if (!ball.getPosition(time)) { // Time is the problem with why they all speed up
          	// if ball not exists, make another
            var x = Math.random() * width,
              y = Math.random() * height,
              // speed = Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;
              speed = Math.random() * Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;


            // var x = settings.startOrigin.x,
          	 //  y = settings.startOrigin.y,
          	 //  speed = Math.random() * Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;
          	

          	ball.move(x, y, speed);
          }
        }
      }

      renderCanvas();
      // Currently working on: replacing all old tails with this garbage
     //  if (time > 1000) {
	    //   for (var x = 0; x < window.innerWidth; x++) {
	    //   	for (var y = 0; y < window.innerHeight; y++) {
	    //   		var data = ctx.getImageData(x, y, 1, 1).data;
	    //   		// alert(data[1]);
	    //   		if (data[3] / 255 < 0.052 && data[0] != 1) {
	    //   			ctx.putImageData('rgba(1,4.5,11.75,0.05)', x, y);
	    //   		}
	    //   	}
	    //   }
  	  // }
    }

  }, {
    "./particles": "./index.js"
  }],
  "./index.js": [function(require, module, exports) {
    var Particle;

    Particle = function(posx, posy, radius) {

      if (radius < 0) {
        throw "Error! Given the particle radius " + radius + " pixels, but the radius cannot be negative!";
      }

      this.startOrigin_x = posx;
      this.startOrigin_y = posy;

      this.position = {
        x: posx || 0,
        y: posy || 0
      };

      if (typeof radius == 'function') {
        this.radius = radius();
      } else {
        this.radius = radius || 0;
      }

      this.status = 'standing'; // Statuses: standing || moving

      this.direction = this.position;

      this.speed = 1; // 1 pixels per second
      // this.speed =  Math.round(Math.random()) + Math.round(Math.random()) * 2;

      this.spotlightTimeStamp = undefined;

    };

    Particle.prototype.stop = function() {
      // alert("stop")
      var randRad = Math.random() * Math.PI * 2.0,
      	  scale = 0; // pixels
      this.position = {
        x: this.startOrigin_x + Math.cos(randRad) * scale,
        y: this.startOrigin_y + Math.sin(randRad) * scale
      };
      this.status = 'standing';
      this.spotlightTimeStamp = undefined;
      this.direction = this.position;
    };

    Particle.prototype.move = function(posx, posy, speed) {

      this.status = 'moving';

      this.spotlightTimeStamp = undefined;
      var deltaX = posx - this.position.x,
        deltaY = posy - this.position.y,
        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      this.slope = Math.atan( deltaY / deltaX );
      if (deltaX < 0) {
      	this.slope += Math.PI;
      }
      // alert(deltaX);
      this.direction = {
        x: posx,
        y: posy,
        distance: distance,
        sin: Math.sin(this.slope),
        cos: Math.cos(this.slope),
        // this.slope = Math.atan(this.direction.sin / this.direction.cos);
        // slope: Math.random() * Math.PI * 2.0,
        chosenSlope: Math.random() * Math.PI * 2.0
      };

      if (Math.abs(this.slope + Math.PI * 2.0 - this.direction.chosenSlope) < Math.abs(this.slope - this.direction.chosenSlope)) {
      		this.slope += Math.PI * 2.0
      	}
  	  if (Math.abs(this.slope - Math.PI * 2.0 - this.direction.chosenSlope) < Math.abs(this.slope - this.direction.chosenSlope)) {
  		this.slope -= Math.PI * 2.0
  	  }

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
      // 	alert("Direction is off" + this.slope);
      // }
    };

    Particle.prototype.getPosition = function getPosition(movetime) {

      // var time = Math.min(movetime / 1000, 3);
      var time = movetime / 1000;


      if (this.status == 'moving') {
        if (this.spotlightTimeStamp) {
          var deltaTime = time - this.spotlightTimeStamp,
            distance = (deltaTime * this.speed),
            // distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        	direction_gradient = 0.01,
        	scale = 10;


          var slope = this.slope;

          this.turn(direction_gradient);
          // get x,y from radians
          this.direction.sin = Math.sin(this.slope);
          this.direction.cos = Math.cos(this.slope);


          // // this.direction.cos += (Math.cos(this.slope) - this.direction.cos);

          // scale x,y to distance
          var posy = this.direction.sin * this.speed / 50, // * distance does not work - as distance grows, delta x grows
            posx = this.direction.cos * this.speed / 50;	// therefore, we use a user picked scale

          // move
          this.position = {
            x: this.position.x + posx,
            y: this.position.y + posy
          };
          // this.position = {
          //   x: posx + this.startPoint.x,
          //   y: posy + this.startPoint.y
          // };
          
          // if (distance > this.direction.distance) {
          // if (distance > Math.min(window.innerWidth, window.innerHeight) / 3) { // will not reach top
          if (distance > Math.min(window.innerWidth, window.innerHeight)) { // will not reach top
          // if (this.position.x > window.innerWidth || this.position.x < 0 || this.position.y > window.innerHeight || this.position.y < 0) {
          	this.stop();
          }

        } else {
          this.spotlightTimeStamp = time;
        }
        return this.position;
      } else {
        return false;
      }
    };

    module.exports = Particle;
  }, {}]
}, {}, ["./src/js/index.js"])