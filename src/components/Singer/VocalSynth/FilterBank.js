export default class FilterBank {
  constructor(actx) {
    var bottomValue = 50;
    var multiplier = 1.5;
    var numFilters = 14;
    var filterValues = [];
    var nextValue = bottomValue;
    while(filterValues.length < 14) {
      filterValues.push(nextValue);
      nextValue *= multiplier;
    }
    this.input = actx.createGain();
    this.gains = [];
    this.filters = [];
    var f, g;
    for(var i = 0; i < filterValues.length; i ++) {
      f = actx.createBiquadFilter();
      g = actx.createGain();
      if(i == 0) {
        f.type == "lowpass";
      // } else if(i == filterValues.length - 1) {
        // f.type == "highpass";
      } else {
        f.type == "bandpass";
        //f.Q.value = 50;
      }
      f.frequency.value = filterValues[i];
      g.gain.value = 0;

      this.input.connect(g);
      g.connect(f);

      this.filters[i] = f;
      this.gains[i] = g;
    }
  }

  setFilters(gainArray) {
    if(gainArray.length == this.gains.length) {
      for(var i = 0; i < gainArray.length; i ++) {
        this.gains[i].gain.value = gainArray[i];
      }
    } else {
      console.log("filter definition mismatch");
    }
  }

  connect(output) {
    for(var i = 0; i < this.filters.length; i ++) {
      this.filters[i].connect(output);
    }
  }
}
