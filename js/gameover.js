export function createGameOverScreen(score) {
    // Get the game container element
    const gameContainer = document.getElementById('gameContainer');
  
    // Create a div element for the game over screen and set its styles
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
  
    // Create a h1 element for the game over text and set its styles
    const gameOverText = document.createElement('h1');
    gameOverText.textContent = 'Game Over';
    gameOverText.style.color = 'white';
    gameOverText.style.fontSize = '48px';
  
    // Create a p element for the score text and set its styles
    const scoreText = document.createElement('p');
    scoreText.textContent = `Score: ${score}`;
    scoreText.style.color = 'white';
    scoreText.style.fontSize = '24px';
    scoreText.style.marginBottom = '20px';
  
    // Create a button element for the restart button and set its styles and event listener
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
  
    // Create a button element for the exit button and set its styles and event listener
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
  
    // Add the elements to the game over screen and the game container
    gameOverScreen.appendChild(gameOverText);
    gameOverScreen.appendChild(scoreText);
    gameOverScreen.appendChild(restartButton);
    gameOverScreen.appendChild(exitButton);
    gameContainer.appendChild(gameOverScreen);
  
    // Remove any existing buttons from the game container
    const button = gameContainer.querySelector('button');
    if (button) {
      button.remove();
    }
  }
  