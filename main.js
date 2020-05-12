var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 10;
        this.xSpeed = 0;
    }
    show() {
        c.fillStyle = 'black';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        this.x += this.xSpeed;
        
        if (this.x + this.w/2 > ball.x && this.x < ball.x + ball.w && this.y + this.h > ball.y && this.y < ball.y + ball.h) {
            ball.ySpeed = -6;
            ball.xSpeed = -5;
        }        
        if (this.x + this.w > ball.x && this.x+this.w/2 < ball.x + ball.w && this.y + this.h > ball.y && this.y < ball.y + ball.h) {
            ball.ySpeed = -6;
            ball.xSpeed = 5;
        }
    }
}

class Brick {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.w = 70;
        this.h = 40;
        this.color = color;
        this.visible = true;
    }
    show() {
        if (this.visible) {
            c.fillStyle = this.color
            c.fillRect(this.x, this.y, this.w, this.h)
        }
        
        if (this.x + this.w > ball.x && this.x < ball.x + ball.w && this.y + this.h > ball.y && this.y < ball.y + ball.h && this.visible) {
            this.visible = false
            ball.ySpeed = 6;
            score++;
            document.getElementById("showScore").innerHTML = "Score " + score;
        }
        
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
    show() {
        c.fillStyle = 'darkred';
        c.fillRect(this.x, this.y, this.w, this.h);
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if (this.x <= 0) {
            this.xSpeed = 6
        }
        if (this.x + this.w >= 800) {
            this.xSpeed = -6;
        }
        
        if (this.y <= 0) {
            this.ySpeed = 6
        }
    }
}

var paddle;
var bricks = [];

var bx = 5;
var by = 210;

var brickColor = 'red'

var ball;

var ballMoving = false;

var score = 0;

var started = false;

var lost = false;

window.onload = function() {
    start();
    setInterval(update, 10);
}

function start() {
    paddle = new Paddle(400-50, 700);
    
    for (let i = 0; i < 50; i++) {
        if (by === 210) {
            brickColor = 'blue';
        } else if (by === 160) {
            brickColor = 'green';
        } else if (by === 110) {
            brickColor = 'yellow';
        } else if (by === 60) {
            brickColor = 'orange';
        } else {
            brickColor = 'red';
        }
        var b = new Brick(bx, by, brickColor);
        bricks.push(b);
        bx+=80;
        if (bx >= 740) {
            bx = 5;
            by-=50;
        }
    }
    ball = new Ball(400-10, 700-20);
}

function update() {
    //background
    c.fillStyle = 'lightblue';
    c.fillRect(0, 0, 800, 800);
    //paddle
    paddle.show();
    paddle.update();
    //bricks
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].show();
    }
    //ball
    ball.show();
    if (!ballMoving) {
        ball.x = paddle.x+paddle.w/2-ball.w/2;
        ball.xSpeed = 0;
        ball.ySpeed = 0;
    }
    //menu
    if (!started) {
        document.getElementById("start").style.display = "block";
    } else {
        document.getElementById("start").style.display = "none";
    }
    //game over
    if (ball.y >= 800) {
        lost = true;
    }
    if (lost) {
        document.getElementById("gameEnd").style.display = "block";
        document.getElementById("restart").style.display = "block";
        document.getElementById("continue").style.display = "block";
    }
}

function keyDown(e) {
    if (e.keyCode === 39) {
        paddle.xSpeed = 8;
    }
    if (e.keyCode === 37) {
        paddle.xSpeed = -8;
    }
    if (e.keyCode === 32 && !ballMoving) {
        ball.ySpeed = -6;
        ballMoving = true;
        started = true;
    }
}

function keyUp(e) {
    if (e.keyCode === 39) {
        paddle.xSpeed = 0;
    }
    if (e.keyCode === 37) {
        paddle.xSpeed = 0;
    }
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function cont() {
    started = false;
    ballMoving = false;
    ball.ySpeed = 0;
    ball.xSpeed = 0;
    ball.x = paddle.x;
    ball.y = paddle.y;
    lost = false;
    document.getElementById("gameEnd").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("continue").style.display = "none";
    ball.ySpeed = 0;
}