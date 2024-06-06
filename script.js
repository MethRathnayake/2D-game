function controller(event){
    if(event.key == "Enter"){
        if(runworker == 0){
            run(); 
            runSound.play();
            scoreUpdate();
            backgroundMove();
            flameMarginLeft.forEach(createFlame);
        }
    }
    if(event.key == " "){
        if(jumpworker == 0){
            if(runworker != 0){
            clearInterval(runworker)
            runSound.pause();
            jump();
            jumpSound.play();
            
            }
            
        }
    }
   
}

var runimage = 1;
var runworker = 0;
var runSound = new Audio("img/run.mp3");
runSound.loop = true;
function run(){
  runworker = setInterval(()=>{
            runimage++;

            if (runimage == 9){
                runimage = 1;
            }

            document.getElementById("boy").src = "img/run" + runimage + ".png"

        },100);
   
}

var jumpimage = 1;
var jumpworker = 0;
var margintop = 385;
var jumpSound = new Audio("img/jump.mp3");
function jump() {
    jumpworker = setInterval(()=>{
        jumpimage++;
        if (jumpimage<8){
            margintop = margintop-17;
            document.getElementById("boy").style.marginTop = margintop + "px";
        }
        if (jumpimage>7){
            margintop = margintop+17;
            document.getElementById("boy").style.marginTop = margintop + "px";
        }
        if(jumpimage== 13){
            jumpimage = 1;
            clearInterval(jumpworker);
            run();
            runSound.play();
            jumpworker=0;
        }

        document.getElementById("boy").src = "img/jump" + jumpimage + ".png"
    },100);

}

var scoreWorker = 0;
var score = 0;
function scoreUpdate(){
    scoreWorker = setInterval(()=>{
        score +=10;
        if(score == 1680){
            
            document.getElementById("youwin").innerHTML = `<div class="youwin"></div>` ;
            setTimeout(()=>{alert("You Win!!!");window.location.reload();},1000);
            
                clearInterval(runworker);
                clearInterval(scoreWorker);
                clearInterval(backgroundworker);
                clearInterval(flameWorker);
                document.getElementById("boy").style.display = 'none';
           
        }

    document.getElementById("score").innerHTML = score;
    },120)

    
    
}

var backgroundworker = 0;
var backgroundX = 0;
function backgroundMove(){
    backgroundworker = setInterval(()=>{
        backgroundX-=1;
        document.getElementById("background").style.backgroundPositionX = backgroundX + "px";
    
        },10);
    
}

var deadImage = 1;
var deadWorker = 0;
var deadSound = new Audio("img/dead.mp3");

function dead(){

    deadWorker = setInterval(()=>{
        deadImage++;
        if (deadImage == 11){
           

            document.getElementById("gameover").innerHTML = `<div class="gameover"></div>` 
            document.getElementById("score").style.marginTop = 550 + "px";
            document.getElementById("score").style.marginLeft = 600 + "px";
            document.getElementById("score").innerHTML = "Your Score : "+score;
            document.getElementById("boy").src = "img/dead" + 10 + ".png";
            setTimeout(()=>{alert("Game over");window.location.reload();},1000)
            
            clearInterval(deadWorker);
        }
        
        document.getElementById("boy").src = "img/dead" + deadImage + ".png";
    
    },150);


    
   
}

var flameMarginLeft = [1000,1500,2000,2500,3000,3400,3800,4100];
var flameWorker = 0;
function createFlame(x){
    var f = document.createElement("img");
    f.src = "img/flame.gif";
    f.className = "flame";
    f.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(f);

    flameWorker = setInterval(()=>{
       
        if(flameWorker != 0){
            x-=2;
            f.style.marginLeft = x + "px";
        }

        if(x == 180){
            if(jumpworker == 0){
                clearInterval(runworker);
                clearInterval(scoreWorker);
                clearInterval(backgroundworker);
                clearInterval(flameWorker);
                flameWorker = 0;

                runSound.pause();
                dead();
                deadSound.play();
                
                
            }
        }
    },10)
}





