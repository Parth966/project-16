var path, mainCyclist;
var player1, player2, player3;
var pathImg, mainRacerImg1, mainRacerImg2;
var obs1,obs_1,obs2,obs_2,obs3,obs_3
var oppPink1Img, oppPink2Img;
var oppYellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;
var gameOverImg, cycleBell;
var mhgroup,cgroup,ngroup

var pinkCG, yellowCG, redCG;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload() {
  obs_1 = loadImage("/images/obstacle1.png");
  obs_2 = loadImage("/images/obstacle2.png");
  obs_3 = loadImage("/images/obstacle3.png");
  pathImg = loadImage("images/Road.png");

  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");

  oppPink1Img = loadAnimation("images/opponent1.png", "images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");

  oppYellow1Img = loadAnimation("images/opponent4.png", "images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");

  oppRed1Img = loadAnimation("images/opponent7.png", "images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");

  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {

  createCanvas(1200, 300);
  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;
  



  

  //creating boy running
  mainCyclist = createSprite(70, 150);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;
  mainCyclist.addAnimation("SahilFall",mainRacerImg2)


  //set collider for mainCyclist
  mainCyclist.debug = false
  mainCyclist.setCollider("rectangle", 0, 0, 100, 100)


  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  mhgroup = new Group();
  ngroup = new Group();
  cgroup = new Group();

}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 900, 30);

 
 // cgroup.collide(mainCyclist)
//  mhgroup.collide(mainCyclist)
//  ngroup.collide(mainCyclist)
  
  
  if (cgroup.isTouching(mainCyclist)){
    gameState = END;
    obs1.velocityX = 0;
    mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
  }
  
  
  if (mhgroup.isTouching(mainCyclist)){
    gameState = END;
    obs2.velocityX = 0;
    mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
  }
  
  
  if (ngroup.isTouching(mainCyclist)){
    gameState = END;
    obs3.velocityX = 0;
    mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
  }
  
  
  
  if (gameState == PLAY) {

    distance = distance + Math.round(getFrameRate() / 50);
    path.velocityX = -(6 + 2 * distance / 150);

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }

    //code to play cycle bell sound
    if (keyDown("space")) {
      cycleBell.play();
    }

    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1, 3));

    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();
      }
    }

    var select_obstacle = Math.round(random(1,3));
    if (World.frameCount % 100 == 0){
      if (select_obstacle == 1){
        cone_obstacle();
      } else if (select_obstacle == 2){
        manhole_obstacle();
      } else {
        nails_obstacle();
      }

    }

    if (pinkCG.isTouching(mainCyclist)) {
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1", oppPink2Img);
    }

    if (yellowCG.isTouching(mainCyclist)) {
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2", oppYellow2Img);
    }

    if (redCG.isTouching(mainCyclist)) {
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3", oppRed2Img);
    }
}
  if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    text("Press Up Arrow To Restart The Game!", 500, 200)


    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning", mainRacerImg1);

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);

    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    //write condition for calling reset( )
    if (keyDown("UP_ARROW")) {
      reset();
    }
  }
}

function cone_obstacle(){
  obs1 = createSprite(200,200,50,50)
  obs1.addImage("cone",obs_1)
  obs1.scale = 0.2
  obs1.velocityX = -5
  cgroup.add(obs1)
  
}


function manhole_obstacle(){
  obs2 = createSprite(400,200,50,50)
  obs2.addImage("manhole",obs_2)
  obs2.scale = 0.2
  obs2.velocityX = -5
  mhgroup.add(obs2)
}


function nails_obstacle(){
  obs3 = createSprite(600,200,50,50)
  obs3.addImage("nails",obs_3)
  obs3.scale = 0.2
  obs3.velocityX = -5
  ngroup.add(obs3)
}


function pinkCyclists() {
  player1 = createSprite(1100, Math.round(random(50, 250)));
  player1.scale = 0.06;
  player1.velocityX = -(6 + 2 * distance / 150);
  player1.addAnimation("opponentPlayer1", oppPink1Img);
  player1.setLifetime = 170;
  pinkCG.add(player1);
}

function yellowCyclists() {
  player2 = createSprite(1100, Math.round(random(50, 250)));
  player2.scale = 0.06;
  player2.velocityX = -(6 + 2 * distance / 150);
  player2.addAnimation("opponentPlayer2", oppYellow1Img);
  player2.setLifetime = 170;
  yellowCG.add(player2);
}

function redCyclists() {
  player3 = createSprite(1100, Math.round(random(50, 250)));
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2 * distance / 150);
  player3.addAnimation("opponentPlayer3", oppRed1Img);
  player3.setLifetime = 170;
  redCG.add(player3);
}

//create reset function here
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  distance = 0;
  mainCyclist.changeAnimation("sahilRunning", mainRacerImg1);
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
}