class Population {
  constructor(population_size) {
    this.size = population_size;
    this.birds = [];

    for (var i = 0; i < this.size; i++) {
      this.birds.push(new Bird(-1));
    }
  }

  getBirds() {
    return this.birds.slice();
  }

  createNewPop() {
    var newPop = [];
    var pool = [];
    var scores = [];

    this.birds.forEach((bird) => {
      let score = Math.floor(bird.punkte - 31 + 2);
      scores.push(score);
      for (var i = 0; i < score; i++) {
        pool.push(bird);
      }
    });

    for (var i = 0; i < this.size; i++) {
      let a = this.getRandomInt(0, pool.length);
      let b = this.getRandomInt(0, pool.length);
      let child = this.crossover(pool[a], pool[b]);
      newPop.push(child);
    }

    this.birds = newPop;
    return newPop.slice();
  }

  crossover(birdA, birdB) {
    var weightsA = birdA.brain.weights;
    //for every weight matrix
    for (var i = 0; i < weightsA.length; i++) {
      //for every row
      for (var j = 0; j < weightsA[i].length; j++) {
        if (Math.random() > 0.95) {
          weightsA[i][j] = this.mutate(birdB.brain.weights[i][j]);
        }
      }
    }

    var biasesA = birdA.brain.biases;
    for (var i = 0; i < biasesA.length; i++) {
      for (var j = 0; j < biasesA[i].length; j++) {
        if (Math.random() > 0.99) {
          biasesA[i][j] = this.mutate(birdB.brain.biases[i][j]);
        }
      }
    }

    var geneA = {
      weights: weightsA,
      biases: biasesA,
    };

    return new Bird(geneA);
  }

  mutate(array) {
    for (var i = 0; i < array.length; i++) {
      if (Math.random() > 0.98) {
        array[i] = this.getRandomInt(-3, 3);
      }
    }
    return array;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  addBird() {
    this.birds.push(new Bird(-1));
    return this.birds.slice();
  }

  removeBird() {
    this.birds.sort((bird1, bird2) => bird2.punkte - bird1.punkte);
    this.birds.pop();
    return this.birds.slice();
  }
}
