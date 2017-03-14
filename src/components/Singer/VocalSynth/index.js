import PulseTrain from './PulseTrain';
import NoiseGenerator from './NoiseGenerator';
import Crossfader from './Crossfader';
import VocalTractModel from './VocalTractModel';
import LipModel from './LipModel';

export default class VocalModel {
  constructor() {
    var actx = new AudioContext();

    this.pulseTrain = new PulseTrain(actx);
    this.noiseGenerator = new NoiseGenerator(actx);
    this.crossfader = new Crossfader(actx);
    this.vocalTractModel = new VocalTractModel(actx);
    this.lipModel = new LipModel(actx);
    this.masterGain = actx.createGain();

    this.pulseTrain.connect(this.crossfader.firstInput);
    this.noiseGenerator.connect(this.crossfader.secondInput);
    this.crossfader.connect(this.vocalTractModel.input);
    this.vocalTractModel.connect(this.lipModel.input);
    this.lipModel.connect(this.masterGain);
    this.masterGain.connect(actx.destination);

    this.pulseTrain.start();
    this.noiseGenerator.start();
  }
}
