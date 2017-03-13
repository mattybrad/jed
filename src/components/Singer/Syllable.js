import Phoneme from './Phoneme';
import PronunciationTool from '../PronunciationTool';
import Formants from './Formants';
import SoundNode from './SoundNode';

function lerp(a, b, f) {
  return a + f * (b - a);
}

export default class Syllable {
  constructor(sounds) {
    this.sounds = [];
    for(var i = 0; i < sounds.length; i ++) {
      this.sounds[i] = sounds[i].replace(/[0-9]/g, "")
    }
    this.placeNodes();
    console.log(this.nodes);
  }

  placeNodes() {
    var nodes = [];
    for(var i = 0; i < this.sounds.length; i ++) {
      if(Phoneme.isVowel(this.sounds[i])) {
        var vowelSequence = PronunciationTool.getVowelSequence(this.sounds[i]);
        vowelSequence.forEach(function(vowel){
          nodes.push(new SoundNode("formant", vowel));
        })
      } else {
        nodes.push(new SoundNode("wavetable", this.sounds[i]));
      }
    }
    this.nodes = nodes;
  }

  getFormantValues(syllableProgress) {
    var v = this.vowelSequence;
    if(v.length == 0) return null;
    else {
      var v1, v2;
      if(v.length == 1) {
        v1 = v2 = v[0];
      } else {
        for(var i = 0; i < v.length - 1; i ++) {
          if(syllableProgress >= 0) {
            v1 = v[i];
            v2 = v[i+1];
          }
        }
      }
      var positionDelta = 1;
      var adjustedsyllableProgress = syllableProgress;
      var f1 = Formants[v1];
      var f2 = Formants[v2];
      var out = [];
      for(var i = 0; i < 2; i ++) {
        out[i] = {
          frequency: lerp(f1[i], f2[i], adjustedsyllableProgress),
          gain: 1
        }
      }
      return out;
    }
  }
}
