var canvas = document.querySelector("canvas");
canvas.width = screen.width;
canvas.height = screen.height;
var ctx = canvas.getContext('2d');
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var brickWidth = 75;
var brickHeight = 20;
var bricks = [];
var score = 0;
var level = 0;
var lives = 3;
window.addEventListener('resize', function() {
  canvas.width = screen.width;
canvas.height = screen.height;
});

function drawScore() {
    ctx.font = "16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    ctx.fillText("Level: " + level, 8, 40);
    ctx.fillText("Lives: " + lives, 8, 60);
}

function obstacle(x, y, dx, dy, status) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.status = status;
    this.drawO = () => {
        ctx.beginPath();
        ctx.beginPath();
        ctx.rect(this.x, this.y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    this.update = () => {
        if(this.x + x > window.innerWidth || this.x < 0) {
            this.dx = -this.dx;
        }
        if(this.y + y > window.innerHeight || this.y < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.drawO();
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}
var crashed = false;
function collisionDetection() {
    for(var r = 0; r < bricks.length; r++) {
        var b = bricks[r];
        if(b.status == 1) {
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                console.log('collisionDetection');
                crashed = true;
                lives--;
                b.status=0;
            }
        }
    }
}
if(crashed == true){
       lives--;
       }

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

for(let i = 0; i < 3; i++) {
    var harmObjectX = 200;
    var harmObjectY = Math.random() * canvas.height;
    var harmObjectDX = (Math.random() - 0.5) * 8;
    var harmObjectDY = (Math.random() - 0.5) * 8;
    bricks.push(new obstacle(harmObjectX, harmObjectX, harmObjectDX, harmObjectDY, 1));
    console.log(canvas.width);
    console.log("X: " + harmObjectX + " Y: " + harmObjectY);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawScore();
    collisionDetection();
    if(rightPressed) {
        x += dx;
    } else if(leftPressed) {
        x -= dx;
    } else if(upPressed) {
        y += dy;
    } else if(downPressed) {
        y -= dy;
    }
    for(let i = 0; i < bricks.length; i++) {
        bricks[i].update();
    }
    if(lives <= 0){
   alert("Game Over");
        clearInterval(interval);
   }
}



var interval = setInterval(draw, 10);