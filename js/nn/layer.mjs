import Neuron from "./neuron.mjs";
export default class Layer {
    constructor(numberOfNeurons) {
        const neurons = []
        for (let j = 0; j < numberOfNeurons; j++) {
            const neuron = new Neuron() // Neurons in other than initial layer have a bias value
            neurons.push(neuron)
        }
        this.neurons = neurons
    }
  
    toJSON() {
        return this.neurons.map(n => {
            return n.toJSON()
        })
    }
}
  