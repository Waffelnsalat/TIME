import { startGame } from './game.js';

export function showStartScreen() {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const optionsButton = document.getElementById('optionsButton');
    const creditsButton = document.getElementById('creditsButton');
    const exitButton = document.getElementById('exitButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    const savedVolume = localStorage.getItem('musicVolume');
    const musicVolume = savedVolume !== null ? parseFloat(savedVolume) : 0.5;
    backgroundMusic.volume = musicVolume;

    // Play the background music (this may not work on some browsers without user interaction)
    backgroundMusic.play().catch((error) => {
        console.log('Failed to play background music:', error);
    });

    // Add event listeners to buttons for handling click events
    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        backgroundMusic.play(); // This will play the music if it didn't autoplay
        startScreen.style.display = "none"
    // Hide all buttons
    startButton.style.display = "none";
    optionsButton.style.display = "none";
    creditsButton.style.display = "none";
    exitButton.style.display = "none";

        startGame();
    });


    optionsButton.addEventListener('click', () => {
        console.log('Options button clicked');
        window.open('options.html', '_blank', 'width=640, height=480');
    });

    creditsButton.addEventListener('click', () => {
        console.log('Credits button clicked');
        window.open('credits.html', '_blank', 'width=640, height=480');
    });
    
    exitButton.addEventListener('click', () => {
        console.log('Exit button clicked');
        window.close();
    });
    
}
