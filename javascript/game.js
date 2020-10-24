const canvas = document.getElementById('canvas');
canvas.width = 1500;
canvas.height = 700;
const context = canvas.getContext('2d');

const bottomBar = new Bar(500, 650, 400, 25);

const myBall = new Ball(900, 650, 20);

const colors = ['Yellow', 'Red'];

const arrayBricks = [];

function saveBricks(startX, startY, width, height, color, storeBricks, amount) {
    for (i = 0; i < amount; i++) {
        startX += width;
        colorIndex = Math.floor(Math.random() * color.length);
        let brick = new Brick(startX, startY, width, height, color[colorIndex]);
        storeBricks.push(brick);
    }
}

saveBricks(100, 100, 30, 30, colors, arrayBricks, 30);

function drawRowBricks(bricks) {
    for (i = 0; i < bricks.length; i++) {
        bricks[i].draw(bricks[i].posX, bricks[i].posY, bricks[i].width, bricks[i].height, bricks[i].color);
    }
}

function checkBrick(bricks, object) {
    for (i = 0; i < bricks.length; i++) {
        object.update(bricks[i]);
    }
}



function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    bottomBar.updateAutmatically();
    myBall.update(bottomBar);
    drawRowBricks(arrayBricks);
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
    }
});