let cannons;
const numCannons = 100;
let point;
let averageScore = 0;

let cycles = 0;

function setup(){
    createCanvas(window.innerWidth*0.95, window.innerHeight*0.95);

    point = {x:width, y:height/2};

    cannons = new Array(numCannons);
    for(let cannon = 0; cannon < numCannons; cannon++){
        cannons[cannon] = new Cannon(0, height/2, getRandomColor(), 40);
    }

    fireCannons();
}

function draw(){
    background(0);
    fill(255);
    text(`Generation: ${cycles}\nAverage Score: ${numberWithCommas(round(averageScore))}`, width/2, height*.95);
    ellipse(point.x, point.y, 20, 20);
    let isLive = false;
    if(cycles < 10000){
        cannons.forEach((cannon) =>{
            while(!cannon.projectile.move());
        });
    } else {
        cannons.forEach((cannon) => {
            isLive = cannon.projectile.move()? isLive: true;
        });
        for(let i = 0; i < 100; i++){
            cannons[i].show();
            cannons[i].projectile.show();
        }
    }
    for(let i = 0; i < 16; i++){
        cannons[0].show();
        cannons[0].projectile.show();
    }
    if(!isLive){
        newGeneration();
        cycles++;
    }
}


function newGeneration(){
    let trainer = new Trainer();
    scores = cannons.map((cannon) => {
        cannon.score = trainer.eval(cannon, point);
        return cannon;
    });
    cannons = cannons.sort((a, b) => a.score-b.score);
    
    cannons.forEach((cannon, index) => {
        if(index > 1 && index < numCannons/2){
            trainer.breed(cannons[0], cannon);
        } else if(index >= numCannons/2){
            trainer.breed(cannons[1], cannon);
        }
        if(cannon.score > 10000) trainer.mutate(cannon);
    });

    if(cycles%10 == 1){
        averageScore = 0;
        cannons.forEach(cannon => averageScore += cannon.score/numCannons);
    }

    point.y = noise(cycles/500)*height;

    fireCannons();
}

function fireCannons(){
    cannons.forEach((cannon, index) => {
        let guess = cannon.brain.guess([map(point.y-cannon.y, 0, height, -1, 1)]);
        guess[0] = map(guess[0], 0, 1, -PI, PI);
        guess[1] = map(guess[1], 0, 1, 0, 0.05*sqrt(width*width+height*height));
        cannon.shoot(guess[1], guess[0]);
    })
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color+"11";
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}