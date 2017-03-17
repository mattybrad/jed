export default class NoiseGenerator {
  constructor(actx, lowPassFrequency, noiseFunction) {
    this.noiseSource = actx.createBufferSource();
    this.filter = actx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = lowPassFrequency;
    this.noiseSource.connect(this.filter);

    var bufferSize = 100 * 4096; // 100 is pretty arbitrary right now
    var buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
    var data = buffer.getChannelData(0);
    for(var i = 0; i < bufferSize; i ++) {
      data[i] = noiseFunction ? noiseFunction() : 1 - 2 * Math.random();
    }
    this.noiseSource.buffer = buffer;
    this.noiseSource.loop = true;
  }

  start() {
    this.noiseSource.start(0);
  }

  connect(output) {
    this.filter.connect(output);
  }
}
