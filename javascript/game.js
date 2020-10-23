const canvas = document.getElementById('canvas');
canvas.width = 1500;
canvas.height = 700;
const context = canvas.getContext('2d');

/***********************************/
/************ Class Bar ************/
/***********************************/

class Bar {
    constructor(posX, posY, width, height) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.posDX = 5;
        this.posDY = 5;
        this.color = 'Black';
    }
    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.posX, this.posY, this.width, this.height);
    }
    update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();

        if (canvas.width < (this.posX + this.width) || 0 > this.posX) {
            this.posDX = -this.posDX;
        }
        this.posX += this.posDX;
    }
}

/************************************/
/************ Class Ball ************/
/************************************/


class Ball {
    constructor(posX, posY, radius, color) {
        this.posX = posX;
        this.posDX = 10;
        this.posDY = 10;
        this.posY = posY;
        this.radius = radius;
        this.color = 'Red';
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
    }
    draw() {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, this.startAngle, this.endAngle);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();

        if (canvas.width < (this.posX + this.radius) || 0 > (this.posX - this.radius)) {
            this.posDX = -this.posDX;
        }

        if (canvas.height < (this.posY + this.radius) || 0 > (this.posY - this.radius)) {
            this.posDY = -this.posDY;
        }
        this.posX += this.posDX;
        this.posY += this.posDY;

    }
}

/**************************************/
/************ Class Bricks ************/
/**************************************/

class Bricks {
    constructor(posX, posY, width, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw() {
            context.fillStyle = this.color;
            context.fillRect(this.posX, this.posY, this.width, this.height);
        }
        /*     buildRow(colorArray, length) {
                for (let i = 0; i < length; i++) {
                    this.colorArray = colorArray;
                    const colorIndex = Math.floor(Math.random() * this.colorArray.length);
                    let newBrick = new Bricks(this.posX, this.posY, this.width, this.height, this.colorArray[colorIndex]);
                    this.rowBrick.push(newBrick.draw());
                    this.posX += this.width;
                }
            } */
    destroyed() {

    }
}


/* 
const firstRow = new Bricks(100, 50, 30, 30);
const secondRow = new Bricks(100, 100, 30, 30);
const thirdRow = new Bricks(100, 200, 50, 50);

firstRow.buildRow(myColors, 45);
secondRow.buildRow(myColors, 30);
thirdRow.buildRow(myColors, 15);
 */


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







/*

const bottomBar = new Bar(500, 650, 400, 25);

const myBall = new Ball(300, 300, 20);


function animateBall() {
    requestAnimationFrame(animateBall);
    myBall.update();
}


function animateBar() {
    requestAnimationFrame(animateBar);
    bottomBar.update();
    // myBall.update();
}

animateBar();

*/