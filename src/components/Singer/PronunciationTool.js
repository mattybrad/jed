var pronunciations = {};

export default class PronunciationTool {
  static init(callback) {
    var worker = new Worker("/assets/pronunciationWorker.js");
    worker.onmessage = function(event){
      if(event.data.status == "done") {
        pronunciations = event.data.data;
        worker.terminate();
        callback();
      }
    }
  }

  static getPronunciation(word) {
    return pronunciations[word];
  }

  static getVowelSequence(baseVowel) {
    var dipthongs = {
      "AW": ["AE","UW"],
      "AY": ["AA","IY"],
      "ER": ["AH","UH"],
      "EY": ["EH","IY"],
      "OW": ["AH","UW"],
      "OY": ["AO","IY"],
    }
    return (
      dipthongs.hasOwnProperty(baseVowel) ? dipthongs[baseVowel] : [baseVowel, baseVowel]
    )
  }
}
