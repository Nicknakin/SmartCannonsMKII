class Trainer{
    constructor(){
        
    }

    mutate(cannon){
        cannon.brain.mutate([10, 50], [10, 50]);
    }

    breed(cannon1, cannon2){
         //Weight crosses
         for(let layer = 0; layer < cannon1.brain.weights.length; layer++){
            for(let node = 0; node < cannon1.brain.weights[layer].length; node++){
                for(let weights = 0; weights < cannon1.brain.weights[layer][node].length; weights++){
                    cannon2.brain.weights[layer][node][weights] = round(random())? cannon2.brain.weights[layer][node][weights]: cannon1.brain.weights[layer][node][weights];
                }
            }
        }
        
        //Bias crosses
        for(let layer = 0; layer < cannon1.brain.layers.length; layer++){
            for(let node = 0; node < cannon1.brain.layers[layer].length; node++){
                cannon2.brain.layers[layer][node] = round(random())? cannon2.brain.layers[layer][node]: cannon1.brain.layers[layer][node];
            }
        }
    }

    eval(cannon){
        return pow(point.y-cannon.projectile.y, 2) + pow(point.x-cannon.projectile.x, 2);
    }
}