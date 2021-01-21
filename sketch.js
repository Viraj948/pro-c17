


var monkey, monkey_running, monkey_collide;
var banana, bananaImage, Obstacle, ObstacleImage, obstacle1;
var FoodGroup, ObstaclesGroup;
var score;
var ground, inviground, groundimage;

function preload(){


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
 monkey_collide=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  ObstacleImage = loadImage("obstacle.png");

}



function setup() {
  //createCanvas=(600,600)
  
  var survivalTime=0;

  //create Monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collide",monkey_collide)
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  inviground = createSprite(100, 190, 400, 10);
  inviground.visible = false;      
  monkey.setCollider("rectangle", 0, 0, 400, monkey.height);
  monkey.debug = true;
 
  
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
  
score = 0;
}


function draw() {
  background(255);
  if(ground.x<0){
ground.x=ground.width/2;
  }
   if (keyDown("space")) {
    monkey.velocityY = -12;   

  }

  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
if(ObstaclesGroup.isTouching(monkey)){
  ground.velocityX=0;
  monkey.velocityY=0;
  survivalTime=0;
monkey.changeAnimation("collide",monkey_collide)
   ObstaclesGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   ObstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
}
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,100,50);
}
function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
monkey.depth = banana.depth + 1;
   
    banana.addImage(bananaImage)
    banana.scale=0.05;
    FoodGroup.add(banana);

    
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var Obstacle = createSprite(800, 320, 10, 40);
    Obstacle.velocityX = -(6 + score / 100);
 Obstacle.setCollider("rectangle",0,0,300,200)
 Obstacle.addImage(ObstacleImage);
 Obstacle.scale=0.15;
 Obstacle.lifeTime=300;
 ObstaclesGroup.add(Obstacle)
  }

}