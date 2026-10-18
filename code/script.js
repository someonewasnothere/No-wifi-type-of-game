const game = document.getElementById('game');
const stickman = document.getElementById('stickman');
const rock = document.getElementById('rock');
const score = document.getElementById('score');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let gameScore = 0;
let gameRunning = true;

function jump() {
    if (!gameRunning || stickman.classList.contains('jump-animation')) return;
    stickman.classList.add('jump-animation');
}

stickman.addEventListener('animationend', () => {
    stickman.classList.remove('jump-animation');
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
});

rock.addEventListener('animationiteration', () => {
    if (!gameRunning) return;

    gameScore += 1;
    score.textContent = `Score: ${gameScore}`;
});

function checkCollision() {
    if (!gameRunning) return;

    const stickmanBounds = stickman.getBoundingClientRect();
    const rockBounds = rock.getBoundingClientRect();
    const collided = stickmanBounds.right > rockBounds.left
        && stickmanBounds.left < rockBounds.right
        && stickmanBounds.bottom > rockBounds.top
        && stickmanBounds.top < rockBounds.bottom;

    if (collided) {
        gameRunning = false;
        game.classList.add('game-over');
        message.textContent = `Game over! Final score: ${gameScore}.`;
        restartButton.hidden = false;
        return;
    }

    requestAnimationFrame(checkCollision);
}

function restartGame() {
    gameScore = 0;
    gameRunning = true;
    score.textContent = 'Score: 0';
    message.textContent = 'Jump over the rock!';
    restartButton.hidden = true;
    stickman.classList.remove('jump-animation');
    game.classList.remove('game-over');

    rock.style.animation = 'none';
    rock.offsetWidth;
    rock.style.removeProperty('animation');

    requestAnimationFrame(checkCollision);
}

restartButton.addEventListener('click', restartGame);
requestAnimationFrame(checkCollision);
