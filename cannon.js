class Cannon{
    
    constructor(x, y, c, r){
        this.x = x? x: 0;
        this.y = y? y: 0;
        this.a = 0;
        this.c = c? c: "#000000";
        this.r = r? r: 25;
        this.brain = new Brain(1, 3, 2, 2);
        this.brain.randomize();
        this.score;
    }

    show(){
        fill(this.c);
        stroke(0);
        push();
        translate(this.x, this.y);
        ellipse(0, 0, this.r, this.r);
        rotate(this.a);
        stroke(this.c);
        strokeWeight(8);
        line(0, 0, this.r*0.9, 0);
        strokeWeight(1);
        pop();
    }

    shoot(power, a){
        this.a = a;
        this.power = power? power: 0;
        this.projectile = new CannonBall(this.x+this.r*cos(this.a), this.y+this.r*sin(this.a), this.r*0.2, this.c, a, power);
    }
}