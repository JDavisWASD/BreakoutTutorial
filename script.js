const ballRadius = 10;
const brickColumnCount = 5;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetLeft = 30;
const brickOffsetTop =30;
const brickRowCount = 3;
const brickWidth = 75;
const bricks = [];
const canvas = document.getElementById("gameBoard");
const context = canvas.getContext("2d");
const interval = setInterval(draw, 10);
const paddleHeight = 10;
const paddleWidth = 75;
const paddleSpeed = 7;

let horizBallSpeed = 2;
let leftKeybind = "a";
let leftPressed = false;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightKeybind = "d";
let rightPressed = false;
let score = 0;
let vertBallSpeed = -2;
let x = canvas.width / 2;
let y = canvas.height - 30;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

for (let col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

function collisonDetection() {
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            const brick = bricks[col][row];

            if (brick.status === 1) {
                if (
                    x > brick.x &&
                    x < brick.x + brickWidth &&
                    y > brick.y &&
                    y < brick.y + brickHeight
                ) {
                    vertBallSpeed = -vertBallSpeed;
                    brick.status = 0;
                    score++;

                    if (score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN");
                        document.location.reload();
                        clearInterval(interval);    //Required for Chrome
                    }
                }
            }
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    collisonDetection();

    if (x + horizBallSpeed > canvas.width - ballRadius || x + horizBallSpeed <
        ballRadius) {
            horizBallSpeed = -horizBallSpeed;
    }
    if (y + vertBallSpeed < ballRadius) {
        vertBallSpeed = -vertBallSpeed;
    }
    else if (y + vertBallSpeed > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            vertBallSpeed = -vertBallSpeed;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);    //Required for Chrome
        }
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

function drawBricks() {
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status === 1) {
                const brickX = col * (brickWidth + brickPadding) +
                    brickOffsetLeft;
                const brickY = row * (brickHeight + brickPadding) +
                    brickOffsetTop;
    
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#0095DD";
                context.fill();
                context.closePath();
            }
        }
    }
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth,
        paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText(`Score: ${score}`, 8, 20);
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