class Brain{
     constructor(numInputs, numHiddenNodes, numHiddenLayers, numOutputs){
        this.inputs = new Array(numInputs);
        this.hiddenLayers = new Array(numHiddenLayers);
        for(let i = 0; i < numHiddenLayers; i++)
            this.hiddenLayers[i] = new Array(numHiddenNodes);
        this.outputs = new Array(numOutputs);

        this.layers = [this.inputs].concat(this.hiddenLayers).concat([this.outputs]);

        let weightsLayers = numHiddenLayers+1;
        this.weights = new Array(weightsLayers);
        for(let i = 0; i < weightsLayers; i++){
            this.weights[i] = new Array(this.layers[i+1].length)
            for(let k = 0; k < this.weights[i].length; k++){
                this.weights[i][k] = new Array(this.layers[i].length);
            }
        }
     }

     guess(inputs){
        for(let layer = 1; layer < this.layers.length; layer++){
            let newInputs = new Array(this.layers[layer].length);
            for(let node = 0; node < this.layers[layer].length; node++){
                newInputs[node] = this.sigmoid(inputs, this.weights[layer-1][node], this.layers[layer][node]);
            }
            inputs = newInputs;
        }

        return inputs;
     }

     
    //function 1/(1-e^z)
     sigmoid(vals, weights, bias){
        let sum = bias;
        weights.forEach((weight, ind) => sum += weight*vals[ind]);
        return 1/(1+exp(sum));
     }

     randomize(){
         for(let layer = 0; layer < this.weights.length; layer++){
             for(let node = 0; node < this.weights[layer].length; node++){
                 for(let weights = 0; weights < this.weights[layer][node].length; weights++){
                     this.weights[layer][node][weights] = random(1);
                 }
             }
         }

         for(let layer = 0; layer < this.layers.length; layer++){
             for(let node = 0; node < this.layers[layer].length; node++){
                 this.layers[layer][node] = random(1);
             }
         }
     }

     mutate(weightPercents, biasPercents){
         //Weight mutations
        for(let layer = 0; layer < this.weights.length; layer++){
            for(let node = 0; node < this.weights[layer].length; node++){
                for(let weights = 0; weights < this.weights[layer][node].length; weights++){
                    if(random() <= weightPercents[0]){
                        let maxChange = weightPercents[1]/100;
                        let change = random(-1/2,1/2)*maxChange
                        this.weights[layer][node][weights] += change;
                    }
                }
            }
        }
        
        //Bias mutations
        for(let layer = 0; layer < this.layers.length; layer++){
            for(let node = 0; node < this.layers[layer].length; node++){
                if(random() <= biasPercents[0]){
                    let maxChange = biasPercents[1]/100;
                    let change = random(-1/2,1/2)*maxChange
                    this.layers[layer][node] += change;
                }
            }
        }
     }
}