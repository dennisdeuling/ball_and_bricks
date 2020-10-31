const canvas = document.getElementById('canvas');
canvas.width = 1500;
canvas.height = 700;
const context = canvas.getContext('2d');

const bottomBar = new Bar(500, 650, 400, 25);

const myBall = new Ball(900, 300, 15);

let allBricks = saveBricks(100, 100, 80, 50, 30);

function gameLoop() {
    if (myBall.gameOver && allBricks.length == 0) {
        context.fillStyle = 'Red';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'White';
        context.font = '100px Georgia';
        context.fillText('Yay, you won!', canvas.width / 3.5, canvas.height / 2);
    } else if (myBall.gameOver) {
        context.fillStyle = 'Black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'White';
        context.font = '50px Georgia';
        context.fillText('You lost, please try again!', canvas.width / 3.5, canvas.height / 2);
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        bottomBar.update();
        myBall.update(bottomBar, allBricks);
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();


window.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37:
            bottomBar.moveLeft();
            break;
        case 39:
            bottomBar.moveRight();
    }
});