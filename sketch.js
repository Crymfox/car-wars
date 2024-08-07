/*## Copyright © Crymfox 2020 ##*/
let car1;
let car2;
let scoreButton1;
let scoreButton2;
let resetButton1;
let resetButton2;
let scoreBoard;
let ring = [];
let engine;
let info;
let count1;
let count2;

function setup() {
    createCanvas(1501, 701);
    engine = Matter.Engine.create(); /* Matter.Engine.run(engine); */
    engine.world.gravity.y = 0;
    rectMode(CENTER);
    ellipseMode(CENTER);
    angleMode(DEGREES);
    drawPhysRing();
    scoreButton2 = new Button(300 * cos(225) + 318, 300 * sin(225) + 358, 'green', -45, true, 100, 142);
    resetButton1 = new Button(300 * cos(135) + 318, 300 * sin(135) + 342, 'purple', 225, true, 100, 558);
    scoreButton1 = new Button(300 * cos(315) + 1174, 300 * sin(315) + 358, 'green', 45, true, 1390, 142);
    resetButton2 = new Button(300 * cos(45) + 1174, 300 * sin(45) + 342, 'purple', -225, true, 1390, 558);
    car1 = new Car(200, 345, 'red', 0, 90, 83, 81, 68);
    car2 = new Car(1300, 345, 'blue', 180, 38, 40, 37, 39);
    scoreBoard = new ScoreBoard(0, 0);
    info = false;
}

