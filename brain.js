class Brain{
     constructor(numInputs, numHiddenNodes, numHiddenLayers, numOutputs){
        this.inputs = new Array(numInputs);
        this.hiddenLayers = new Array(numHiddenLayers);
        for(let i = 0; i < numHiddenLayers; i++)
            this.hiddenLayers[i] = new Array(numHiddenNodes);
        this.outputs = new Array(numOutputs);
        this.weightsLayers = 1+numHiddenLayers;
        this.weights = new Array(weightsLayers);
        for(let i = 0; i < numHiddenLayers; i++){
            this.weights[i] = new Array((i == 0)? numInputs: numHiddenNodes);
            for(let k = 0; k < this.weights[i].length; k++){
                this.weights[i][k] = new Array((i == numHiddenLayers-1)? numOutputs: numHiddenNodes);
            }
        }

     }

     guess(inputs){
        
     }

     sigmoid(inputs){

     }

     randomize(){
         this.weights.forEach((layerInterface => {
            layerInterface.forEach(node => {
                node.forEach(weight => weight = random(1));
            })
         }))
     }
}