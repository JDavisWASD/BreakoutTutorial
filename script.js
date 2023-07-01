const ballRadius = 10;
const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");
const paddleHeight = 10;
const paddleWidth = 75;
const paddleSpeed = 7;

let horizBallSpeed = 2;
let vertBallSpeed = -2;
let x = canvas.width / 2;
let y = canvas.height - 30;

let paddleX = (canvas.width - paddleWidth) / 2;
let rightKeybind = "d";
let leftKeybind = "a";
let rightPressed = false;
let leftPressed = false;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + horizBallSpeed > canvas.width - ballRadius || x + horizBallSpeed <
        ballRadius) {
            horizBallSpeed = -horizBallSpeed;
    }
    if (y + vertBallSpeed > canvas.height - ballRadius || y + vertBallSpeed <
        ballRadius) {
            vertBallSpeed = -vertBallSpeed;
    }

    if (rightPressed) {
        paddleX = Math.min(paddleX + paddleSpeed, canvas.width - paddleWidth);
    }
    else if (leftPressed) {
        paddleX = Math.max(paddleX - paddleSpeed, 0);
    }

    x += horizBallSpeed;
    y += vertBallSpeed;
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth,
        paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function keyDownHandler(event) {
    if (event.key === rightKeybind) {
        rightPressed = true;
    }
    else if (event.key === leftKeybind) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === rightKeybind) {
        rightPressed = false;
    }
    else if (event.key === leftKeybind) {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);