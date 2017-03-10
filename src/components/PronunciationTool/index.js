import * as localForage from "localforage";

function loadDictionary(callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  }
  // req.open("GET", "/assets/cmudict-0.7b.txt", true);
  req.open("GET", "/assets/test.txt", true);
  req.send();
}

function parseLine(line) {
  if(line.indexOf(";;;")==0) return null; // line is a comment
  else {
    var s = line.split("  ");
    if(s.length == 2) {
      return {
        word: s[0],
        pronunciation: s[1]
      }
    }
  }
  return null;
}

export default class PronunciationTool {
  static init(forceReload, callback) {
    var worker = new Worker("/assets/pronunciationWorker.js");
    worker.onmessage = function(event){
      console.log(event.data);
    }
    // localForage.getItem("A", function(err, res) {
    //   if(!res || forceReload) {
    //     loadDictionary(function(fileText) {
    //       var d = fileText.split("\n");
    //       var p;
    //       var dicLength = d.length;
    //       console.log(dicLength);
    //       var wordsProcessed = 0;
    //       for(var i = 0; i < dicLength; i ++) {
    //         p = parseLine(d[i]);
    //         if(p) localForage.setItem(p.word, p.pronunciation, function() {
    //           wordsProcessed ++;
    //           if(wordsProcessed == dicLength) callback();
    //         });
    //         else wordsProcessed ++;
    //       }
    //     })
    //   } else {
    //     callback();
    //   }
    // })
  }

  static getPronunciation() {

  }
}
