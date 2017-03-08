var audioContext = null;
var myBuffer = null;

var osc = null;
function setDutyCycle(amt) {
	this.delay.delayTime.value = amt/this.frequency;
	this.dcGain.gain.value = 1.7*(0.5-amt);
}
function start(time) {
	this.osc1.start(time);
	this.osc2.start(time);
	this.dcOffset.start(time);
}
function stop(time) {
	this.osc1.stop(time);
	this.osc2.stop(time);
	this.dcOffset.stop(time);
}

function createDCOffset() {
	var buffer=audioContext.createBuffer(1,1,audioContext.sampleRate);
	var data = buffer.getChannelData(0);
	for (var i=0; i<1; i++)
		data[i]=1;
	var bufferSource=audioContext.createBufferSource();
	bufferSource.buffer=buffer;
	bufferSource.loop=true;
	return bufferSource;
}

function createPWMOsc(freq, dutyCycle) {
	var pwm = new Object();
	var osc1 = audioContext.createOscillator();
	var osc2 = audioContext.createOscillator();
	var inverter = audioContext.createGain();
	var output = audioContext.createGain();
	var delay = audioContext.createDelay();
	inverter.gain.value=-1;
	osc1.type="sawtooth";
	osc2.type="sawtooth";
	osc1.frequency.value=freq;
	osc1.frequency.value=freq;
	osc1.connect(output);
	osc2.connect(inverter);
	inverter.connect(delay);
	delay.connect(output);
	var dcOffset = createDCOffset();
	var dcGain = audioContext.createGain();
	dcOffset.connect(dcGain);
	dcGain.connect(output);

	output.gain.value = 0.5;  // purely for debugging.

	pwm.osc1=osc1;
	pwm.osc2=osc2;
	pwm.output=output;
	pwm.delay=delay;
	pwm.frequency = freq;
	pwm.dcGain=dcGain;
	pwm.dcOffset=dcOffset;
	pwm.setDutyCycle = setDutyCycle;
	pwm.start=start;
	pwm.stop=stop;

	pwm.setDutyCycle(dutyCycle);
	return pwm;
}

var pwmOsc;

function setupAudio() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContext();

	pwmOsc=createPWMOsc(110,0.04967);

  filter1 = audioContext.createBiquadFilter();
  filter2 = audioContext.createBiquadFilter();
  filter1.type = "bandpass";
  filter1.frequency.value = 10;
  filter1.Q.value = 10;
  filter2.type = "bandpass";
  filter2.frequency.value = 10;
  filter2.Q.value = 10;
  filterGain1 = audioContext.createGain();
  filterGain2 = audioContext.createGain();

  pwmOsc.output.connect(filter1);
  pwmOsc.output.connect(filter2);
  filter1.connect(filterGain1);
  filter2.connect(filterGain2);
  filterGain1.connect(audioContext.destination);
  filterGain2.connect(audioContext.destination);
	pwmOsc.start(audioContext.currentTime+0.05);

}

function setFilters(formant) {
	filter1.frequency.value = formant[0].frequency;
  filter2.frequency.value = formant[1].frequency;
  filterGain1.gain.value = formant[0].gain;
  filterGain2.gain.value = formant[1].gain;
}

var filter1;
var filter2;
var filterGain1;
var filterGain2;
setupAudio();

function onChange(fraction) {
  console.log(getInterpolatedFormant(syllables[0], fraction));
}

function lerp(a, b, f) {
  return a + f * (b - a);
}

function getInterpolatedFormant(syllable, fraction) {
  var v = syllable.vowels;
  if(v.length == 0) return null;
  else {
    var v1, v2;
    if(v.length == 1) {
      v1 = v2 = v[0];
    } else {
      for(var i = 0; i < v.length - 1; i ++) {
        if(fraction >= v[i].position) {
          v1 = v[i];
          v2 = v[i+1];
        }
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
  },
  "u": {
    formants: [
      {
        frequency: 250,
        gain: 1
      },
      {
        frequency: 595,
        gain: 1
      }
    ]
  },
  "ɑ": {
    formants: [
      {
        frequency: 850,
        gain: 1
      },
      {
        frequency: 1610,
        gain: 1
      }
    ]
  }
}

var syllables = [
  {
    vowels: [
      {
        sound: "u",
        position: 0
      },
      {
        sound: "ɑ",
        position: 0.2
      },
      {
        sound: "i",
        position: 1
      }
    ]
  },
  {
    vowels: [
      {
        sound: "ɑ",
        position: 0
      },
      {
        sound: "ɑ",
        position: 1
      }
    ]
  },
  {
    vowels: [
      {
        sound: "i",
        position: 0
      },
      {
        sound: "u",
        position: 0.2
      },
      {
        sound: "u",
        position: 1
      }
    ]
  }
]

var syllableIndex = 0;
var forwards = true;
setInterval(function(){
  var sliderValue = document.getElementById("slider").value;
  if(forwards && sliderValue > 0.99) {
    forwards = false;
    syllableIndex ++;
    console.log(syllableIndex);
  } else if(!forwards && sliderValue < 0.01) {
    forwards = true;
    syllableIndex ++;
    console.log(syllableIndex);
  }
  var f = getInterpolatedFormant(syllables[syllableIndex], sliderValue);
  setFilters(f);
}, 20);
