var canvas = document.querySelector("canvas");
canvas.width = screen.width;
canvas.height =  screen.height;
console.log(canvas.width);
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
var level = 1;
var lives = 3;

window.addEventListener('resize', function() {
  canvas.width = screen.width;
canvas.height = screen.height;
});

function drawScore() {
    ctx.font = "21px Calibri";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    ctx.fillText("Level: " + level, 8, 60);
    ctx.fillText("Lives: " + lives, 8, 100);
}

function obstacle(x, y, dx, dy, status, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.status = status;
    this.color = color;
    this.drawO = () => {
        ctx.beginPath();
        ctx.beginPath();
        ctx.rect(this.x, this.y, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    this.update = () => {
        if(this.x  > window.innerWidth || this.x < 0) {
            this.dx = -this.dx;
        }
        if(this.y  > window.innerHeight || this.y < 0) {
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
var bonusObjCrashed = false;

function collisionDetection() {
    for(var r = 0; r < bricks.length; r++) {
        var b = bricks[r];
        if(b.status == 1) {
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                console.log('collisionDetection');
                crashed = true;
                b.dy = -b.dy;
                b.dx = -b.dx;
            }
        }
    }
    for(var g = 0; g < bonusObj.length; g++) {
        var g = bonusObj[g];
        if(x > g.x && x < g.x + brickWidth && y > g.y && y < g.y + brickHeight) {
            console.log('Bonus Point');
            bonusObjCrashed = true;
            g.dy = -g.dy;
            g.dx = -g.dx;
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// =========================================== Draw Harm Objects ================================================================
 var bonusObj = [];
 var levelUp = true;

 function init(maxLevel) {
     bricks = [];
     bonusObj = [];
     if(levelUp == true) {
         for(var u = 0; u < maxLevel; u++) {
             var harmObjectX = canvas.width;
             var harmObjectY = Math.random() * canvas.height;
             var harmObjectDX = -(Math.random() - 0.5 * 8);
             var harmObjectDY = -(Math.random() - 0.5 * 8);
             bricks.push(new obstacle(harmObjectX, harmObjectX, harmObjectDX, harmObjectDY, 1, "#0095DD"));
         }
     //===============================================================================================================================
// ========================================== Draw Bonus Objects ================================================================
         for(let i = 0; i < maxLevel+1; i++) {
             var bonusObjectX = canvas.width;
             var bonusObjectY = Math.random() * canvas.height;
             var bonusObjectDX = -(Math.random() - 0.5 * 8);
             var bonusObjectDY = -(Math.random() - 0.5 * 8);
             bonusObj.push(new obstacle(bonusObjectX, bonusObjectY, bonusObjectDX, bonusObjectDY, 1, "green"));
         }
     }
     levelUp = false;
 }
    init(1);
// ==============================================================================================================================




// ================================================== Buffer ====================================================================
var speedIncreasedLvL2 = true;
var speedIncreasedLvL3 = true;
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
    
//==================================== Increasing Speed for Objects =============================================================
    if(level == 2) {
        if(speedIncreasedLvL2 == true) {
            for(var a = 0; a < bricks.length; a++) {
                var m = bricks[a];
                console.log('Speed Increased for Lvl 2');
                m.dy = m.dy * 3;
                m.dx = m.dx * 3;
                speedIncreased = false;
            }
            for(var b = 0; b < bonusObj.length; b++) {
                var n = bonusObj[b];
                console.log('Speed Increased for Lvl 2');
                n.dy = n.dy * 3;
                n.dx = n.dx * 3;
                speedIncreasedLvL2 = false;
            }
        }
    }
    if(level == 3) {
        if(speedIncreasedLvL3 == true) {
            for(var a = 0; a < bricks.length; a++) {
                var m = bonusObj[a];
                console.log('Speed Increased for Lvl 3');
                m.dy = m.dy + 8;
                m.dx = m.dx + 8;
                speedIncreased = false;
            }
            for(var b = 0; b < bonusObj.length; b++) {
                var n = bonusObj[b];
                console.log('Speed Increased Lvl 3');
                n.dy = n.dy + 8;
                n.dx = n.dx + 8;
                speedIncreasedLvL3 = false;
            }
        }
    }
//===============================================================================================================================
    for(let i = 0; i < bricks.length; i++) {
        bricks[i].update();
    }
    for(let i = 0; i < bonusObj.length; i++) {
        bonusObj[i].update();
    }

    if(crashed){
       lives--;
        crashed = false;
       }
    if(bonusObjCrashed){
       score++;
        bonusObjCrashed = false;
       }
    if(score == 10){
       level=2;
    }
    if(score == 20){
       level = 3;
       }
    if(lives <= 0){
       ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawScore();
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
        clearInterval(interval);
   }
}
// ==============================================================================================================================


var interval = setInterval(draw, 10);