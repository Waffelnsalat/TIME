import { createGameOverScreen } from './gameover.js';

// Declare and initialize various variables
let dragging = false;
let angle = -Math.PI / 2;
let speed = 0.0004;
let score = 0;
let framecounter = 0;
let gameRunning = false;

// Get the canvas and its context
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const rect = gameCanvas.getBoundingClientRect();

// Define the startGame function
export function startGame() {

  // Set the game as running and start the animation
  gameRunning = true;
  animate();

  // Add event listeners for mouse interaction
  gameCanvas.addEventListener('mousedown', handleMouseDown);
  gameCanvas.addEventListener('mousemove', handleMouseMove);
  gameCanvas.addEventListener('mouseup', handleMouseUp);

  // Create and add three buttons to the game container
  createAndAddButton(1);
  createAndAddButton(2);
  createAndAddButton(3);

  // Initialize the score
  score = 0;
}

// Define the animate function
function animate() {

  // Stop updating the score and the angle when the game is not running
  if (!gameRunning) return;

  // Clear the canvas
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw the score
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, gameCanvas.width - 130, 30);

  //Increase the score
  if (framecounter == 30){
    score += 1;
    framecounter = 0;
  }
  else {
    framecounter +=1;
  }


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

    // End the game when the angle is too high or too low
    if (angle > 3 * Math.PI / 2 || angle > (-Math.PI / 2) - 0.04 && angle < -1.6) {
        // Stop the game, show the game over screen, and stop the animation loop
createGameOverScreen(score);
gameRunning = false;
speed = 0.0004;
return;
}

// Request the next frame of animation
requestAnimationFrame(animate);
}

// Define the event listener functions for mouse interaction
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

// Define the createAndAddButton function
function createAndAddButton(type) {
// Get the game container and its dimensions
const gameContainer = document.getElementById('gameContainer');
const gameContainerWidth = gameContainer.clientWidth;
const gameContainerHeight = gameContainer.clientHeight;

// Create a button element with various styles and attributes
const button = document.createElement('button');
button.style.position = 'absolute';
button.style.display = 'none';
button.style.width = '80px';
button.style.height = '80px';
button.style.borderRadius = '50%';
button.style.backgroundColor = 'white';

// Declare and initialize various variables for the timer and movement
let timerValue;
let timerInterval;
let dx = 2;
let dy = 2;

    // Define the startTimer function
    function startTimer() {
        timerValue = type === 3 ? 20 : 15;
        button.innerText = `${timerValue}`;

// Change the button's background color back to white when starting the timer
button.style.backgroundColor = 'white';

// Start the timer interval and change the button's background color when the timer is low
timerInterval = setInterval(() => {
  timerValue -= 1;
  button.innerText = `${timerValue}`;

  if (timerValue < 5) {
    button.style.backgroundColor = 'green';
  } else {
    button.style.backgroundColor = 'white';
  }

  // End the game when the timer reaches 0
  if (timerValue <= 0) {
    clearInterval(timerInterval);
    createGameOverScreen(score);
    speed = 0.0004;
    gameRunning = false;
    return;
  }
}, 1000);
    }

// Function to randomly reposition the button within the game container
function repositionButton() {
    const gameContainerRect = gameContainer.getBoundingClientRect();
    const x = Math.floor(Math.random() * (gameContainerRect.width - button.clientWidth));
    const y = Math.floor(Math.random() * (gameContainerRect.height - button.clientHeight));
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    score += 10;
    }
    
    // Function to move the button in a bouncing manner, only for type 3 buttons
    function moveBouncingButton() {
    // If the button type is not 3, exit the function
    if (type !== 3) return;

    let x = parseInt(button.style.left);
    let y = parseInt(button.style.top);
    
    // Move the button based on the dx and dy values
    x += dx;
    y += dy;
    
    // If the button is hitting the sides of the game container, reverse the direction of the movement
    if (x < 0 || x + button.clientWidth > gameContainerWidth) {
        dx = -dx;
    }
    if (y < 0 || y + button.clientHeight > gameContainerHeight) {
        dy = -dy;
    }
    
    // Set the new position of the button
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    
    // Request the next frame
    requestAnimationFrame(moveBouncingButton);
    }

// Add event listener to the button to start the timer and reposition the button when clicked
button.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTimer();
    repositionButton();
    if (timerValue < 5) {
    button.style.backgroundColor = 'white';
    }
    });
    
    // Add the button to the game container and set its initial position
    gameContainer.appendChild(button);
    repositionButton();
    
    // Show the button and start the timer after a delay based on the button type
    setTimeout(() => {
    button.style.display = 'block';
    startTimer();
    moveBouncingButton();
    }, type === 1 ? 3000 : type === 2 ? 15000 : 30000);
}