function draw() {
    background(190, 190, 190);
    Matter.Engine.update(engine);
    stroke(0);
    strokeWeight(1);
    textSize(11); /* text('X : ' + mouseX, 1256, 675); */
    text('Crymfox', 1392, 675);
    noFill();
    drawRing();
    scoreButton2.show();
    resetButton1.show();
    scoreButton1.show();
    resetButton2.show();
    scoreBoard.show();
    if (!outMap(car1)) {
        count1 = 0;
        car1.controls();
    } else {
        count1++;
        if (count1 == 900) {
            if (car1.body.position.y < 350) {
                Matter.Body.setPosition(car1.body, {
                    x: car1.body.position.x,
                    y: car1.body.position.y + 600
                });
                Matter.Body.applyForce(car1.body, {
                    x: car1.body.position.x,
                    y: car1.body.position.y
                }, {
                    x: 0,
                    y: -0.05
                });
            } else {
                Matter.Body.setPosition(car1.body, {
                    x: car1.body.position.x,
                    y: car1.body.position.y - 600
                });
                Matter.Body.applyForce(car1.body, {
                    x: car1.body.position.x,
                    y: car1.body.position.y
                }, {
                    x: 0,
                    y: 0.05
                });
            }
        }
    }
    if (!outMap(car2)) {
        count2 = 0;
        car2.controls();
    } else {
        count2++;
        if (count2 == 900) {
            if (car2.body.position.y < 350) {
                Matter.Body.setPosition(car2.body, {
                    x: car2.body.position.x,
                    y: car2.body.position.y + 600
                });
                Matter.Body.applyForce(car2.body, {
                    x: car2.body.position.x,
                    y: car2.body.position.y
                }, {
                    x: 0,
                    y: -0.05
                });
            } else {
                Matter.Body.setPosition(car2.body, {
                    x: car2.body.position.x,
                    y: car2.body.position.y - 600
                });
                Matter.Body.applyForce(car2.body, {
                    x: car2.body.position.x,
                    y: car2.body.position.y
                }, {
                    x: 0,
                    y: 0.05
                });
            }
        }
    }
    if (info) {
        car1.show();
        car2.show();
        info = false;
    } else {
        car2.show();
        car1.show();
        info = true;
    }
    if ((scoreBoard.score1 < 5) && (scoreBoard.score2 < 5)) {
        if (buttonPressed(scoreButton1) && scoreButton1.status) {
            scoreBoard.score1++;
            scoreButton1.color = 'pink';
            scoreButton1.status = false;
        }
        if (buttonPressed(scoreButton2) && scoreButton2.status) {
            scoreBoard.score2++;
            scoreButton2.color = 'pink';
            scoreButton2.status = false;
        }
    } else {
        push();
        strokeWeight(1);
        textSize(50);
        if (scoreBoard.score1 >= 5) {
            stroke('red');
            text('RED wins!', 620, 338);
        } else {
            stroke('blue');
            text('BLUE wins!', 620, 338);
        }
        text('Refresh to play again.', 510, 388);
        pop();
    }
    if (buttonPressed(resetButton1)) {
        scoreButton1.color = 'green';
        scoreButton1.status = true;
    }
    if (buttonPressed(resetButton2)) {
        scoreButton2.color = 'green';
        scoreButton2.status = true;
    } /* drawpoints(); */
}
class ScoreBoard {
    constructor(score1, score2) {
        this.score1 = score1;
        this.score2 = score2;
    }
    show() {
        push();
        stroke('black');
        strokeWeight(4);
        textSize(80);
        text('-', 735, 125);
        stroke('red');
        text(this.score1, 629, 125);
        stroke('blue');
        text(this.score2, 829, 125);
        pop();
    }
}
class Button {
    constructor(x, y, color, angle, status, xPress, yPress) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = angle;
        this.status = status;
        this.xPress = xPress;
        this.yPress = yPress;
    }
    show() {
        push();
        noStroke();
        fill(this.color);
        translate(this.x, this.y);
        rotate(this.angle);
        rect(0, 0, 35, 15, 1, 1, 10, 10);
        pop();
    }
}
class Car {
    constructor(x, y, color, angle, up, down, left, right) {
        this.body = Matter.Bodies.rectangle(x, y, 100, 50, {
            density: 0.0005,
            frictionAir: 0.06,
            restitution: 0.3,
            friction: 0.01
        });
        Matter.World.add(engine.world, this.body);
        this.body.position.x = x;
        this.body.position.y = y;
        this.color = color;
        Matter.Body.setAngle(this.body, angle);
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }
    controls() {
        if (keyIsDown(this.up)) {
            /* this.body.position.x += cos(this.body.angle)*5; */ /* this.body.position.y += sin(this.body.angle)*5; */
            Matter.Body.applyForce(this.body, {
                x: this.body.position.x,
                y: this.body.position.y
            }, {
                x: cos(this.body.angle) / 450,
                y: sin(this.body.angle) / 450
            });
        }
        if (keyIsDown(this.down)) {
            /* this.body.position.x -= cos(this.body.angle)*4; */ /* this.body.position.y -= sin(this.body.angle)*4; */
            Matter.Body.applyForce(this.body, {
                x: this.body.position.x,
                y: this.body.position.y
            }, {
                x: -cos(this.body.angle) / 450,
                y: -sin(this.body.angle) / 450
            });
        }
        if (keyIsDown(this.up) && keyIsDown(this.right)) {
            /* this.body.angle += 2; */
            Matter.Body.setAngle(this.body, this.body.angle + 2);
        }
        if (keyIsDown(this.up) && keyIsDown(this.left)) {
            /* this.body.angle -= 2; */
            Matter.Body.setAngle(this.body, this.body.angle - 2);
        }
        if (keyIsDown(this.down) && keyIsDown(this.right)) {
            /* this.body.angle -= 3; */
            Matter.Body.setAngle(this.body, this.body.angle - 3);
        }
        if (keyIsDown(this.down) && keyIsDown(this.left)) {
            /* this.body.angle += 3; */
            Matter.Body.setAngle(this.body, this.body.angle + 3);
        }
    }
    show() {
        push();
        strokeWeight(4);
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle); /* rect(0, 0, 100, 50, 0, 15, 15, 0); */
        noStroke();
        fill(this.color);
        rect(0, 0, 97, 48, 5, 15, 15, 5);
        fill(255, 255, 102);
        rect(45, 15, 6, 10, 2, 2, 2, 2);
        rect(45, -15, 6, 10, 2, 2, 2, 2);
        fill(64, 64, 64);
        rect(25, 22, 20, 10, 2, 2, 2, 2);
        rect(25, -22, 20, 10, 2, 2, 2, 2);
        rect(-25, 22, 20, 10, 2, 2, 2, 2);
        rect(-25, -22, 20, 10, 2, 2, 2, 2);
        fill(65, 105, 225);
        rect(-42, 0, 12, 40, 2, 5, 5, 2);
        noFill();
        stroke(0);
        strokeWeight(1);
        rect(0, 0, 67, 27);
        pop();
    }
}

