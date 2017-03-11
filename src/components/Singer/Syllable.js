import Phoneme from './Phoneme';
import PronunciationTool from '../PronunciationTool';
import Formants from './Formants';

function lerp(a, b, f) {
  return a + f * (b - a);
}

export default class Syllable {
  constructor(rawSyllable) {
    this.rawSyllable = rawSyllable;
    this.vowelSequence = [];
    console.log(rawSyllable);

    // find vowel
    var rawPhonemes = rawSyllable;
    var vowel = null;
    for(var i = 0; i < rawPhonemes.length; i ++) {
      if(Phoneme.isVowel(rawPhonemes[i])) vowel = rawPhonemes[i];
    }
    if(vowel) this.vowelSequence = PronunciationTool.getVowelSequence(vowel);
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
      console.log(f1,f2);
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
