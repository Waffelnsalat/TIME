export function createGameOverScreen(score) {
    const gameContainer = document.getElementById('gameContainer');

    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'gameOverScreen';
    gameOverScreen.style.position = 'absolute';
    gameOverScreen.style.top = 0;
    gameOverScreen.style.left = 0;
    gameOverScreen.style.width = '100%';
    gameOverScreen.style.height = '100%';
    gameOverScreen.style.display = 'flex';
    gameOverScreen.style.flexDirection = 'column';
    gameOverScreen.style.alignItems = 'center';
    gameOverScreen.style.justifyContent = 'center';
    gameOverScreen.style.backgroundColor = 'black';

    const gameOverText = document.createElement('h1');
    gameOverText.textContent = 'Game Over';
    gameOverText.style.color = 'white';
    gameOverText.style.fontSize = '48px';

    const scoreText = document.createElement('p');
    scoreText.textContent = `Score: ${score}`;
    scoreText.style.color = 'white';
    scoreText.style.fontSize = '24px';
    scoreText.style.marginBottom = '20px';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.style.padding = '15px 30px';
    restartButton.style.fontSize = '1.2em';
    restartButton.style.cursor = 'pointer';
    restartButton.style.width = '300px';
    restartButton.style.textAlign = 'center';
    restartButton.addEventListener('click', () => {
        gameOverScreen.remove();
        window.location.reload();
    });

    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.style.padding = '15px 30px';
    exitButton.style.fontSize = '1.2em';
    exitButton.style.cursor = 'pointer';
    exitButton.style.width = '300px';
    exitButton.style.textAlign = 'center';
    exitButton.addEventListener('click', () => {
        window.close();
    });

    gameOverScreen.appendChild(gameOverText);
    gameOverScreen.appendChild(scoreText);
    gameOverScreen.appendChild(restartButton);
    gameOverScreen.appendChild(exitButton);
    gameContainer.appendChild(gameOverScreen);


    const button = gameContainer.querySelector('button');
    if (button) {
        button.remove();
    }
    
}