function outMap(car) {
    if (car.body.position.x < 570) {
        return dist(car.body.position.x, car.body.position.y, 310, 350) > 300;
    } else if (car.body.position.x > 921) {
        return dist(car.body.position.x, car.body.position.y, 1182, 350) > 300;
    }
}

function buttonPressed(button) {
    function carCheck(car) {
        let edge = [{
            x: car.body.position.x + cos(car.body.angle) * 50 + cos(90 - car.body.angle) * 25,
            y: car.body.position.y + sin(car.body.angle) * 50 - sin(90 - car.body.angle) * 25
        }, {
            x: car.body.position.x + cos(car.body.angle) * 50 - cos(90 - car.body.angle) * 25,
            y: car.body.position.y + sin(car.body.angle) * 50 + sin(90 - car.body.angle) * 25
        }, {
            x: car.body.position.x - cos(car.body.angle) * 50 - cos(90 - car.body.angle) * 25,
            y: car.body.position.y - sin(car.body.angle) * 50 + sin(90 - car.body.angle) * 25
        }, {
            x: car.body.position.x - cos(car.body.angle) * 50 + cos(90 - car.body.angle) * 25,
            y: car.body.position.y - sin(car.body.angle) * 50 - sin(90 - car.body.angle) * 25
        }];
        let side = [{
            x: car.body.position.x + cos(car.body.angle) * 50,
            y: car.body.position.y + sin(car.body.angle) * 50
        }, {
            x: car.body.position.x - cos(car.body.angle) * 50,
            y: car.body.position.y - sin(car.body.angle) * 50
        }, {
            x: car.body.position.x - cos(90 + car.body.angle) * 25,
            y: car.body.position.y - sin(90 + car.body.angle) * 25
        }, {
            x: car.body.position.x + cos(90 + car.body.angle) * 25,
            y: car.body.position.y + sin(90 + car.body.angle) * 25
        }];
        let b = false;
        for (let i = 0; i < 4; i++) {
            b = b || (dist(edge[i].x, edge[i].y, button.xPress, button.yPress) < 10) || (dist(side[i].x, side[i].y, button.xPress, button.yPress) < 10);
        }
        return b;
    }
    return carCheck(car1) || carCheck(car2);
} /* function drawpoints(){let edge = [{x:car1.body.position.x + cos(car1.body.angle) * 50 + cos(90 - car1.body.angle) * 25, y:car1.body.position.y + sin(car1.body.angle) * 50 - sin(90 - car1.body.angle) * 25},{x:car1.body.position.x + cos(car1.body.angle) * 50 - cos(90 - car1.body.angle) * 25, y:car1.body.position.y + sin(car1.body.angle) * 50 + sin(90 - car1.body.angle) * 25},{x:car1.body.position.x - cos(car1.body.angle) * 50 - cos(90 - car1.body.angle) * 25, y:car1.body.position.y - sin(car1.body.angle) * 50 + sin(90 - car1.body.angle) * 25},{x:car1.body.position.x - cos(car1.body.angle) * 50 + cos(90 - car1.body.angle) * 25, y:car1.body.position.y - sin(car1.body.angle) * 50 - sin(90 - car1.body.angle) * 25}];let side = [{x:car2.body.position.x + cos(car2.body.angle) * 50, y:car2.body.position.y + sin(car2.body.angle) * 50},{x:car2.body.position.x - cos(car2.body.angle) * 50, y:car2.body.position.y - sin(car2.body.angle) * 50},{x:car2.body.position.x - cos(90 + car2.body.angle) * 25, y:car2.body.position.y - sin(90 + car2.body.angle) * 25},{x:car2.body.position.x + cos(90 + car2.body.angle) * 25, y:car2.body.position.y + sin(90 + car2.body.angle) * 25}];push();stroke('purple');strokeWeight(10);point(edge[0].x, edge[0].y);point(edge[1].x, edge[1].y);point(side[0].x, side[0].y);point(side[1].x, side[1].y);stroke('green');point(edge[2].x, edge[2].y);point(edge[3].x, edge[3].y);point(side[2].x, side[2].y);point(side[3].x, side[3].y);pop();} */
function drawPhysRing() {
    /* left cercle */
    let j = 0;
    beginShape();
    for (let i = 30; i < 330; i++) {
        let x = 350 * cos(i) + 310;
        let y = 350 * sin(i) + 350;
        if (!((i >= 65) && (i <= 115)) && !((i >= 245) && (i <= 295))) {
            ring.push(Matter.Bodies.circle(x, y, 50, {
                isStatic: true
            }));
            Matter.World.add(engine.world, ring[j]);
            j++;
        }
    }
    endShape(); /* upper cercle */
    beginShape();
    for (let i = 44; i < 137; i++) {
        let x = 200 * cos(i) + 746;
        let y = 291 * sin(i) - 50;
        ring.push(Matter.Bodies.circle(x, y, 50, {
            isStatic: true
        }));
        Matter.World.add(engine.world, ring[j]);
        j++;
    }
    endShape(); /* lower cercle */
    beginShape();
    for (let i = 224; i < 317; i++) {
        let x = 200 * cos(i) + 746;
        let y = 291 * sin(i) + 750;
        ring.push(Matter.Bodies.circle(x, y, 50, {
            isStatic: true
        }));
        Matter.World.add(engine.world, ring[j]);
        j++;
    }
    endShape(); /* right cercle */
    beginShape();
    for (let i = 0; i < 150; i++) {
        let x = 350 * cos(i) + 1182;
        let y = 350 * sin(i) + 350;
        if (!((i >= 65) && (i <= 115))) {
            ring.push(Matter.Bodies.circle(x, y, 50, {
                isStatic: true
            }));
            Matter.World.add(engine.world, ring[j]);
            j++;
        }
    }
    endShape();
    beginShape();
    for (let i = 210; i <= 360; i++) {
        let x = 350 * cos(i) + 1182;
        let y = 350 * sin(i) + 350;
        if (!((i >= 245) && (i <= 295))) {
            ring.push(Matter.Bodies.circle(x, y, 50, {
                isStatic: true
            }));
            Matter.World.add(engine.world, ring[j]);
            j++;
        }
    }
    endShape();
}

