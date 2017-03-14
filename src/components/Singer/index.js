import FourierCoefficients from './FourierCoefficients';
import PronunciationTool from './PronunciationTool';
import Word from './Word';
import Syllable from './Syllable';
import SoundNode from './SoundNode';

export default class Singer {
  constructor() {

  }

  init(callback) {
    var actx = new AudioContext();
    PronunciationTool.init(function() {
      SoundNode.init(actx, function() {
        this.wordQueue = [];
        this.currentWord = null;
        this.syllableQueue = [];
        this.currentSyllable = null;
        this.syllableProgress = 0;
        var osc = actx.createOscillator();
        var gain = actx.createGain();
        var f1 = actx.createBiquadFilter();
        var f2 = actx.createBiquadFilter();
        var rawGain = actx.createGain();
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
        osc.connect(rawGain);
        osc.connect(f1);
        osc.connect(f2);
        f1.connect(f1Gain);
        f2.connect(f2Gain);
        rawGain.connect(gain);
        f1Gain.connect(gain);
        f2Gain.connect(gain);
        SoundNode.filterNode.connect(f1);
        SoundNode.filterNode.connect(f2);
        SoundNode.rawNode.connect(gain);
        gain.connect(actx.destination);
        rawGain.gain.value = 0.01;
        gain.gain.value = 0.5;
        osc.start();
        this.oscillator = osc;
        this.gain = gain;
        this.filter1 = f1;
        this.filter2 = f2;
        this.filter1Gain = f1Gain;
        this.filter2Gain = f2Gain;
        this.setFormant(10, 10);
        setInterval(this.update.bind(this), 20);
        callback();
      }.bind(this))
    }.bind(this));
  }

  setFormant(freq1, freq2) {
    this.filter1.frequency.value = freq1;
    this.filter1.Q.value = 10;
    this.filter1Gain.gain.value = 1;
    this.filter2.frequency.value = freq2;
    this.filter2.Q.value = 10;
    this.filter2Gain.gain.value = 0.5;
  }

  addToWordQueue(words) {
    this.wordQueue = this.wordQueue.concat(words);
    this.nextSyllable(); // temp
  }

  nextWord() {
    if(this.wordQueue.length) {
      this.currentWord = new Word(this.wordQueue.shift());
      this.syllableQueue = Word.getSyllables(this.currentWord.rawPronunciation);
    } else {
      this.currentWord = null;
    }
  }

  nextSyllable() {
    if(this.syllableQueue.length) {
      this.currentSyllable = new Syllable(this.syllableQueue.shift());
      console.log(this.currentSyllable.getFormantValues(this.syllableProgress));
    } else {
      this.nextWord();
      if(this.currentWord) this.nextSyllable();
      else this.currentSyllable = null;
    }
  }

  update() {
    if(this.currentSyllable) {
      var currentFormant = this.currentSyllable.getFormantValues(this.syllableProgress);
      this.setFormant(currentFormant[0].frequency, currentFormant[1].frequency);
      this.currentSyllable.triggerWavetables(this.syllableProgress);
    }
  }
}
