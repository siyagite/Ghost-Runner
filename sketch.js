var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var ghost, ghostImage;
var invisibleBlock,  invisibleBlockGroup;
var gameState = "play";
var spookySound;

function preload(){
 towerImage = loadImage ("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}


 function setup(){
   createCanvas(600,600);
   
   spookySound.loop();
   
   tower = createSprite(300,300);
   tower.addImage (towerImage);
   tower.velocityY = 1;
   
   doorsGroup = new Group();
   climbersGroup = new Group();
   invisibleBlockGroup = new Group();
   
   ghost = createSprite(200,200,50,50);
   ghost.addImage(ghostImage);
   ghost.scale = 0.3;
 }

 function draw(){
   background(0);
   
   if (gameState === "play"){
     
    
     
   if (tower.y>400){
     tower.y = 300;
   }
   
   if (keyDown("left")){
     ghost.x = ghost.x - 3;
   }
   
   if (keyDown("right")){
     ghost.x = ghost.x + 3;
   }
   
   if (keyDown("space")){
     ghost.velocityY = -5;
   }
   
   ghost.velocityY = ghost.velocityY + 0.8;
   
   if (climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
   }
   
   if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
     ghost.destroy();
     gameState = "end";
   }
   
    spawnDoors();
   
   
   
   
    drawSprites();
   }
   
   if (gameState === "end"){
     stroke("red");
     fill("blue");
     textSize(30);
     text("GAME OVER", 230, 250);
   }
 }
 

function spawnDoors(){
  if (frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth+= 1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}