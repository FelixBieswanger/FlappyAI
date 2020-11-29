var END = false;
var fps = 60;
var framesThisSecond = 0;
var lastFpsUpdate = 0;
var simulation_speed_ms;
var r = 0;
var population = 1;
var game;
var draw_timer;
var pipes = [];
var birds = [];
var whichpipe = 0;

$(document).ready(function () {
  //create population
  for (var i = 0; i < population; i++) {
    birds.push(new Bird());
  }
  birds[0].bestbird = true;

  //create first pipe
  pipes.push(new Pipe());

  //set framerate
  //draw_timer = setInterval(draw, framerate);
  requestAnimationFrame(draw);

  var slider = document.getElementById("slider");
  var output = document.getElementById("slideroutput");
  output.innerHTML = slider.value;
  simulation_speed_ms = slider.value;

  //set simulation speed
  game = setInterval(gameloop, simulation_speed_ms);

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    if (!END) {
      output.innerHTML = this.value;
      simulation_speed_ms = this.value;

      clearInterval(game);

      game = setInterval(gameloop, simulation_speed_ms);
    }
  };

  var fpsDisplay = document.getElementById("fpsDisplay");
});

function draw(timestamp) {
  if (timestamp > lastFpsUpdate + 1000) {
    // update every second
    fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS

    lastFpsUpdate = timestamp;
    framesThisSecond = 0;
  }
  framesThisSecond++;
  fpsDisplay.textContent = Math.round(fps) + " FPS"; // display the FPS

  birds.forEach((bird) => bird.show());
  pipes.forEach((pipe) => pipe.show());
  requestAnimationFrame(draw);
}

function gameloop() {
  r += 1;

  //create pipe every 2 sek

  if (r % 17 == 0) {
    pipes.push(new Pipe());
    birds.forEach((bird) => (bird.punkte += 1));
  }

  //move & show pipes
  for (var i = 0; i < pipes.length; i++) {
    if (pipes[i].x < -80) {
      pipes[i].remove();
      pipes.splice(i, 1);
    }
    pipes[i].move(simulation_speed_ms);
  }

  for (var i = 0; i < birds.length; i++) {
    birds[i].move();
  }

  //get active pipe
  var activePipe;
  if (pipes.length == 3 && !pipes9[0].x > 30) {
    activePipe = pipes[1];
  } else {
    activePipe = pipes[0];
  }

  for (var i = 0; i < birds.length; i++) {
    var wasbest = birds[i].bestbird;
    if (birds[i].evaluate(activePipe)) {
      birds[i].remove();
      birds.splice(i, 1);
    }
  }

  if (birds.length == 0) {
    clearInterval(game);
    END = true;
  } else {
    document.getElementById("punkte").innerHTML = birds[0].punkte;
    birds[0].bestbird = true;
  }
}
