var has_started = false;
var END = false;
var simulation_speed_ms;
var r = 0;
var population_size = 100;
var game;
var draw_timer;
var pipes = [];
var population;
var frontend_birds = [];
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

      if (has_started) {
        clearInterval(game);
        game = setInterval(gameloop, simulation_speed_ms);
      }
    }
  };

  // populationsize
  var popsizeinput = document.getElementById("populationsize");
  population_size = popsizeinput.value;
  popsizeinput.onchange = function () {
    if (has_started) {
      var delta = popsizeinput.value - population_size;
      if (delta > 0) {
        for (var i = 0; i < delta; i++) {
          console.log("add");
          frontend_birds = population.addBird();
        }
      } else {
        for (var i = 0; i < delta; i++) {
          frontend_birds = population.removeBird();
        }
      }
    }

    population_size = popsizeinput.value;
    population.size = population_size;
  };

  //start simulation with button
  var startbutton = document.getElementById("startbutton");

  startbutton.onclick = function () {
    population = new Population(population_size);

    //get frontend_birds from population
    frontend_birds = population.getBirds();

    //create first pipe
    pipes.push(new Pipe());

    //set simulation speed
    game = setInterval(gameloop, simulation_speed_ms);
    has_started = true;

    startbutton.remove();
  };
});

function newPopulation() {
  r = 0;
  pipes.forEach((pipe) => pipe.remove());
  pipes = [];

  //create population
  frontend_birds = population.createNewPop();
  frontend_birds[0].bestbird = true;

  //create first pipe
  pipes.push(new Pipe());

  //set simulation speed
  game = setInterval(gameloop, simulation_speed_ms);
}

function gameloop() {
  frontend_birds.forEach((bird) => bird.show());
  pipes.forEach((pipe) => pipe.show());

  r += 1;
  frontend_birds.forEach((bird) => (bird.punkte = r));

  //create pipe every 2 sek

  if (r % 20 == 0) {
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

  for (var i = 0; i < frontend_birds.length; i++) {
    frontend_birds[i].move();
  }

  //get active pipe
  var activePipe;
  if (pipes.length == 3 && !pipes[0].x > 30) {
    activePipe = pipes[1];
  } else {
    activePipe = pipes[0];
  }

  for (var i = 0; i < frontend_birds.length; i++) {
    if (frontend_birds[i].evaluate(activePipe)) {
      frontend_birds[i].remove();
      frontend_birds.splice(i, 1);
    }
  }

  if (frontend_birds.length == 0) {
    clearInterval(game);
    newPopulation();
  } else {
    document.getElementById("punkte").innerHTML = frontend_birds[0].punkte;
    frontend_birds[0].bestbird = true;
  }
}
