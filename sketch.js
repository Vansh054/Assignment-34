var dog, dog2;
var database;
var foodStock, foodS;

function preload()
{
  dog1 = loadImage("dogimg.png")
  dog2 = loadImage("dogimg1.png")
}

function setup() {
 	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,350)
  dog.addImage(dog1)
  dog.scale = 0.25
  button = createSprite(420,120,50,25)
  button.shapeColor = "red"
  foodStock = database.ref('food');
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87)

  if (keyWentDown(UP_ARROW))
  {
    writeStock(foodS)
    dog.addImage(dog2)
  }

  if (keyWentUp(UP_ARROW))
  {
    dog.addImage(dog1)
  }

  if (mousePressedOver(button) && foodS == 0)
  {
    addStock(foodS)
  }

  drawSprites();
  
  stroke("black")
  fill("black")
  textSize(20)
  text("Press Up Arrow To Feed Dog",130,50)

  stroke("white")
  fill("white")
  textSize(20)
  text("If You Have No Food Then  Click",90,125)

  stroke("white")
  fill("white")
  textSize(20)
  text("Food Remaning : " + foodS,160,200)
}

function readStock(data){
   foodS = data.val();
}

function writeStock(x){
  if (x <= 0)
  {
    x = 0
  } else {
    x = x - 1
  }
  database.ref('/').update({
    food:x
  })
}

function addStock(x){
    x = x + 50
  database.ref('/').update({
    food:x
  })
}


