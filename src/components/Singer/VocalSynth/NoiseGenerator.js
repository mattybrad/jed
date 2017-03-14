export default class NoiseGenerator {
  constructor(actx) {
    this.noiseSource = actx.createBufferSource();

    var bufferSize = 100 * 4096; // 100 is pretty arbitrary right now
    var buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
    var data = buffer.getChannelData(0);
    for(var i = 0; i < bufferSize; i ++) {
      data[i] = 1 - 2 * Math.random();
    }
    this.noiseSource.buffer = buffer;
    this.noiseSource.loop = true;
  }

  start() {
    this.noiseSource.start(0);
  }

  connect(output) {
    this.noiseSource.connect(output);
  }
}
