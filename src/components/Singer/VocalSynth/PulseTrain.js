import FourierCoefficients from './FourierCoefficients';
import NoiseGenerator from './NoiseGenerator';

export default class PulseTrain {
  constructor(actx) {
    this.osc = actx.createOscillator();
    this.noise = new NoiseGenerator(actx, 15000, function() {
      return 1 - 0.5 * Math.random();
    });
    this.gain = actx.createGain();
    this.noise.connect(this.gain.gain);
    this.osc.connect(this.gain);
    var coeffs = FourierCoefficients;
    var real = new Float32Array(coeffs.length / 2);
    var imag = new Float32Array(coeffs.length / 2);
    for(var i = 0; i < coeffs.length / 2; i ++) {
      real[i] = coeffs[2*i];
      imag[i] = coeffs[2*i+1];
    }
    this.osc.setPeriodicWave(actx.createPeriodicWave(real,imag));
    this.osc.frequency.value = 130;
  }

  start() {
    this.osc.start();
    this.noise.start();
  }

  connect(output) {
    this.gain.connect(output);
  }
}
