export default class Phoneme {
  static isVowel(rawPhoneme) {
    return "AEIOU".indexOf(rawPhoneme.charAt(0))>-1;
  }
}
