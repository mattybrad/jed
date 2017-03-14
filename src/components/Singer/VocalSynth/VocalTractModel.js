const NUM_FORMANTS = 3;

export default class VocalTractModel {
  constructor(actx) {
    this.input = actx.createGain();
    this.filters = [];
    this.filterGains = [];

    for(var i = 0; i < NUM_FORMANTS; i ++) {
      this.filters[i] = actx.createBiquadFilter();
      this.filters[i].type = "bandpass";
      this.filterGains[i] = actx.createGain();

      this.input.connect(this.filters[i]);
      this.filters[i].connect(this.filterGains[i]);
    }
  }

  connect(output) {
    for(var i = 0; i < NUM_FORMANTS; i ++) {
      this.filterGains[i].connect(output);
    }
  }
}
