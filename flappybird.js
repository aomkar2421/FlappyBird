let board ;
let boardheight = 640;
let boardwidth = 360;
let context;

let birdheight = 24;
let birdwidth = 34;
let birdx = boardwidth/8;
let birdy = boardheight/2;
let birdImg;

let bird = {
    x : birdx,
    y : birdy,
    width : birdwidth,
    height : birdheight
}

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    // context.fillStyle = 'green';
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    birdImg = new Image();
    birdImg.src = './flappybird.png';
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    requestAnimationFrame(update());
}

function update(){
    requestAnimationFrame(update());
    context.clearRect(0, 0, board.width, board.height);

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

}



