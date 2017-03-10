import * as localForage from "localforage";

var pronunciations = {};

export default class PronunciationTool {
  static init(forceReload, callback) {
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
}
