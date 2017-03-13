import Phoneme from './Phoneme';
import PronunciationTool from './PronunciationTool';
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
  }

  placeNodes() {
    var nodes = [];
    var n;
    var vowelFoundYet = false;
    for(var i = 0; i < this.sounds.length; i ++) {
      if(Phoneme.isVowel(this.sounds[i])) {
        var vowelSequence = PronunciationTool.getVowelSequence(this.sounds[i]);
        vowelSequence.forEach(function(vowel){
          n = new SoundNode("formant", vowel);
          n.position = vowelFoundYet ? 1 : 0;
          nodes.push(n);
          vowelFoundYet = true;
        })
      } else {
        n = new SoundNode("wavetable", this.sounds[i]);
        n.position = vowelFoundYet ? 1 : 0;
        nodes.push(n);
      }
    }

    this.nodes = nodes;
  }

  getFormantValues(position) {
    var n = this.nodes;
    var prev = null;
    var next = null;
    for(var i = 0; i < n.length; i ++) {
      if(n[i].type == "formant") {
        if(position >= n[i].position) prev = n[i];
        if(position < n[i].position) next = n[i];
      }
    }
    if(prev&&next) {
      // if two formants are defined, return a lerped mix of the two
      var adjustedPosition = position; // temp
      var f1 = Formants[prev.sound];
      var f2 = Formants[next.sound];
      var out = [];
      for(var i = 0; i < 2; i ++) {
        out[i] = {
          frequency: lerp(f1[i], f2[i], adjustedPosition),
          gain: 1
        }
      }
      return out;
    } else {
      return null;
    }
  }

  triggerWavetables(position) {
    var n = this.nodes;
    for(var i = 0; i < n.length; i ++) {
      if(n[i].type == "wavetable" && !n[i].triggered && position >= n[i].position) {
        n[i].trigger();
      }
    }
  }
}
