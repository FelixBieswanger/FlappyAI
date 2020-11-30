class Neural_Network {
  constructor(struc) {
    this.weights = [];
    this.biases = [];
    this.layers = [];
    this.struc = struc;
    this.sigma;
    this.genes = [];

    //input layer

    for (var i = 0; i < this.struc.length - 1; i++) {
      this.weights.push(this.createMatrix(this.struc[i + 1], this.struc[i]));
    }

    for (var i = 1; i < this.struc.length; i++) {
      this.biases.push(this.createMatrix(this.struc[i], 1));
    }
  }

  feed_forward_ad(inputValues) {
    //returns true if jump
    var input_vector = this.normalize(inputValues.slice(), 1, 0);
    let a = [];
    input_vector.forEach((el) => a.push(el[0]));

    for (var i = 0; i < this.weights.length; i++) {
      input_vector = this.matrixmultiply(this.weights[i], input_vector);
      input_vector = this.matrixadd(this.biases[i], input_vector);
      for (var j = 0; j < input_vector.length; j++) {
        input_vector[j][0] = this.sigmoid(input_vector[j][0]);
      }
      this.layers[i] = input_vector;
    }

    var result = this.sigmoid(input_vector[0]);
    this.layers[this.layers.length - 1] = [result];
    if (result >= 0.95) {
      return true;
    } else {
      return false;
    }
  }

  show_gui(inputValues) {
    if (!this.sigma) {
      this.sigma = new sigma("network");
      //layer
      for (var layer = 0; layer < this.struc.length; layer++) {
        //nodes per layer
        for (var node = 1; node <= parseInt(this.struc[layer]); node++) {
          this.sigma.graph.addNode({
            id: "l" + (layer + 1) + "n" + node,
            label: "Layer " + (layer + 1) + " Node " + node,
            x: layer / 2.5,
            y: node / 4,
            size: 3,
            color: "#000000",
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
                color: "#000000",
              });
            }
          }
        }
      }

      var edges = this.sigma.graph.edges();
      var edges_value = [];

      for (var i = 0; i < this.weights.length; i++) {
        let matrix = this.weights[i];
        let transpose = matrix[0].map((_, colIndex) =>
          matrix.map((row) => row[colIndex])
        );

        var flatten = [].concat.apply([], transpose);

        for (var j = 0; j < flatten.length; j++) {
          edges_value.push(this.weightColor(flatten[j]));
        }
      }

      for (var i = 0; i < edges.length; i++) {
        edges[i].color = edges_value[i];
      }
    }

    var nodes = this.sigma.graph.nodes();
    var node_values = inputValues.slice();

    for (var i = 0; i < this.layers.length; i++) {
      for (var j = 0; j < this.layers[i].length; j++) {
        node_values.push(Math.round(this.layers[i][j] * 100) / 100);
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
      this.sigma.kill();
    }
  }

  sigmoid(t) {
    return 1 / (1 + Math.exp(2 / -t));
  }

  createMatrix(rows, cols) {
    let matrix = [];

    for (var i = 0; i < rows; i++) {
      let col = [];
      for (var j = 0; j < cols; j++) {
        let w = Math.random() * 3;

        if (Math.random() >= 0.5) {
          w = -w;
        }
        this.genes.push(w);
        col.push(w);
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

  matrixadd(a, b) {
    var arows = a.length;
    var m = new Array(arows);

    for (var i = 0; i < arows; i++) {
      m[i] = [a[i][0] + b[i][0]];
    }

    return m;
  }

  normalize(arr) {
    let min = -400;
    let max = 700;
    var result = [];
    var a = [];
    arr.forEach((element) => {
      a.push(parseFloat(element[0]));
    });

    a.forEach((el) => result.push([(el - min) / (max - min)]));
    return result;
  }

  weightColor(value) {
    value = value / 3;
    var r = 0;
    var g = 0;
    var b = 0;
    if (value > 0) {
      g = value * 255;
    } else if (value < 0) {
      r = -value * 255;
    } else {
      r = 255;
      b = 255;
      g = 255;
    }

    let result = this.rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b));
    return result;
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }
}
