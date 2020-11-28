class Neural_Network {
    constructor(struc) {
        this.weights = [];
        this.biases = [];
        this.values = [[0, 0, 0],[0,0,0],[0]];
        this.struc = struc;
        this.sigma = new sigma('network');

        //layer
        for (var layer = 0; layer < this.struc.length; layer++) {
            //nodes per layer
            for (var node = 1; node <= parseInt(this.struc[layer]); node++) {
                this.sigma.graph.addNode({
                    id: "l" + (layer + 1) + "n" + node,
                    label: 'Layer ' + (layer + 1) + ' Node ' + node,
                    x: (layer + 1) / 4,
                    y: node / 3,
                    size: 3,
                    color: '#f00'
                });
            }
        }

        //layer
        for (var layer = 0; layer < this.struc.length; layer++) {
            //nodes
            for (var node = 1; node <= parseInt(this.struc[layer]); node++) {
                if (layer < this.struc.length) {
                    //loonodeNext to next layer to see how many edges
                    for (var nodeNext = 1; nodeNext <= parseInt(this.struc[layer + 1]); nodeNext++) {
                        this.sigma.graph.addEdge({
                            id: "e_l" + (layer + 1) + "n" + node + "nodeNext" + nodeNext,
                            source: "l" + (layer + 1) + "n" + node,
                            target: 'l' + (layer + 2) + "n" + nodeNext,
                            color: '#00a'
                        });
                    }
                }
            }
        }


        //init weights

        //init biases

    }

    feed_forward(input_bird) {
        if(Math.random() < 0.1){
            return true;
        }else{
            return false;
        }
    }

    show_gui(bird) {
        var nodes = this.sigma.graph.nodes();
        for (var i = 0; i < 4;i++) {
            nodes[i].label = "Value, " + bird.inputValues[i];
        }

        for (var i =0; i < 3 ;i++) {
            nodes[i+4].label = "Value, " + this.values[0][i];
        }

        for (var i = 0; i < 3 ;i++) {
            nodes[i+7].label = "Value, " +this.values[1][i];
        }

        nodes[nodes.length-1].label = "Value, " + this.values[2][0];
        this.sigma.refresh();
    }
}


function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}