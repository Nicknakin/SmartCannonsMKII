class Cannon{
    constructor(x, y, c){
        this.x = x? x: 0;
        this.y = y? y: 0;
        this.a = 0;
        this.c = c? c: "#000000";
        this.r = 25;
    }

    show(){
        fill(this.c);
        stroke(0);
        push();
        translate(this.x, this.y);
        ellipse(0, 0, this.r, this.r);
        rotate(this.a);
        line(0, 0, this.r*1.5, 0);
        pop();
    }
}