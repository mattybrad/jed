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
    osc.setPeriodicWave(actx.createPeriodicWave(real,imag));
    osc.frequency.value = 130;
  }

  connect(output) {
    this.oscillator.connect(output);
  }
}
