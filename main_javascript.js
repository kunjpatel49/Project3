var myGamePiece;
var gameObj;
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth-200;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    c.fillStyle = color;
    c.fillRect(this.x, this.y, this.width, this.height);
}

function startGame() {
    myGamePiece = new component(30, 30, "red", canvas.width/2, canvas.width/2);
    gameObj = new component(200,10,"green",canvas.width-200,0);
    gameobj = new component(200,10, "green",0,0);
    console.log(canvas.width,canvas.height);
}


