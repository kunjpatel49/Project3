var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
var score = 0;
var level = 0;

function drawScore() {
    ctx.font = "16px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ score, 8, 20);
    ctx.fillText("Level: "+ level, 8, 40);
}

function obstacle(x, y, dx, dy, status){
    var brickX = Math.floor(Math.random() * window.innerWidth);
    var brickY = 0;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.status = status;
    
    this.drawO = () =>{
        ctx.beginPath();
        
        ctx.beginPath();
        ctx.rect(this.x, this.y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    this.update = () =>{
        if(this.x + x > window.innerWidth || this.y < 0){
            console.log('if 1');
           this.dx = -this.dx;
           }
        if(this.y + y > window.innerHeight || this.y < 0){
           this.dy = -this.dy;
            console.log('if 2');
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

function collisionDetection() {
    for(var r = 0; r < brickRowCount; r++) {
        var b = bricks[r];
//         if(b.status == 1) {
//             if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
//                 console.log('collisionDetection');
//                 b.status = 0;
//             }
//         }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function moveBricks() {
    for(var i = 0; i < bricks.lenght; i++) {
        bricks[i].y += 1;
        ctx.beginPath();
        ctx.rect(bricks[i].x, bricks[i].y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}
var Obstacle = new obstacle(200,200,3,3,1);
function draw(){
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawScore();
    Obstacle.update();
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

}

var interval = setInterval(draw, 10);