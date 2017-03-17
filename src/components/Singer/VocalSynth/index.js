import PulseTrain from './PulseTrain';
import NoiseGenerator from './NoiseGenerator';
import Crossfader from './Crossfader';
import VocalTractModel from './VocalTractModel';
import FilterBank from './FilterBank';
import LipModel from './LipModel';

export default class VocalModel {
  constructor() {
    var actx = new AudioContext();

    this.pulseTrain = new PulseTrain(actx);
    this.noiseGenerator = new NoiseGenerator(actx, 5000);
    this.crossfader = new Crossfader(actx);
    this.vocalTractModel = new VocalTractModel(actx);
    this.constrictionNoise = new NoiseGenerator(actx, 10000, function() {
      return 1 - 0.5 * Math.random();
    });
    this.constrictionFader = new Crossfader(actx);
    this.constrictionModel = new FilterBank(actx);
    this.lipModel = new LipModel(actx);
    this.masterGain = actx.createGain();

    var filterS = [0,0,0,0,0,0,0,0,0,0.02,0.1,0.9,1,0.7];
    var filterF = [0,0,0,0.3,0.5,0.5,0.7,0.7,0.8,0.8,0.7,0.7,0.7,0.4];
    var filterTH = [0,0,0,0,0.3,0.3,0.4,0.3,0.4,0.5,0.7,0.7,0.7,0.5];
    var filterSH = [0,0,0,0,0,0,0,0.1,0.3,0.5,0.7,1,0.7,0.4];
    var filterTest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.constrictionModel.setFilters(filterF);
    window.sf = function(filters) {
      this.constrictionModel.setFilters(filters);
    }.bind(this);

    this.pulseTrain.start();
    this.noiseGenerator.start();
    this.constrictionNoise.start();

    this.pulseTrain.connect(this.crossfader.secondInput);
    this.noiseGenerator.connect(this.crossfader.firstInput);
    this.crossfader.connect(this.vocalTractModel.input);
    this.constrictionNoise.connect(this.constrictionModel.input);
    this.vocalTractModel.connect(this.constrictionModel.input.gain);
    this.vocalTractModel.connect(this.constrictionFader.firstInput);
    this.constrictionModel.connect(this.constrictionFader.secondInput);
    this.constrictionFader.connect(this.lipModel.input);
    this.lipModel.connect(this.masterGain);
    this.masterGain.connect(actx.destination);
  }
}
