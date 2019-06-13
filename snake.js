
var s;
var scl = 20;
var points = 1;
var food;
var poison;

function setup(){
    createCanvas(460,460);
    s = new Snake();
    frameRate(10);
    pickLocation(460, 460);
    pickPoison(460,460);

}
function pickLocation(width, height) {
    var columns = Math.floor(width/scl);
    var rows = Math.floor(height/scl);
    food = createVector(Math.floor(Math.random()*columns), Math.floor(Math.random()*rows));
    food.mult(scl);

}
function pickPoison(width,height) {
        var columns = Math.floor(width/scl);
        var rows = Math.floor(height/scl);
        poison = createVector(Math.floor(Math.random()*columns), Math.floor(Math.random()*rows));
        poison.mult(scl);

}

function draw() {
    background(34,139,34);
    
    if (s.eat(food)) {
        pickLocation(460,460);
        points++;
        if(points>0){
            pickPoison(460,460);
            fill(164,124,184);
            rect(poison.x, poison.y,scl,scl);
        }

    }


    document.getElementById("score").innerHTML = "Score: " + points;
    s.death();
    s.update();
    s.show();
    fill(255, 0, 0);
    rect(food.x, food.y, scl, scl);
    fill(164,124,184);
    rect(poison.x, poison.y,scl,scl);
    //poison.xspeed = 1;
    //poison.x = poison.x + poison.xspeed * scl;
    if(s.consume(poison)){
        pickPoison(460,460);
        points--;
    }


}







function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = function (pos) {

        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }

    };


    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    };

    this.death = function () {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                console.log('starting over');
                this.total = 0;
                points = 1;
                this.tail = [];
                break;
                //return false;


            }
        }
    };
    this.consume = function(place){


            var d = dist(this.x, this.y, place.x, place.y);
            if (d < 1 && this.total>1) {
                this.total--;
                return true;
            } else {
                return false;
            }


    };


    this.update = function () {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    };

    this.show = function () {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);

    }
}
