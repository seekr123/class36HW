var dog,dogIMG,happydogIMG,milk,milkImg;
var database,foodS,foodStock;
var btnFeed,btnAddFeed,addFeed,foodObj;
var fedTime,lastFed;
var gameState,readState;
var bedroom,washroom,garden;
var currentTime=hour();

function preload()
{
  dogIMG=loadImage('images/dogImg.png');
  happydogIMG=loadImage('images/dogImg1.png');
  bedroom=loadImage('virtual pet images/Bed Room.png')
  washroom=loadImage('virtual pet images/Wash Room.png')
  garden=loadImage('virtual pet images/Garden.png')
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250, 250, 10,10);
  dog.addImage(dogIMG);
  dog.scale=0.2;

  foodObj=new Food()
  
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  btnFeed=createButton('Feed the Dog');
  btnFeed.mousePressed(feedDog);
  btnFeed.position(600,100);

  btnAddFeed=createButton('Add feed');
  btnAddFeed.mousePressed(addFood);
  btnAddFeed.position(800,100);

  database.ref('fedTime').on('value',data=>{
    lastFed=data.val();
  })

  database.ref('gameState').on('value',data=>{
    gameState=data.val();
  })



}


function draw() {  

  background(46, 139, 87); 

 

  if (lastFed>=12){
    text('last Feed: '+lastFed % 12 +' PM',350,30);
  }
  else if(lastFed==0){
    text('last Feed: 12 AM ', 350,30);
  }
  else{
    text('last Feed: '+ lastFed+'AM',350,30);
  }
  //add styles here
  foodObj.display();

  if (gameState!='Hungry'){
    btnFeed.hide();
    btnAddFeed.hide();
    dog.remove();
  }
  else{
    btnFeed.show()
    btnAddFeed.show();
    dog.addImage(dogIMG);
  }

  if (currentTime==lastFed+1){
    foodObj.garden();
    update("Playing");
  }
  else if(currentTime>=(lastFed+2) && currentTime<=(lastFed+4)){
    foodObj.washroom();
    update('Bathing');
  }
  else{
    foodObj.display();
    update('Hungry')
  }

  drawSprites();
  
  fill (138,46,98);
  stroke (4);
  text ('food left : '+foodS,100,200)
  textSize (14);
  text('Tip: press the up arrow to feed Rex',20,30)

  



}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  }

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').set({
    Food:x
  })
  
}
function addFood(){

  if(foodS<30){

    database.ref('/').update({
      'Food':foodS+1
    })

  }

  
}
function feedDog(){
  var foodDed=foodS-1;  
  dog.addImage(happydogIMG)
  database.ref('/').update({
    Food:foodDed,
    fedTime: hour()
  })
}
function update(state){
database.ref('/').update({
  gameState:state
})
}