function drawRing() {
    strokeWeight(8); /* left cercle */
    let j = 0;
    beginShape();
    for (let i = 30; i < 330; i++) {
        let x = 300 * cos(i) + 310;
        let y = 300 * sin(i) + 350;
        vertex(x, y);
    }
    endShape(); /* upper cercle */
    beginShape();
    for (let i = 44; i < 137; i++) {
        let x = 250 * cos(i) + 746;
        let y = 350 * sin(i) - 50;
        vertex(x, y);
    }
    endShape(); /* lower cercle */
    beginShape();
    for (let i = 224; i < 317; i++) {
        let x = 250 * cos(i) + 746;
        let y = 350 * sin(i) + 750;
        vertex(x, y);
    }
    endShape(); /* right cercle */
    beginShape();
    for (let i = 0; i < 150; i++) {
        let x = 300 * cos(i) + 1182;
        let y = 300 * sin(i) + 350;
        vertex(x, y);
    }
    endShape();
    beginShape();
    for (let i = 210; i <= 360; i++) {
        let x = 300 * cos(i) + 1182;
        let y = 300 * sin(i) + 350;
        vertex(x, y);
    }
    endShape();
    push();
    noStroke();
    fill(112, 128, 144);
    for (let i = 250; i <= 290; i++) {
        let x = 288 * cos(i) + 310;
        let y = 288 * sin(i) + 350;
        push();
        translate(x, y);
        rotate(i);
        rect(0, 0, 30, 15);
        pop();
    }
    for (let i = 70; i <= 110; i++) {
        let x = 288 * cos(i) + 310;
        let y = 288 * sin(i) + 350;
        push();
        translate(x, y);
        rotate(i);
        rect(0, 0, 30, 15);
        pop();
    }
    for (let i = 250; i <= 290; i++) {
        let x = 288 * cos(i) + 1182;
        let y = 288 * sin(i) + 350;
        push();
        translate(x, y);
        rotate(i);
        rect(0, 0, 30, 15);
        pop();
    }
    for (let i = 70; i <= 110; i++) {
        let x = 288 * cos(i) + 1182;
        let y = 288 * sin(i) + 350;
        push();
        translate(x, y);
        rotate(i);
        rect(0, 0, 30, 15);
        pop();
    }
    pop();
}
