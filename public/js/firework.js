"use strict";
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    cWidth = window.innerWidth,
    cHeight = window.innerHeight,
    fireworks = [], // firework collection
    particles = [], // particle collection
    hue = 120, // starting hue
    timerTotal = 45,
    timerTick = 0,
    particleCount = 100;

// set canvas dimensions
canvas.width = cWidth;
canvas.height = cHeight;

// get a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// calculate the distance between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x,
        yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// create firework
function Firework(sx, sy, tx, ty) {
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 3;
    // populate initial coordinate collection with the current coordinates
    while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 1.5;
    this.acceleration = 1.1;
    this.brightness = random(50, 70);
    this.targetRadius = 1; // circle target indicator radius
}

// create particle
function Particle(x, y) {
    this.x = x;
    this.y = y;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 5;
    while(this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
    }
    // set a random angle in all possible directions, in radians
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);
    // friction will slow the particle down
    this.friction = 0.95;
    // gravity will be applied and pull the particle down
    this.gravity = 1;
    // set the hue to a random number +-20 of the overall hue variable
    this.hue = random(hue - 20, hue + 20);
    this.brightness = random(50, 80);
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = random(0.015, 0.03);
}

// update particle
Particle.prototype.update = function(index) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([ this.x, this.y ]);
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;

    // remove the particle once the alpha is low enough, based on the passed in index
    if(this.alpha <= this.decay) {
        particles.splice(index, 1);
    }
};

Particle.prototype.draw = function() {
    var radius = cWidth <= 1000 ? Math.round(random(2, 3)) : Math.round(random(3, 5));
    var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
    gradient.addColorStop(0.0, 'white');
    gradient.addColorStop(0.1, 'yellow');
    gradient.addColorStop(0.2, 'red');
    gradient.addColorStop(0.3, 'hsla(' + this.hue + ',100%,' + this.brightness + '%,' + this.alpha + ')');
    gradient.addColorStop(0.0, 'black');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, radius, Math.PI * 2, false);
    ctx.fill();
};

function createParticles(x, y) {
    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y));
    }
}

// update firework
Firework.prototype.update = function(index) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
    // cycle the circle target indicator radius
    this.targetRadius = this.targetRadius < 8 ? this.targetRadius + 0.3 : 1;
    // speed up the firework
    this.speed *= this.acceleration;
    // get the current velocities based on angle and speed
    var vx = Math.cos(this.angle) * this.speed,
        vy = Math.sin(this.angle) * this.speed;
    // how far will the firework have traveled with velocities applied?
    this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if(this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty);
        // remove the firework, use the index passed into the update function to determine which to remove
        fireworks.splice(index, 1);
    } else {
        // target not reached, keep traveling
        this.x += vx;
        this.y += vy;
    }
};

// draw firework
Firework.prototype.draw = function() {
    ctx.beginPath();
    // move to the last tracked coordinate in the set, then draw a line to the current x and y
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
    ctx.stroke();

    ctx.beginPath();
    // draw the target for this firework with a pulsing circle
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
    ctx.stroke();
};

// main demo loop
function loopFirework() {
    // this function will run endlessly with requestAnimationFrame
    requestAnimFrame(loopFirework);

    // increase the hue to get different colored fireworks over time
    hue += 1;

    // normally, clearRect() would be used to clear the canvas
    // we want to create a trailing effect though
    // setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
    ctx.globalCompositeOperation = 'destination-out';
    // decrease the alpha property to create more prominent trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect( 0, 0, cWidth, cHeight);
    // change the composite operation back to our main mode
    // lighter creates bright highlight points as the fireworks and particles overlap each other
    ctx.globalCompositeOperation = 'lighter';

    // loop over each firework, draw it, update it
    var i = fireworks.length;
    while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
    }

    // loop over each particle, draw it, update it
    var j = particles.length;
    while (j--) {
        particles[j].draw();
        particles[j].update(j);
    }

    // launch fireworks automatically to random coordinates
    if (timerTick >= timerTotal) {
        fireworks.push(new Firework(cWidth/2, cHeight, random(0, cWidth), random(0, cHeight/2)));
        timerTick = 0;
    } else {
        timerTick++;
    }
}

canvas.addEventListener( 'click', function (event) {
    var mx = event.pageX - canvas.offsetLeft,
        my = event.clientY - canvas.offsetTop;
    fireworks.push(new Firework( cWidth/2, cHeight, mx, my));
});

window.onload = loopFirework;

window.addEventListener('resize', function () {
    cWidth = window.innerWidth;
    cHeight = window.innerHeight;
    canvas.width = cWidth;
    canvas.height = cHeight;
});
