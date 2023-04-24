import { showStartScreen } from './startscreen.js';
import { createGameOverScreen } from './gameover.js'; 
import { startGame } from './game.js';

function init() {
    showStartScreen();
}

init();

// Listen for messages from the options page
window.addEventListener('message', (event) => {
    if (event.data.type === 'setVolume') {
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = event.data.volume;
    }
});