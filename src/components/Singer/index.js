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
      //this.setFormant(currentFormant[0].frequency, currentFormant[1].frequency);
      //this.currentSyllable.triggerWavetables(this.syllableProgress);
      this.vocalSynth.vocalTractModel.setFormant(0, currentFormant[0].frequency, 10, 1);
      this.vocalSynth.vocalTractModel.setFormant(1, currentFormant[1].frequency, 10, 0.5);
      this.vocalSynth.vocalTractModel.setFormant(2, 0, 10, 0);
    }
  }
}
