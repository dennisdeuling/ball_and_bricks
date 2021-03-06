function collisionDetection(ball, object) {
    let topBall = ball.posY;
    let bottomBall = ball.posY + ball.radius;

    let topObject = object.posY;
    let bottomObject = object.posY + object.height;
    let leftObject = object.posX;
    let rightObject = object.posX + object.width;

    if (topBall <= bottomObject && bottomBall >= topObject && ball.posX >= leftObject && ball.posX + ball.radius <= rightObject) {
        return true;
    } else {
        return false;
    }
}

function saveBricks(startX, startY, width, height, amount) {
    const bricks = [];
    for (let i = 0; i < amount; i++) {
        if (startX < (canvas.width - 100)) {
            const colors = ['#FFE2BF', '#FFB04F', '#FFE4CC', '#FFAD8F', '#FF8D63'];
            const colorIndex = Math.floor(Math.random() * colors.length);
            let brick = new Brick(startX, startY, width, height, colors[colorIndex]);
            startX += width;
            bricks.push(brick);
        }
    }
    return bricks;
}

function drawBricks(bricks) {
    bricks.forEach(brick => {
        brick.draw(brick.posX, brick.posY, brick.width, brick.height, brick.color);
    });
}

class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}


/***********************************/
/************ Class Bar ************/
/***********************************/

class Bar {
    constructor(posX, posY, width, height) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.posDX = 15;
        this.posDY = 15;
        this.color = '#FF5003';
    }
    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.posX, this.posY, this.width, this.height);

    }
    update() {
        this.draw();
    }
    moveLeft() {
        if (!(0 > this.posX)) {
            this.posX -= 30;
        }
    }
    moveRight() {
        if (!(canvas.width < (this.posX + this.width + 30))) {
            this.posX += 30;
        }
    }
}


/************************************/
/************ Class Ball ************/
/************************************/


class Ball {
    constructor(radius) {
        this.posX = Math.floor(Math.random() * 1500);
        this.posY = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
        this.posDX = 5;
        this.posDY = 5;
        this.radius = radius;
        this.color = '#FF8E00';
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.gameOver = false;
        this.startGame = false;
    }
    draw() {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, this.startAngle, this.endAngle);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
    update(paddle, bricks) {
        this.draw();

        // Ball
        // canva boundary left and right
        if (canvas.width < (this.posX + this.radius) || 0 > (this.posX - this.radius)) {
            this.posDX = -this.posDX;
            soundBoundaries.stop();
            soundBoundaries.play();
        }
        // canva boundary top
        if (0 > (this.posY - this.radius)) {
            this.posDY = -this.posDY;
            soundBoundaries.stop();
            soundBoundaries.play();

        }
        this.posX += this.posDX;
        this.posY += this.posDY;

        if (collisionDetection(this, paddle)) {
            this.posDY = -this.posDY;
            soundBoundaries.stop();
            soundBoundaries.play();


        }
        for (let i = 0; i < bricks.length; i++) {
            if (collisionDetection(this, bricks[i])) {
                this.posDY = -this.posDY;
                soundBricks.stop();
                soundBricks.play();
                bricks[i].deletion = true;
            }
        }

        allBricks = bricks.filter(brick => !brick.deletion);

        drawBricks(bricks);

        if (canvas.height < (this.posY - this.radius)) {
            this.gameOver = true;
        }

        if (bricks.length == 0) {
            this.gameOver = true;
        }
    }
    won() {
        context.fillStyle = 'Red';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'White';
        context.font = '50px Georgia';
        context.fillText('Yay, you won! Please push N to start again', canvas.width / 5.3, canvas.height / 2);
    }
    loose() {
        context.fillStyle = 'Black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'White';
        context.font = '50px Georgia';
        context.fillText('You lost, please push N and try again!', canvas.width / 4.3, canvas.height / 2);
    }
    start() {
        context.fillStyle = 'White';
        context.font = '50px Georgia';
        context.fillText('Please press the Spacebar to start!', canvas.width / 4, canvas.height / 2);
    }
}

/**************************************/
/************ Class Bricks ************/
/**************************************/

class Brick {
    constructor(posX, posY, width, height, color) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.deletion = false;
    }
    draw(posX, posY, width, height, color) {
        context.fillStyle = color;
        context.fillRect(posX, posY, width, height);
    }
}