var block1, block2, block3, block4, block5, block6, block7
var alien, alienLeftRunner, alienRightRunner, alienImage, alienWalkingLeftImage, alienWalkingRightImage, alienJumpingLeftImage, alienJumpingRightImage
var backgroundImage, backgr0und
var rocket, rocketImage, rocketGroup
var gameState
var gravity
var lives

function preload() {
    backgroundImage = loadImage("Background.jpg");
    //alienWalkingImage = loadAnimation();
    alienImage = loadImage("alien.png");
    alienWalkingLeftImage = loadAnimation("alienWalkLeft1.png", "alienWalkLeft2.png");
    alienWalkingRightImage = loadAnimation("alienWalkRight1.png", "alienWalkRight2.png");
    alienJumpingLeftImage = loadImage("alienJumpLeft.png");
    alienJumpingRightImage = loadImage("alienJumpRight.png");
    rocketImage = loadImage("Rocket.png");
}

function setup() {
    createCanvas(1200, 700)
    backgr0und = createSprite(600, 350, 1200, 700);
    backgr0und.addImage(backgroundImage)
    backgr0und.scale = 2.5
    block1 = createSprite(600, 700, 1500,20);
    block1.shapeColor = "grey"
    block2 = createSprite(500, 500, 1000, 20);
    block2.shapeColor = "grey"
    block3 = createSprite(250, 655, 50, 75);
    block3.shapeColor = "grey"
    block4 = createSprite(460, 655, 50, 75);
    block4.shapeColor = "grey"
    block5 = createSprite(670, 655, 50, 75);
    block5.shapeColor = "grey"
    block6 = createSprite(880, 655, 50, 75);
    block6.shapeColor = "grey"
    block7 = createSprite(1140, 655, 150, 75);
    block7.shapeColor = "grey"
    alien = createSprite(100, 650, 30, 50);
    //alien.addImage(alienImage);
    alien.scale = 0.6

    alienLeftRunner = createSprite(100, 6500, 30, 50);
    alienLeftRunner.scale = 0.6

    alienRightRunner = createSprite(100, 6500, 30, 50);
    alienRightRunner.scale = 0.6

    gameState = "play"

    rocketGroup = createGroup();
    gravity = 1
    lives = 3
}

function draw() {
    background(0);
    if (gameState === "play") {
        alien.addImage(alienImage);
        alienLeftRunner.addAnimation("cat", alienWalkingLeftImage);
        alienRightRunner.addAnimation("cat2", alienWalkingRightImage);
        alien.velocityY = alien.velocityY+1

        if (keyDown(LEFT_ARROW)) {
            alien.x = alien.x - 7
            alienLeftRunner.x = alien.x
            alienLeftRunner.y = alien.y
        }

        if (keyWentUp(LEFT_ARROW)) {
            alienLeftRunner.x = 100
            alienLeftRunner.y = 6500
        }

        if (keyDown(RIGHT_ARROW)) {
            alien.x = alien.x + 7
            alienRightRunner.x = alien.x
            alienRightRunner.y = alien.y
        }

        if (keyWentUp(RIGHT_ARROW)) {
            alienRightRunner.x = 100
            alienRightRunner.y = 6500
        }

        if (keyDown(UP_ARROW)) {
            alien.velocityY = -12 + gravity
            //alien.addImage(alienJumpingImage);
            gravity = gravity + 0.5
            if (alien.isTouching(block1) && alien.y > 500) {
                gravity = 1
            }
            if (alien.isTouching(block2) && alien.y < 500) {
                gravity = 1
            }
            if (alien.isTouching(block7) && alien.y < 620) {
                gravity = 1
            }
            if (keyDown(LEFT_ARROW)) {
                alien.addImage(alienJumpingLeftImage);
            }
            if (keyDown(RIGHT_ARROW)) {
                alien.addImage(alienJumpingRightImage);
            }
        }
        if (keyWentUp(UP_ARROW)) {
            alien.velocityY = 0
        }

        spawnRocket();

        alien.collide(block1);
        alien.collide(block2);
        alien.collide(block3);
        alien.collide(block4);
        alien.collide(block5);
        alien.collide(block6);
        alien.collide(block7);

        if (alien.isTouching(rocketGroup)) {
            lives = lives - 1
            rocketGroup.destroyEach();
        }

        if (lives === 0) {
            rocketGroup.destroyEach();
            gameState = "end"
        }

        drawSprites();

        fill("black");
        textSize(20);
        text("Lives left: " + lives, 200, 100)
    }

    if (gameState === "end") {
        background(0);
        rocketGroup.setVelocityXEach(0);
        stroke("white");
        strokeWeight(4);
        fill("black");
        textSize(50);
        text("Game Over", 500, 300);
        alienLeftRunner.x = 100
        alienLeftRunner.y = 6500
        alienRightRunner.x = 100
        alienRightRunner.y = 6500
        
        text("Press R to try again", 400, 400);
        if (keyCode === 82) {
            reset();
        }
    }
}

function spawnRocket() {
    if (frameCount % 100 === 0) {
        rocket = createSprite(1250, 560, 50, 40);
        rocket.velocityX = -9;
        rocket.addImage(rocketImage);
        rocket.scale = 0.5
        rocket.lifetime=300
        rocket.setCollider("rectangle", 0, 0, 450, 180);
        rocketGroup.add(rocket);
    }
}

function reset() {
    rocketGroup.destroyEach();
    gameState = "play"
    rocketGroup.setVelocityXEach(-9);
    lives = 3
    alien.x = 100
    alien.y = 650
    rocketGroup.setVelocityXEach(-5);
}