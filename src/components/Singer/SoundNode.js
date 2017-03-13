var buffers = {};

export default class SoundNode {
  constructor(type, sound) {
    this.type = type;
    this.position = 0;
    this.sound = sound;
    this.triggered = false;
  }

  trigger() {
    if(this.type == "wavetable") {
      this.triggered = true;
      var bufferSource = SoundNode.actx.createBufferSource();
      bufferSource.buffer = buffers[this.sound];
      bufferSource.connect(SoundNode.actx.destination);
      bufferSource.start();
      console.log(this.sound);
    }
  }

  static init(actx, callback) {
    SoundNode.actx = actx;
    SoundNode.gainNode = actx.createGain();
    SoundNode.gainNode.gain.value = 0.1;
    var allWavetables = ["T"]; // all files to load

    buffers["T"] = null;

    function loadSound(url) {
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.responseType = 'arraybuffer';

      req.onload = function() {
        actx.decodeAudioData(req.response, function(buffer) {
          buffers["T"] = buffer;
          // temp
          // var bufferSource = actx.createBufferSource();
          // bufferSource.buffer = buffers["T"];
          // bufferSource.connect(actx.destination);
          // bufferSource.start();
          callback();
        }, function(){
          console.log("ERROR");
        });
      }
      req.send();
    }

    loadSound("/assets/wavetable/t.wav");
  }

}
