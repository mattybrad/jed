export default class LipModel {
  constructor(actx) {
    this.filter = actx.createBiquadFilter();
    this.filter.type = "highpass"; // yeah...?
    this.filter.frequency.value = 100;
    this.input = this.filter;

  }

  connect(output) {
    this.filter.connect(output);
  }
}
