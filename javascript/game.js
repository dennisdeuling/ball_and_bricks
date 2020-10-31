const canvas = document.getElementById('canvas');
canvas.width = 1500;
canvas.height = 700;
const context = canvas.getContext('2d');

const bottomBar = new Bar(500, 650, 400, 25);

const myBall = new Ball(15);

let allBricks = saveBricks(100, 100, 80, 50, 30);

const soundBricks = new Sound('./sounds/bricks.wav');

const soundBoundaries = new Sound('./sounds/boundaries.mp3');


function gameLoop() {
    if (!myBall.startGame && !myBall.gameOver) {
        myBall.start();
    } else if (!myBall.gameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        bottomBar.update();
        myBall.update(bottomBar, allBricks);
    } else if (myBall.gameOver && allBricks.length == 0) {
        myBall.won();
    } else if (myBall.gameOver) {
        myBall.loose();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37:
            bottomBar.moveLeft();
            break;
        case 39:
            bottomBar.moveRight();
            break;
        case 32:
            myBall.startGame = true;
            break;
        default:
            console.log('Not the right input');
            break;
    }
});