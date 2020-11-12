audio = new Audio('game.mp3');
audioGo = new Audio('gameOver.mp3');

function audioPlay() {
    audio.play();
}

score = 0;
cross = true;


document.onkeydown = function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 50 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 50 + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacles = document.querySelector('.obstacles');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));


    ox = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('top'));


    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    // console.log(offsetX,offsetY)
    if (offsetX < 84 && offsetY < 56) {
        gameOver.innerHTML = "Game Over"
        obstacles.classList.remove('obstaclesAni')
        dino.classList.add('gameOverAnim');
        audioGo.play();
        setTimeout(() => {
            audioGo.pause();
            audio.pause();
        }, 2000);
    }
    else if (offsetX < 80 && cross) {
        score += 100
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 2000);

        setTimeout(() => {
            animationDur = parseFloat(window.getComputedStyle(obstacles, null).getPropertyValue('animation-duration'));
            newDur = animationDur - 0.01;
            obstacles.style.animationDuration = newDur + 's';
            console.log('new animation duration :', newDur)
        }, 300);
    }

}, 10);

function updateScore(score) {
    scoreCount = document.querySelector('.scoreCount')
    scoreCount.innerHTML = "Your Score : " + score
}

