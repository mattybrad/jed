export default class Crossfader {
  constructor(actx) {
    this.firstInput = actx.createGain();
    this.secondInput = actx.createGain();
    this.setFader(0);
  }

  connect(output) {
    this.firstInput.connect(output);
    this.secondInput.connect(output);
  }

  setFader(faderValue) {
    faderValue = Math.min(1, Math.max(0, faderValue));
    this.firstInput.gain.value = 1 - faderValue;
    this.secondInput.gain.value = faderValue;
  }
}
