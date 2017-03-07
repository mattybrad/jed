function onChange(fraction) {
  console.log(getInterpolatedFormant(syllables[0], fraction));
}

function lerp(a, b, f) {
  return a + f * (b - a);
}

function getInterpolatedFormant(syllable, fraction) {
  if(syllable.vowels.length == 0) return null;
  else if(syllable.vowels.length == 1) return null;
  else {
    var v = syllable.vowels;
    var v1, v2;
    for(var i = 0; i < v.length - 1; i ++) {
      if(fraction >= v[i].position) {
        v1 = v[i];
        v2 = v[i+1];
      }
    }
    var positionDelta = v2.position - v1.position;
    var adjustedFraction = (fraction - v1.position) / positionDelta;
    var f1 = formants[v1.sound];
    var f2 = formants[v2.sound];
    var out = [];
    for(var i = 0; i < 2; i ++) {
      out[i] = {
        frequency: lerp(f1.formants[i].frequency, f2.formants[i].frequency, adjustedFraction),
        gain: lerp(f1.formants[i].gain, f2.formants[i].gain, adjustedFraction)
      }
    }
    return out;
  }
}

var formants = {
  "ɛ": {
    formants: [
      {
        frequency: 610,
        gain: 1
      },
      {
        frequency: 1900,
        gain: 1
      }
    ]
  },
  "i": {
    formants: [
      {
        frequency: 240,
        gain: 1
      },
      {
        frequency: 2400,
        gain: 1
      }
    ]
  }
}

var syllables = [
  {
    vowels: [
      {
        sound: "ɛ",
        position: 0
      },
      {
        sound: "i",
        position: 1
      }
    ]
  }
]
