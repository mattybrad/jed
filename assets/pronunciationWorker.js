function loadDictionary(callback) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  }
  req.open("GET", "/assets/cmudict-0.7b.txt", true);
  // req.open("GET", "/assets/test.txt", true);
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

loadDictionary(function(fileText) {
  var d = fileText.split("\n");
  var p;
  var dicLength = d.length;
  var wordsProcessed = 0;
  var dicObj = {};
  for(var i = 0; i < dicLength; i ++) {
    p = parseLine(d[i]);
    if(p) dicObj[p.word] = p.pronunciation;
  }
  postMessage({
    status: "done",
    data: dicObj
  });
})
