let cvs = document.querySelector("#flappybird");
let ctx = cvs.getContext("2d");

let bird = document.createElement('img');
bird.src = "images/bird.png";

let bg = document.createElement('img');
bg.src = "images/bg.png";
ctx.drawImage(bg, 0, 0);

let pipeUp = document.createElement('img');
pipeUp.src = "images/pipeUp.png";

let pipeBottom = document.createElement('img');
pipeBottom.src = "images/pipeBottom.png";

let fg = document.createElement('img');
fg.src = "images/fg.png";

let xPos = 50; 
let yPos = 250;

let gap = 110;

let x = cvs.width;
let y = 0;

let pipes_x = [cvs.width, cvs.width + 250];
let pipes_y = [0, -100];

let grav = 0.3;
let change = 5;

let score = 0;

window.addEventListener("click", function(){
    change = 5;
    bird.src = "images/bird_up.png"
})

function draw( ){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bird, xPos, yPos);

    yPos -= change;
    change -= grav;

    if(change < 2)
    {
        bird.crs = "images/bird.png"
    }
    if(change < -3)
    {
        bird.src = "images/bird_down.png"
    }

    for (i = 0; i < pipes_x.length; i++) {
    ctx.drawImage(pipeUp, pipes_x[i], pipes_y[i]);
    ctx.drawImage(pipeBottom, pipes_x[i], pipes_y[i] + pipeUp.height + gap)
    pipes_x[i] -= 2;
    if (pipes_x[i] == xPos){
        pipes_x.push(pipes_x[pipes_x.length - 1] + 250)
        pipes_y.push(Math.floor(Math.random() * pipeUp.height) - pipeUp.height)
    }

    if(pipes_x[i] + pipeUp.width == xPos + bird.width)
    {
        score += 1;
    }

    if (xPos + bird.width >= pipes_x[i] && xPos <= pipes_x[i] + pipeUp.width
        &&(yPos <= pipes_y[i] + pipeUp.height || yPos + bird.height >= pipes_y[i]
         + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height)
    {
        pipes_x = [cvs.width];
        pipes_y = [0];
        score = 0;
        xPos = 50;
        yPos = 250;
        change = 5;
    }
    }
     ctx.drawImage(fg, 0, cvs.height - fg.height);
    
     ctx.fillStyle = "#000";
     ctx.font = "30px Arial";
     ctx.fillText("Score: " + score, 20, cvs.height - 35)

    setTimeout(() => {
    requestAnimationFrame(draw);
    }, 1000 / 60);
 }
 
draw();