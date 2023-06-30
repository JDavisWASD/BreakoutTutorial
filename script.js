const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");

let dx = 2;
let dy = -2;
let x = canvas.width / 2;
let y = canvas.height - 30;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI *2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

setInterval(draw, 10);