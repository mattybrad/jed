import FourierCoefficients from './FourierCoefficients';
import Word from './Word';

export default class Singer {
  constructor() {
    this.wordQueue = [];
    this.currentWord = null;
    var actx = new AudioContext();
    var osc = actx.createOscillator();
    var gain = actx.createGain();
    var f1 = actx.createBiquadFilter();
    var f2 = actx.createBiquadFilter();
    var f1Gain = actx.createGain();
    var f2Gain = actx.createGain();
    var coeffs = FourierCoefficients;
    var real = new Float32Array(coeffs.length / 2);
    var imag = new Float32Array(coeffs.length / 2);
    for(var i = 0; i < coeffs.length / 2; i ++) {
      real[i] = coeffs[2*i];
      imag[i] = coeffs[2*i+1];
    }
    osc.setPeriodicWave(actx.createPeriodicWave(real,imag));
    osc.frequency.value = 130;
    f1.type = f2.type = "bandpass";
    f1.frequency.value = f2.frequency.value = 10; // starting value
    f1.Q.value = f2.Q.value = 1;
    osc.connect(f1);
    osc.connect(f2);
    // osc.connect(gain);
    //f1.connect(f1Gain);
    f2.connect(f2Gain);
    f1Gain.connect(gain);
    f2Gain.connect(gain);
    gain.connect(actx.destination);
    gain.gain.value = 0.1;
    osc.start();
    this.oscillator = osc;
    this.gain = gain;
    this.filter1 = f1;
    this.filter2 = f2;
    this.filter1Gain = f1Gain;
    this.filter2Gain = f2Gain;
    this.setFormant();
    setInterval(this.nextWord.bind(this), 1000); // using an interval for now to simulate flow of words
  }

  setFormant() {
    this.filter1.frequency.value = 250 + Math.random()*500;
    this.filter1.Q.value = 10;
    this.filter1Gain.gain.value = 1;
    this.filter2.frequency.value = 595 + Math.random()*2000;
    this.filter2.Q.value = 10;
    this.filter2Gain.gain.value = 1;
    // this.filter1.frequency.value = 240;
    // this.filter1.Q.value = 10;
    // this.filter1Gain.gain.value = 1;
    // this.filter2.frequency.value = 2400;
    // this.filter2.Q.value = 10;
    // this.filter2Gain.gain.value = 1;
  }

  addToWordQueue(words) {
    this.wordQueue = this.wordQueue.concat(words);
  }

  nextWord() {
    if(this.wordQueue.length) {
      this.currentWord = new Word(this.wordQueue.shift());
    } else {
      this.currentWord = null;
    }
    if(this.currentWord) {
      console.log(this.currentWord);
      this.setFormant();
    }
  }
}
