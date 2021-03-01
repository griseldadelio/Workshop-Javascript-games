let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// cargar imagenes

let bird = new Image();
let bg = new Image();
let base = new Image();
let pipeDown = new Image();
let pipeUp = new Image();

bird.src = './img/redbird-downflap.png';
bg.src = './img/background-day.png';
base.src = './img/base.png';
pipeUp.src = './img/pipeDown.png';
pipeDown.src = './img/pipeUp.png';


//variables

let gap = 85;
let constant;
let bX = 10;
let bY = 150;
let gravity = 1.5;
let score = 0;

// audios files

let fly = new Audio();
let scor = new Audio();

fly.src = './audio/wing.ogg';
scor.src = './audio/point.ogg';

// on key down

const moveUp = () => {
  bY -= 25;
  fly.play()
}
document.addEventListener("keydown", moveUp);

// pipe 

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// dibujar imagenes

const draw = () => {

  ctx.drawImage(bg, 0, 0);


  for (let i = 0; i < pipe.length; i++) {

    constant = pipeUp.height + gap;
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    // detectar choque

    if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeUp.width && (bY <= pipe[i].y + pipeUp.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - base.height) {
      location.reload(); // recargar pagina
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(base, 0, cvs.height - base.height);
  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}
draw();