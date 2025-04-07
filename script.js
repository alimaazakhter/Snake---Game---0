// This file contains the JavaScript code that implements the game logic for the Snake game.

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

let boxSize = 20; // Size of each grid box
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;
let gameSpeed = 200; // Initial speed in milliseconds

// Dynamically adjust canvas size based on screen size
function resizeCanvas() {
    const containerWidth = document.querySelector('.container').offsetWidth;
    canvas.width = Math.floor(containerWidth / boxSize) * boxSize;
    canvas.height = canvas.width; // Keep it square
    boxSize = canvas.width / 20; // Adjust box size dynamically
}

function startGame() {
    resetGame();
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(updateGame, gameSpeed);
}

function resetGame() {
    resizeCanvas(); // Adjust canvas size on reset
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = { x: 15, y: 15 };
    score = 0;
    gameSpeed = 200; // Reset speed to initial value
    scoreElement.textContent = `Score: ${score}`;
    clearInterval(gameInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function updateGame() {
    if (checkCollision()) {
        alert('Game Over! Your score: ' + score);
        resetGame();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.x >= canvas.width / boxSize ||
        head.y < 0 ||
        head.y >= canvas.height / boxSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
        food.x * boxSize + boxSize / 2,
        food.y * boxSize + boxSize / 2,
        boxSize / 2,
        0,
        2 * Math.PI
    );
    ctx.fill();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        placeFood();
        increaseSpeed(); // Increase speed when food is eaten
    } else {
        snake.pop();
    }
}

function placeFood() {
    let newFoodPosition;
    do {
        newFoodPosition = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)),
            y: Math.floor(Math.random() * (canvas.height / boxSize))
        };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    food = newFoodPosition;
}

function increaseSpeed() {
    if (gameSpeed > 50) { // Set a minimum speed limit
        gameSpeed -= 10; // Decrease the interval to make the game faster
        clearInterval(gameInterval);
        gameInterval = setInterval(updateGame, gameSpeed);
    }
}

startButton.addEventListener('click', startGame);
window.addEventListener('resize', resizeCanvas); // Adjust canvas size on window resize