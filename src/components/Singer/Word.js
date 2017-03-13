import PronunciationTool from './PronunciationTool';
import Syllable from './Syllable';
import Phoneme from './Phoneme';

export default class Word {
  constructor(rawWord) {
    this.rawPronunciation = PronunciationTool.getPronunciation(rawWord.toUpperCase());
  }

  static getSyllables(rawPronunciation) {
    var rawPhonemes = rawPronunciation.split(" ");
    var syllablePhase = 1; // 1 = initial consonant, 2 = vowel, 3 = end consonant
    var isVowel;
    var thisSyllablePhonemes = [];
    var syllables = [];
    for(var i = 0; i < rawPhonemes.length; i ++) {
      isVowel = Phoneme.isVowel(rawPhonemes[i]);
      if(thisSyllablePhonemes.length == 0) {
        syllablePhase = isVowel ? 2 : 1; // skip to phase 2 if no initial consonant
      } else {
        if(syllablePhase == 1 && isVowel) {
          // go to phase 2 if no more initial consonants
          syllablePhase = 2;
        } else if(syllablePhase == 2 && !isVowel) {
          // go to phase 3 if there is another consonant to go to
          syllablePhase = 3;
        } else if(syllablePhase != 1 && isVowel) {
          // end of syllable if any vowel is found when you were in phase 3
          // also, if in phase 2, end of syllable if second vowel found
          syllablePhase = isVowel ? 2 : 1; // skip to phase 2 if no initial consonant
          syllables.push(thisSyllablePhonemes);
          thisSyllablePhonemes = [];
        }
      }
      thisSyllablePhonemes.push(rawPhonemes[i]);
      if(i == rawPhonemes.length - 1 && thisSyllablePhonemes.length) {
        syllables.push(thisSyllablePhonemes);
      }
    }
    return syllables;
  }
}
