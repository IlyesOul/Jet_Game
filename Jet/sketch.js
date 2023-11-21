var wall, wall2, wall3;
var ballGroup1, ballGroup2;
var ball1, ball2;
var attempts = 0;
var player1, playerImg;
var timer = 60;
var gameState = 0;
var score = 0;
var score2 = 0;
var attempts2 = 0;
var name1 = window.prompt("What's player one's name (Don't put too long of a name): ");
var name2 = window.prompt("What's player two's name (Don't put too long of a name): ");

function preload() {
  playerImg = loadImage("spaceShip.png");
}

function setup() {
  createCanvas(1700, 785);

  attempts = 0;
  attempts2 = 0
  score = 0;
  score2 = 0;

  wall = createSprite(900, 700, 5, 1200);
  wall.shapeColor = "white"

  wall2 = createSprite(1690, 0, 5, 2000);
  wall2.shapeColor = "white"

  wall3 = createSprite(10, 0, 5, 2000);
  wall3.shapeColor = "white"

  player1 = createSprite(450, 750, 10, 35)
  player1.addImage(playerImg)
  player1.scale = .4
  player1.debug = false;
  player1.setCollider("circle", 0, 0, 80);

  player2 = createSprite(1250, 750, 10, 35)
  player2.addImage(playerImg)
  player2.scale = .4
  player2.debug = false;
  player2.setCollider("circle", 0, 0, 80);

  ballGroup1 = createGroup();
  ballGroup2 = createGroup();
}


function draw() {
  background(0);
  player1.collide(wall);
  player2.collide(wall);

  player1.collide(wall3);
  player2.collide(wall2);


  if (gameState === 1) {
    player1.visible = true;
    player2.visible = true;
    //timer stuff
    if (frameCount % 30 == 0 && timer > 0) {
      timer--;
    }
    textSize(55)
    text(timer, 1400, 200);
    if (timer == 0) {
      wall.height = 0;
      gameState = 2;
    }

    if (keyDown("W")) {
      player1.y = player1.y - 5
    }

    if (keyDown("S")) {
      player1.y = player1.y + 5
    }
    if (keyDown("D")) {
      player1.x = player1.x + 5
    }

    if (keyDown("A")) {
      player1.x = player1.x - 5
    }

    if (keyDown("UP")) {
      player2.y = player2.y - 5
    }

    if (keyDown("DOWN")) {
      player2.y = player2.y + 5
    }
    if (keyDown("RIGHT")) {
      player2.x = player2.x + 5
    }

    if (keyDown("LEFT")) {
      player2.x = player2.x - 5
    }

    if (ballGroup1.isTouching(player1) || (ballGroup2.isTouching(player1))) {
      attempts += 1;
      player1.x = 450;
      player1.y = 750;
    }

    if (ballGroup2.isTouching(player2)) {
      attempts2 += 1;
      player2.x = 1250;
      player2.y = 750;
    }


    if (player1.y == -30) {
      player1.x = 450;
      player1.y = 750;
      score = score + 1;
    }

    if (player2.y == -30) {
      player2.x = 1250;
      player2.y = 750;
      score2 = score2 + 1;
    }

    spawnBall1();
    spawnBall2();
    //Text commands
    textSize(25);
    textFont("Impact")
    text(name1 + "'s" + " attempts : " + attempts, 50, 70);
    text(name2 + "'s" + " attempts : " + attempts2, 950, 70);
    textSize(25);
    textFont("Impact")
    text(name1 + "'s" + " score : " + score, 500, 70);
    text(name2 + "'s" + " score : " + score2, 1400, 70);
  }
  else if (gameState == 2) {
    player1.visible = false;
    player2.visible = false;
    ballGroup1.destroyEach();
    ballGroup2.destroyEach();
    textSize(35);
    textFont("Roboto Mono")
    textAlign(LEFT)
    fill(255, 204, 0);
    if (score < score2) {
      text(name2 + " has won with a score " + score2 + " ! ", 500, 150);
    }

    if (score > score2) {
      text(name1 + " has won with a score " + score + " ! ", 500, 150);
    }

    if (score == score2) {
      text("A tie! " + score2 + " 1 ", 500, 150);
    }

    text("Press 'R' to try again!", 500, 300);
    if (keyDown("R")) {
      restarting();
    }
  }
  if (gameState == 0) {
    textSize(30);
    textFont("Impact")
    text("Press up and down for movement", 400, 60);
    text("Try to make it to the top with avoiding the debris, and beat your opponent", 400, 100);
    text("Try to get the least amount of attempts and the highest score possible before time runs out!", 400, 220);
    text("Press 'S' to start", 400, 270);

    if (keyDown("S")) {
      gameState = 1;
    }
  }

  drawSprites();
}

function spawnBall1() {
  if (frameCount % 4 === 0) {
    ball1 = createSprite(-100, 50, 20, 20);
    ball1.y = Math.round(random(0, 670));
    ball1.shapeColor = "red"
    ball1.velocityX = 10;
    ball1.lifetime = 100;
    ballGroup1.add(ball1)
  }
}

function spawnBall2() {
  if (frameCount % 4 === 0) {
    ball2 = createSprite(1900, 50, 20, 20);
    ball2.y = Math.round(random(0, 670));
    ball2.shapeColor = "red"
    ball2.velocityX = -10;
    ball2.lifetime = 100;
    ballGroup2.add(ball2)
  }
}

function restarting() {
  gameState = 1;
  timer = 60;
  wall.height = 1000;
  setup()
}