import { createGameOverScreen } from './gameover.js';

let dragging = false;

let angle = -Math.PI / 2;
let speed = 0.0004
let score = 0;
let gameRunning = false;
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const rect = gameCanvas.getBoundingClientRect();

export function startGame() {
    
    // Start the game
    gameRunning = true;
    animate();

    // Add event listeners for mouse interaction
    gameCanvas.addEventListener('mousedown', handleMouseDown);
    gameCanvas.addEventListener('mousemove', handleMouseMove);
    gameCanvas.addEventListener('mouseup', handleMouseUp);

    // Start the animation
    animate();
    createAndAddButton(1);
    createAndAddButton(2);
    createAndAddButton(3);

    // Initialize the score
    score = 0;
}

function animate() {

    // Stop updating the score and the angle when the game is not running
    if (!gameRunning) return;

    // Clear the canvas
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Draw the score
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, gameCanvas.width - 130, 30);
    score += 1

    // Calculate the center of the canvas
    const centerX = gameCanvas.width / 2;
    const centerY = gameCanvas.height / 2;

    // Define the pointer length and width
    const pointerLength = 330;
    const pointerWidth = 10;

    // Calculate the end position of the pointer based on the angle
    const endX = centerX + pointerLength * Math.cos(angle);
    const endY = centerY + pointerLength * Math.sin(angle);

    // Draw the pointer
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = pointerWidth;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Draw the red hitbox
    ctx.beginPath();
    ctx.arc(endX, endY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw the red triangle
    const angle1 = -Math.PI / 2;
    const angle2 = -1.6;
    const point1X = centerX + pointerLength * Math.cos(angle1);
    const point1Y = centerY + pointerLength * Math.sin(angle1);
    const point2X = centerX + pointerLength * Math.cos(angle2);
    const point2Y = centerY + pointerLength * Math.sin(angle2);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(point1X, point1Y);
    ctx.lineTo(point2X, point2Y);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();

    // Update the angle for the next frame if not dragging
    if (!dragging) {
        
        angle += speed;
        speed += 0.0000001;

    }

    if (angle > 3 * Math.PI / 2 || angle > (-Math.PI / 2) - 0.04 && angle < -1.6) {
        createGameOverScreen(score);
        gameRunning = false;
        speed = 0.0004
        return; // Stop the animation loop
    }


    
    // Request the next frame
    console.log(angle);
    requestAnimationFrame(animate);
}

function handleMouseDown(event) {
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = gameCanvas.width / 2;
    const centerY = gameCanvas.height / 2;
    const pointerLength = 330;

    const endX = centerX + pointerLength * Math.cos(angle);
    const endY = centerY + pointerLength * Math.sin(angle);

    // Calculate the distance between the click and the pointer end
    const distance = Math.sqrt((endX - mouseX) ** 2 + (endY - mouseY) ** 2);

    // Check if the click is close enough to the pointer end
    if (distance < 20) {
        dragging = true;
    }
}

function handleMouseMove(event) {
    if (!dragging) return;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = gameCanvas.width / 2;
    const centerY = gameCanvas.height / 2;

    // Calculate the angle based on the mouse position
    angle = Math.atan2(mouseY - centerY, mouseX - centerX);
}

function handleMouseUp() {
    dragging = false;
}

function createAndAddButton(type) {
    const gameContainer = document.getElementById('gameContainer');
    const gameContainerWidth = gameContainer.clientWidth;
    const gameContainerHeight = gameContainer.clientHeight;

    const button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.display = 'none';
    button.style.width = '80px';
    button.style.height = '80px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = 'white';

    let timerValue;
    let timerInterval;
    let dx = 2;
    let dy = 2;

    function startTimer() {
        timerValue = type === 3 ? 20 : 15;
        button.innerText = `${timerValue}`;

        // Change the button's background color back to white when starting the timer
        button.style.backgroundColor = 'white';

        timerInterval = setInterval(() => {
            timerValue -= 1;
            button.innerText = `${timerValue}`;

            if (timerValue < 5) {
                button.style.backgroundColor = 'green';
            } else {
                button.style.backgroundColor = 'white';
            }

            if (timerValue <= 0) {
                clearInterval(timerInterval);
                createGameOverScreen(score);
                speed = 0.0004
                gameRunning = false; 
                return;
            }
        }, 1000);
    }

    function repositionButton() {
        const gameContainerRect = gameContainer.getBoundingClientRect();
        const x = Math.floor(Math.random() * (gameContainerRect.width - button.clientWidth));
        const y = Math.floor(Math.random() * (gameContainerRect.height - button.clientHeight));
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    }
    

    function moveBouncingButton() {
        if (type !== 3) return;

        let x = parseInt(button.style.left);
        let y = parseInt(button.style.top);

        x += dx;
        y += dy;

        if (x < 0 || x + button.clientWidth > gameContainerWidth) {
            dx = -dx;
        }
        if (y < 0 || y + button.clientHeight > gameContainerHeight) {
            dy = -dy;
        }

        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        requestAnimationFrame(moveBouncingButton);
    }

    button.addEventListener('click', () => {
        clearInterval(timerInterval);
        startTimer();
        repositionButton();
        if (timerValue < 5) {
            button.style.backgroundColor = 'white';
        }
    });

    gameContainer.appendChild(button);
    // Set the initial position of the button within the game container
    repositionButton();


    // Show the button and start the timer after a delay based on the type
    setTimeout(() => {
        button.style.display = 'block';
        startTimer();
        moveBouncingButton();
    }, type === 1 ? 3000 : type === 2 ? 15000 : 30000);
}


