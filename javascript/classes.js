/***********************************/
/************ Class Bar ************/
/***********************************/

class Bar {
    constructor(posX, posY, width, height) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.posDX = 20;
        this.posDY = 20;
        this.color = 'Black';
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
    updateAutmatically() {
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
        this.posY = posY;
        this.posDX = 10;
        this.posDY = 10;
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
    update(input) {
        this.draw();

        if (canvas.width < (this.posX + this.radius) || 0 > (this.posX - this.radius)) {
            this.posDX = -this.posDX;
        }

        if (canvas.height < (this.posY + this.radius) || 0 > (this.posY - this.radius)) {
            this.posDY = -this.posDY;
        }

        if (this.posX <= (input.posX + input.width) && (this.posY - this.radius) == (input.posY - this.radius)) {
            this.posDY = -this.posDY;
        }
        this.posX += this.posDX;
        this.posY += this.posDY;
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
    }
    draw(posX, posY, width, height, color) {
        context.fillStyle = color;
        context.fillRect(posX, posY, width, height);
    }
}