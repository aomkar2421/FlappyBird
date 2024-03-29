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

//Pipe
let pipeArray = [];
let pipeheight = 512;
let pipewidth = 64;
let pipex = boardwidth;
let pipey = 0;

let topPipeImage;
let bottomPipeImage;

//Physics
let velocityx = -2;
let velocityy = 0;
let gravity = 0.3;

let gameOver = false;
let score = 0;


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    // context.fillStyle = 'green';
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImage = new Image();
    topPipeImage.src = "./toppipe.png";

    bottomPipeImage = new Image();
    bottomPipeImage.src = "./bottompipe.png";

    // requestAnimationFrame(update);
    // setInterval(placePipes, 1500);
    // document.addEventListener("keydown", moveBird);

    setTimeout(() => {
        requestAnimationFrame(update);
        setInterval(placePipes, 1500);
        document.addEventListener("keydown", moveBird);
    }, 1500);
};

function update() {
    // setTimeout(() => {

    // }, 20000);

    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //Bird
    velocityy += gravity;
    // bird.y += velocityy; //decides bird fly velocity gravity added to make it fly down
    bird.y = Math.max(bird.y + velocityy, 0); //limits bird fly
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //Pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityx;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //clear Pipes
    while (pipeArray.length > 0 && pipeArray[0].x < 0 - pipewidth) {
        pipeArray.shift();
    }

    // score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }
    let randomPipeY = pipey - pipeheight / 4 - Math.random() * (pipeheight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImage,
        x: pipex,
        y: randomPipeY,
        width: pipewidth,
        height: pipeheight,
        passed: false,
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImage,
        x: pipex,
        y: randomPipeY + pipeheight + openingSpace,
        width: pipewidth,
        height: pipeheight,
        passed: false,
    };
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "space" || e.code == "ArrowUp") {
        velocityy = -6;
    }

    if (gameOver) {
        setTimeout(() => {
            bird.y = birdy;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }, 1000);
    }
}

function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
