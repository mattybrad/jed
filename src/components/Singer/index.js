import FourierCoefficients from './VocalSynth/FourierCoefficients';
import PronunciationTool from './PronunciationTool';
import Word from './Word';
import Syllable from './Syllable';
import SoundNode from './SoundNode';
import VocalSynth from './VocalSynth';

export default class Singer {
  constructor() {
    this.vocalSynth = new VocalSynth();
  }

  init(callback) {
    var actx = new AudioContext();
    PronunciationTool.init(function() {
      this.wordQueue = [];
      this.currentWord = null;
      this.syllableQueue = [];
      this.currentSyllable = null;
      this.currentFormant = [
        {frequency: 599, gain: 1},
        {frequency: 891, gain: 1},
        {frequency: 2605, gain: 1},
      ];
      this.syllableProgress = 0;
      setInterval(this.update.bind(this), 20);
      callback();
    }.bind(this));
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
    } else {
      this.nextWord();
      if(this.currentWord) this.nextSyllable();
      else this.currentSyllable = null;
    }
  }

  update() {
    if(this.currentSyllable) {
      this.currentFormant = this.currentSyllable.getFormantValues(this.syllableProgress) || this.currentFormant;
      var voiced = this.currentSyllable.getVoicedValue(this.syllableProgress);
      var constriction = this.currentSyllable.getConstrictionValues(this.syllableProgress);
      this.vocalSynth.masterGain.gain.value = Math.min(1, this.syllableProgress / 0.05, (1 - this.syllableProgress) / 0.05); // temp
      this.vocalSynth.crossfader.setFader(voiced);
      this.vocalSynth.constrictionFader.setFader(0.4 * constriction.amount);
      this.vocalSynth.vocalTractModel.setFormant(0, this.currentFormant[0].frequency, 10, 1);
      this.vocalSynth.vocalTractModel.setFormant(1, this.currentFormant[1].frequency, 10, 0.6);
      this.vocalSynth.vocalTractModel.setFormant(2, this.currentFormant[2].frequency, 10, 0.3);
    }
  }
}
