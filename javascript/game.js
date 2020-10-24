const canvas = document.getElementById('canvas');
canvas.width = 1500;
canvas.height = 700;
const context = canvas.getContext('2d');

const bottomBar = new Bar(500, 650, 400, 25);

const myBall = new Ball(900, 650, 20);


function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    bottomBar.update();
    myBall.update(bottomBar);
    requestAnimationFrame(gameLoop);
}

gameLoop();

window.addEventListener('keydown', event => {
    console.log(event);
    if (event.keyCode == 37) {
        buttomBar.update();
    }
    if (event.keyCode == 39) {
        console.log('rightArrow');
    }
});












/* 
const firstRow = new Bricks(100, 50, 30, 30);
const secondRow = new Bricks(100, 100, 30, 30);
const thirdRow = new Bricks(100, 200, 50, 50);

firstRow.buildRow(myColors, 45);
secondRow.buildRow(myColors, 30);
thirdRow.buildRow(myColors, 15);
 */

/*
function rowBuilderBricks(colorArray, length, x, y, width, height) {
    let rowBricks = [];

    for (let i = 0; i < length; i++) {
        if ((x + width) < (canvas.width - 50)) {
            const colorIndex = Math.floor(Math.random() * colorArray.length);
            const newBrick = new Bricks(x, y, width, height, colorArray[colorIndex]);
            newBrick.draw();
            rowBricks.push(newBrick);
            x += width;
        }
    }
    return rowBricks;
}

function shuffleRow(rowArray) {
    let currentIndex = rowArray.length;
    let tempValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempValue = rowArray[currentIndex];
        rowArray[currentIndex] = rowArray[randomIndex];
        rowArray[randomIndex] = tempValue;
    }
    return rowArray;
}

function buildAllBlocks(rowArray) {
    let allBricks = [];

    for (let i = 0; i < 100; i++) {
        let newBrick = rowArray[i].posY + rowArray[i].height;
        allBricks.push(newBrick);
    }
    return allBricks;
}

const myColors = ['Red', 'Blue', 'Lila', 'Yellow', 'Green', 'Purple'];

const firstRow = rowBuilderBricks(myColors, 100, 100, 50, 30, 30);

const allBlocks = buildAllBlocks(firstRow);

console.log(firstRow);

console.log(allBlocks);
*/
/* var rowBrick = [];
let x = 100;
let y = 50;
let width = 30;
let height = 30;

for (let i = 0; i < 40; i++) {
    const colorIndex = Math.floor(Math.random() * myColors.length);
    let newBrick = new Bricks(x, y, width, height, myColors[colorIndex]);
    newBrick.draw();
    rowBrick.push(newBrick);
    x += width;
}
console.log(rowBrick); */