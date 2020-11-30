var END = false;
var simulation_speed_ms;
var r = 0;
var population_size = 2;
var game;
var draw_timer;
var pipes = [];
var population;
var birds = [];
var whichpipe = 0;

$(document).ready(function () {
  var slider = document.getElementById("slider");
  var output = document.getElementById("slideroutput");
  output.innerHTML = slider.value;
  simulation_speed_ms = slider.value;

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    if (!END) {
      output.innerHTML = this.value;
      simulation_speed_ms = this.value;

      clearInterval(game);

      game = setInterval(gameloop, simulation_speed_ms);
    }
  };

  population = new Population(population_size);

  //get birds from population
  birds = population.getBirds();

  //create first pipe
  pipes.push(new Pipe());

  //set simulation speed
  game = setInterval(gameloop, simulation_speed_ms);

  function newPopulation() {
    r = 0;
    pipes.forEach((pipe) => pipe.remove());
    pipes = [];

    //create population
    birds = population.createNewPop();
    birds[0].bestbird = true;

    //create first pipe
    pipes.push(new Pipe());

    //set simulation speed
    game = setInterval(gameloop, simulation_speed_ms);
  }

  function gameloop() {
    birds.forEach((bird) => bird.show());
    pipes.forEach((pipe) => pipe.show());

    r += 1;
    birds.forEach((bird) => (bird.punkte = r));

    //create pipe every 2 sek

    if (r % 17 == 0) {
      pipes.push(new Pipe());
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
    if (pipes.length == 3 && !pipes[0].x > 30) {
      activePipe = pipes[1];
    } else {
      activePipe = pipes[0];
    }

    for (var i = 0; i < birds.length; i++) {
      if (birds[i].evaluate(activePipe)) {
        birds[i].remove();
        birds.splice(i, 1);
      }
    }

    if (birds.length == 0) {
      clearInterval(game);
      newPopulation();
    } else {
      document.getElementById("punkte").innerHTML = birds[0].punkte;
      birds[0].bestbird = true;
    }
  }
});
