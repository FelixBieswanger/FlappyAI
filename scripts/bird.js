class Bird {
    constructor() {
        this.x = (30 + Math.floor(Math.random() * 50 - 10));
        this.y = 390;
        this.id = Math.floor(Math.random() * 1000000);
        this.gravity = 1;
        this.brain = new Neural_Network(["4", "3", "3", "1"]);
        this.inputValues = [];
        this.bestbird = false;
        $("#birds").append("<img src='resources/flappy.svg' class='bird 'id='bird" + this.id + "' style='left:" + this.x + "px;bottom:" + this.y + "px;'></img>");
    }

    move_show() {
        this.gravity *= 1.1;
        if (this.bestbird) {
            document.getElementById("bird" + this.id).style.opacity = 1;
            this.brain.show_gui(this);
        } else {
            document.getElementById("bird" + this.id).style.opacity = 0.3;
        }
        if (this.y > 10) {
            this.y = this.y - this.gravity;
            var bird = document.getElementById("bird" + this.id)
            bird.style.bottom = this.y + "px";
            bird.style.transform = "rotate(" + this.gravity * 1.7 + "deg)";
            if (this.brain.feed_forward()) {
                this.jump();
            }
        }
    }

    jump() {
        //reset gravitational pull
        if (this.y < 620) {
            this.gravity = 0.75;
            this.y += 40;
            var bird = document.getElementById("bird" + this.id);
            bird.style.bottom = this.y + "px";
            bird.style.transform = "rotate(-20deg)";
        }
    }

    evaluate(pipe) {
        this.inputValues = [];
        this.inputValues.push(parseFloat(this.y.toFixed(2)));
        this.inputValues.push(parseFloat((700 - pipe.top_border) - this.y + 20).toFixed(2));
        this.inputValues.push(parseFloat(this.y - pipe.low_border).toFixed(2));
        this.inputValues.push(parseFloat(pipe.x - this.x).toFixed(2));

        if (this.x + 40 >= pipe.x && this.x + 40 <= (pipe.x + 80)) {
            //hit a pipe    
            if (this.y + 20 >= (700 - pipe.top_border) || this.y <= pipe.low_border) {
                return true;
            }
        }
        return false;
    }

    remove() {
        $("#bird" + this.id).remove();
    }

}