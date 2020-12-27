class Food{
    constructor(){
        this.foodStock=0
        this.lastFed;
        this.milkImg=loadImage('images/Milk.png');
    }

   
    
    

    getFoodStock(){
        database.ref('Food').on('value',function(data){
            this.foodStock=data.val();
        });
     }
     updateFoodStock(count){
        database.ref('/').update({
            Food:count
        })
     }
     

     display(){
         var x=80,y=100;
         imageMode (CENTER);
         image(this.milkImg,720,220,70,70);
         console.log(this.foodStock);
         
         if(this.foodStock!=0){
             for(var i=0;i<this.foodStock;i++){
                     if(i%10==0){
                     x=20;
                     y=y+50
                 }
                 image(this.milkImg,x,y,50,50);
                 x=x+20;
             }
         }       

     }
     bedroom(){
        background(bedroom,600,500);
    }
    washroom(){
        background(washroom,550,500)
    }
    garden(){
        background(garden,550,500)
    }

   
}
