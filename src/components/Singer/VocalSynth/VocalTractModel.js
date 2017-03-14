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

    this.setFormant(0, 599, 10, 0);
    this.setFormant(1, 891, 10, 0);
    this.setFormant(2, 2605, 10, 0);
  }

  connect(output) {
    for(var i = 0; i < NUM_FORMANTS; i ++) {
      this.filterGains[i].connect(output);
    }
  }

  setFormant(formantNumber, frequency, Q, gain) {
    this.filters[formantNumber].frequency.value = frequency;
    this.filters[formantNumber].Q.value = Q;
    this.filterGains[formantNumber].gain.value = gain;
  }
}
