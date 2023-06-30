const ballRadius = 10;
const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");

let dx = 2;
let dy = -2;
let x = canvas.width / 2;
let y = canvas.height - 30;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

setInterval(draw, 10);