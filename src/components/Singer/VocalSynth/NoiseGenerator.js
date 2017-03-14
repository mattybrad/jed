export default class NoiseGenerator {
  constructor(actx) {
    var node = context.createBufferSource()
      , buffer = context.createBuffer(1, 4096, context.sampleRate)
      , data = buffer.getChannelData(0);

    for (var i = 0; i < 4096; i++) {
     data[i] = Math.random();
    }
    node.buffer = buffer;
    node.loop = true;
    node.connect(context.destination);
    node.start(0);

    this.noiseSource = actx.createBufferSource();

    var bufferSize = 4096;
    var buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
    var data = buffer.getChannelData(0);
    for(var i = 0; i < bufferSize; i ++) {
      data[i] = 1 - 2 * Math.random();
    }
    this.noiseSource.buffer = buffer;
    this.noiseSource.loop = true;
    this.noiseSource.start(0);

  }

  connect(output) {
    this.noiseSource.connect(output);
  }
}
