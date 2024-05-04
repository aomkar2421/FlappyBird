//Board
let board;
let boardheight = 640;
let boardwidth = 360;
let context;

//Bird
let birdheight = 24;
let birdwidth = 34;
let birdx = boardwidth / 8;
let birdy = boardheight / 2;
let birdImg;

let bird = {
    x: birdx,
    y: birdy,
    width: birdwidth,
    height: birdheight,
};

//pipe
let pipeArray= [];
let pipewidth=64;
let pipeheight=512;
let pipeX=boardwidth;
let pipeY=0;

let topPipeImg;
let bottomPipeImg;

let velocityX=-2;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

//    context.fillStyle = 'green';
//    context.fillRect(bird.x, bird.y, bird.width, bird.height);

//     //draw bird img

    birdImg=new Image();
    birdImg.src="./flappybird.png";
    birdImg.onload=function(){
    context.drawImage(birdImg,bird.x,bird.y,birdwidth,birdheight)
}
    topPipeImg=new Image();
    topPipeImg.src="./topPipeImg.png";

    bottomPipeImg=new Image();
    bottomPipeImg.src="./bottomPipeImg.png";

    requestAnimationFrame(update);
    setInterval(placePipes,1500)

}

//update
function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);
    //bird
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

    //pipe
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x+=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height)
        
    }

}

function placePipes(){
   let topPipe={
    img:topPipeImg,
    x:pipeX,
    y:pipeY,
    width:pipewidth,
    height:pipeheight,
    passed:false

    }
    pipeArray.push(topPipe);
}