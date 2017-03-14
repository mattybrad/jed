export default class Crossfader {
  constructor(actx) {
    this.firstInput = actx.createGain();
    this.secondInput = actx.createGain();
  }

  connect(output) {
    this.firstInput.connect(output);
    this.secondInput.connect(output);
  }
}
