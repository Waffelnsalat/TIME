// Import functions from other JavaScript files
import { showStartScreen } from './startscreen.js';
import { createGameOverScreen } from './gameover.js'; 
import { startGame } from './game.js';

// Define an `init` function to initialize the game
function init() {
  // Show the start screen
  showStartScreen();
}

// Call the `init` function to start the game
init();

// Listen for messages from the options page
window.addEventListener('message', (event) => {
  // If the message type is `setVolume`
  if (event.data.type === 'setVolume') {
    // Get the background music element
    const backgroundMusic = document.getElementById('backgroundMusic');
    // Set the volume of the background music to the value specified in the message
    backgroundMusic.volume = event.data.volume;
  }
});