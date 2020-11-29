var birdX = 180;
var birdY = 180;
var pipeSpace = 200;
var pipes = [];
var punkte = -1;
var gravity = 0.4;
var graviySpeed = 0;
var gameTimer;
var gameEnded = false;

$(document).ready(function () {
  gameTimer = setInterval(draw, 20);
  addPipe();
  setInterval(addPipe, 3600);
});

$(".inputValue").keydown(function (e) {
  if ((e.keyCode == 32 || e.keyCode == 13) && gameEnded == true) {
    location.reload();
  } else {
    clearInterval(gameTimer);
    graviySpeed = 0;
    if (e.keyCode == 32) {
      if (birdY < 535) {
        graviySpeed = -10;
      }
    }
    gameTimer = setInterval(draw, 20);
  }
});

function draw() {
  checkBird();
  applyGravity();
  showPipes(pipes);
  checkPipes();

  $(".inputValue").focus();
  $("#bird").css("left", birdX);
  $("#bird").css("bottom", birdY);
  $("#punkte").html(punkte);
}

function applyGravity() {
  if (birdY > 0) {
    graviySpeed += gravity;
    birdY = birdY - graviySpeed;
  }
}

function showPipes(pipes) {
  $("#pipes").empty();

  for (var i = 0; i < pipes.length; i++) {
    showPipe(pipes[i]);
    pipes[i].x = pipes[i].x + 2;
  }
}

class Pipe {
  constructor(x) {
    this.height = getRandom();
    this.x = x;
  }
}

function showPipe(pipe) {
  $("#pipes").append(
    "<div class='pipe' style='right:" +
      pipe.x +
      "px;height:" +
      pipe.height +
      "px;'>"
  );
  $("#pipes").append(
    "<div class='pipe' style='right:" +
      pipe.x +
      "px;height:" +
      (400 - pipe.height) +
      "px;top:0px;'>"
  );
}

function addPipe() {
  pipes.push(new Pipe(0));
  punkte++;
}

function checkPipes() {
  if (pipes.length > 15) {
    while (pipes.length > 15) {
      pipes.shift();
    }
  }
}

function checkBird() {
  var temp = findPipe();

  if (temp != null) {
    if (birdY < temp.height || birdY > 600 - (400 - temp.height) - 20) {
      clearInterval(gameTimer);
      gameEnded = true;
      $("#game").append(
        "<div id='gameOver'><h1>Game Over</h1><form action=''><input id='button' type='submit' value='New Game'></form></div>"
      );
    }
  }
}

function findPipe() {
  for (var i = 0; i < pipes.length; i++) {
    if (pipes[i].x + 79 >= birdX) {
      if (pipes[i].x <= birdX) {
        return pipes[i];
      }
    }
  }
}
