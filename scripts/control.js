var framerate_ms = 1;
var piperate_ms = 4000;
var population = 1;
var game;
var pipe_timer;
var pipes = [];
var birds = [];

$(document).ready(function () {
    //set framerate
    game = setInterval(draw, framerate_ms);

    //interval within pipes are made
    pipes.push(new Pipe());
    pipe_timer = setInterval(function () {
        pipes.push(new Pipe());
    }, piperate_ms);

    for (var i = 0; i < 1; i++) {
        birds.push(new Bird())
    }
});


function draw() {
    //move & show pipes
    for (var i = 0; i < pipes.length; i++) {
        if (pipes[i].x < -80) {
            pipes[i].remove();
            pipes.splice(i, 1);
        }
        pipes[i].move_show();
    }
    birds[0].bestbird = true;

    for (var i = 0; i < birds.length; i++) {
        birds[i].move_show();
    }

    //get active pipe
    var activePipe;
    var found = false;
    var x_temp = 1;
    loop: while (found == false) {
        for (var i = 0; i < pipes.length; i++) {
            if (pipes[i].x == x_temp) {
                activePipe = pipes[i];
                break loop;
            }
        }
        x_temp++;
    }

    for (var i = 0; i < birds.length; i++) {
        if (birds[i].evaluate(activePipe)) {
            birds[i].remove();
            birds[i].brain.sigma.graph.kill();
            birds.splice(i, 1);
        }
    }

    if (birds.length == 0) {
        clearInterval(pipe_timer);
        clearInterval(game);
    }
}


