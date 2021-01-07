//declaring the variables
var monkey, monkImg,sad_monkey;
var ground,jungle;
var groundImg,jungleImg;
var banana, bananaImg, bananaGroup;
var stone,stoneGroup;
var gameOver, restart, restartImg;
var score;
var PLAY =1;
var END= 0;
var gameState = PLAY;






function preload()
{
  jungleImg = loadImage("jungle.jpg");
  //groundImg = loadImage("ground.jpg");
  monkImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  
  restartImg = loadImage("restart.jpg");
  sad_monkey= loadAnimation("sad_monkey.jpg");
  
  
}
function setup() 
{
  createCanvas(600,600);
  
  jungle = createSprite(0,0,600,600);
  jungle.addAnimation("jungle",jungleImg);
  jungle.scale=1.0;
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;
  
  ground = createSprite(10,310,600,5);
  ground.visible = false;
  
  monkey = createSprite(70,250,10,10);
  monkey.addAnimation("running",monkImg);
  monkey.addAnimation("sad",sad_monkey);
  monkey.scale = 0.2;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
  restart  = createSprite(300,200,60,60);
  restart.addImage("restart",restartImg);
  restart.scale = 0.3;
  restart.visible = false;
  
}

function draw()
{
  //background("black");
  //console.log(monkey.y);
  if(gameState === PLAY)
  {
    
      if(jungle.x <= 200 )
        {
         jungle.x = jungle.width/2; 
        }

      if(keyDown("up") && monkey.y >= 120)
        {
          monkey.velocityY = -10;
        }
    monkey.velocityY = monkey.velocityY+0.8;

    spawnBanana();
    spawnStone();

    if(bananaGroup.isTouching(monkey))
      {
        bananaGroup.destroyEach();
        score = score +2;
        
        switch(score)
          {
            case 10: monkey.scale = 0.22;
                    break;
            case 20 : monkey.scale = 0.24;
                    break;
            case 30 : monkey.scale = 0.26;
                    break;
            case 40 : monkey.scale = 0.28;
                    break;
            default : break;
          }
      }

    if(stoneGroup.isTouching(monkey))
      {
        gameState = END;
      }
  }
    else if(gameState === END)
    {
      restart.visible = true;
      monkey.changeAnimation("sad");
      /*textSize(20);
      stroke(white);
      fill("white");
      text("GAME OVER",300,300);*/
      
        monkey.scale = 0.2;
        monkey.velocityY = 0;
      
        jungle.velocityX =0;
      
        stoneGroup.destroyEach();
        bananaGroup.destroyEach();
    
      if(mousePressedOver(restart)) 
      {
      reset();
    }
      }
  
  
  monkey.collide(ground);
  drawSprites();
  
  textSize(20);
  stroke("white");
  fill("white");
  strokeWeight(2);
  text("SCORE : "+score,400,50);

}

function spawnBanana()
{
  if(frameCount % 80 === 0)
  {
    banana = createSprite(Math.round(random(200,250)),Math.round(random(50,150)),10,10);
    banana.addImage("banana",bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    bananaGroup.add(banana);
    banana.lifetime = 100;
  }
}

function spawnStone()
{
  if(frameCount % 200 === 0){
    stone = createSprite(320,280,30,30);
   stone.addImage("stone",stoneImg);
   stone.scale = 0.15;
    stone.velocityX = -5
    stone.lifetime = 100;
    stoneGroup.add(stone);
    
  }
}

function reset()
{
  gameState = PLAY;
  restart.visible = false;
  monkey.changeAnimation("running",monkImg);
  jungle.velocityX = -4;
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
}