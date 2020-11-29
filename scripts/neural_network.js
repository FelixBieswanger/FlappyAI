class Neural_Network {
  constructor(struc, bird) {
    this.bird = bird;
    this.net = [];
    this.layers = [];
    this.struc = struc;
    this.sigma;

    //input layer

    for (var i = 0; i < this.struc.length - 1; i++) {
      this.net.push(this.createMatrix(this.struc[i], this.struc[i + 1]));
    }
  }

  feed_forward_ad() {
    //returns true if jump
    var input_vector = this.normalize(this.bird.inputValues.slice(), 1, 0);
    console.log("input", input_vector);

    this.layers = [];

    for (var i = 0; i < this.net.length; i++) {
      let weights = this.net[i][0].map((_, colIndex) =>
        this.net[i].map((row) => row[colIndex])
      );
      input_vector = this.matrixmultiply(weights, input_vector);
      for (var j = 0; j < input_vector.length; j++) {
        input_vector[j][0] = this.sigmoid(input_vector[j][0]);
      }
      console.log(input_vector);
      this.layers.push(input_vector);
    }

    var result = this.sigmoid(input_vector[0]);
    if (result >= 0.5) {
      return true;
    } else {
      return false;
    }
  }

  show_gui() {
    if (!this.sigma) {
      this.sigma = new sigma("network");
      //layer
      for (var layer = 0; layer < this.struc.length; layer++) {
        //nodes per layer
        for (var node = 1; node <= parseInt(this.struc[layer]); node++) {
          this.sigma.graph.addNode({
            id: "l" + (layer + 1) + "n" + node,
            label: "Layer " + (layer + 1) + " Node " + node,
            x: (layer + 1) / 4,
            y: node / 3,
            size: 3,
            color: "#f00",
          });
        }
      }

      //layer
      for (var layer = 0; layer < this.struc.length; layer++) {
        //nodes
        for (var node = 1; node <= parseInt(this.struc[layer]); node++) {
          if (layer < this.struc.length) {
            //loonodeNext to next layer to see how many edges
            for (
              var nodeNext = 1;
              nodeNext <= parseInt(this.struc[layer + 1]);
              nodeNext++
            ) {
              this.sigma.graph.addEdge({
                id: "e_l" + (layer + 1) + "n" + node + "nodeNext" + nodeNext,
                source: "l" + (layer + 1) + "n" + node,
                target: "l" + (layer + 2) + "n" + nodeNext,
                color: "#00a",
              });
            }
          }
        }
      }
    }

    var nodes = this.sigma.graph.nodes();
    var node_values = this.bird.inputValues.slice();

    for (var i = 0; i < this.layers.length; i++) {
      for (var j = 0; j < this.layers[i].length; j++) {
        node_values.push(this.layers[i][j]);
      }
    }

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].label = String(node_values[i]);
    }
    this.sigma.refresh();
  }

  remove_gui() {
    if (this.sigma) {
      this.sigma.graph.clear();
      this.sigma.refresh();
    }
  }

  sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
  }

  createMatrix(rows, cols) {
    let matrix = [];

    for (var i = 0; i < rows; i++) {
      let col = [];
      for (var j = 0; j < cols; j++) {
        col.push(Math.random());
      }
      matrix.push(col);
    }

    return matrix;
  }

  matrixmultiply(a, b) {
    var aNumRows = a.length,
      aNumCols = a[0].length,
      bNumRows = b.length,
      bNumCols = b[0].length,
      m = new Array(aNumRows); // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        m[r][c] = 0; // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }

  normalize(arr) {
    var result = [];
    var a = [];
    arr.forEach((element) => {
      a.push(parseFloat(element[0]));
    });

    a.forEach((el) => result.push([(el - 800) / (800 - 0)]));
    return result;
  }
}
