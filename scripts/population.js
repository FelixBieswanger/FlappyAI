class Population {
  constructor(population_size) {
    this.size = population_size;
    this.birds = [];

    for (var i = 0; i < this.size; i++) {
      this.birds.push(new Bird());
    }
  }

  getBirds() {
    return this.birds.slice();
  }

  createNewPop() {
    for (var i = 0; i < this.size; i++) {
      this.birds[i] = new Bird();
    }
    return this.birds;
  }
}
