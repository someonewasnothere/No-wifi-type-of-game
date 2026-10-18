const stickman = document.getElementById('stickman'); 
const rock = document.getElementById('rock'); 
const score = document.getElementById('score'); 

function jump() {
    if (stickman.classList.contains('jump-animation')) return;
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


setInterval(() => {
    const stickmanTop = parseInt(window.getComputedStyle(stickman).getPropertyValue('top'));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));

    if (rockLeft < 50 && rockLeft > 0 && stickmanTop >= 150) {
        alert('Game Over! Your score: ' + score.innerText);
        score.innerText = 0;
        rock.style.animation = 'none';
        rock.offsetHeight; // Trigger reflow
        rock.style.animation = null;
    } else {
        score.innerText = parseInt(score.innerText) + 1;
    }
}, 100);    

