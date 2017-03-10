import localForage from 'localforage';

export default class PronunciationTool {
  static init() {
    PronunciationTool.loadDictionary(function(fileText) {
      alert(fileText);
    })
  }

  static loadDictionary(callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    req.open("GET", "/assets/test.txt", true);
    req.send();
  }

  static getPronunciation() {

  }
}
