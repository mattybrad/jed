import FourierCoefficients from './FourierCoefficients';

export default class PulseTrain {
  constructor(actx) {
    this.osc = actx.createOscillator();
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
  }

  connect(output) {
    this.osc.connect(output);
  }
}
