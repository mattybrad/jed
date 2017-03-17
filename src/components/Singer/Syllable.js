import Phoneme from './Phoneme';
import PronunciationTool from './PronunciationTool';
import Formants from './Formants';
import SoundNode from './SoundNode';

function lerp(a, b, f) {
  return a + f * (b - a);
}

export default class Syllable {
  constructor(sounds) {
    this.sounds = [];
    for(var i = 0; i < sounds.length; i ++) {
      this.sounds[i] = sounds[i].replace(/[0-9]/g, "")
    }
    this.placeEvents();
    console.log(sounds);
  }

  placeEvents() {
    var formantEvents = [];
    var voicedEvents = [];
    var constrictionEvents = [];
    var events;
    var relativePosition = 0;
    for(var i = 0; i < this.sounds.length; i ++) {
      events = Phoneme.getEvents(this.sounds[i]);
      if(events) {
        if(events.formants) {
          events.formants.forEach(function(e) {
            e.position = e.position * events.relativeDuration + relativePosition;
            formantEvents.push(e);
          });
        }
        if(events.voiced) {
          events.voiced.forEach(function(e) {
            e.position = e.position * events.relativeDuration + relativePosition;
            voicedEvents.push(e);
          });
        }
        if(events.constriction) {
          events.constriction.forEach(function(e) {
            e.position = e.position * events.relativeDuration + relativePosition;
            constrictionEvents.push(e);
          });
        }
      }
      relativePosition += events.relativeDuration;
    }

    formantEvents.forEach(function(e){
      e.position = e.position / relativePosition;
    })
    voicedEvents.forEach(function(e){
      e.position = e.position / relativePosition;
    })
    constrictionEvents.forEach(function(e){
      e.position = e.position / relativePosition;
    })

    this.formantEvents = formantEvents;
    this.voicedEvents = voicedEvents;
    this.constrictionEvents = constrictionEvents;
  }

  getFormantValues(position) {
    var e = this.formantEvents;
    var prev = null;
    var next = null;
    for(var i = 0; i < e.length && !next; i ++) {
      if(e[i].formants && position >= e[i].position) prev = e[i];
      if(e[i].formants && position < e[i].position) next = e[i];
    }
    if(prev&&next) {
      // if two formants are defined, return a lerped mix of the two
      var positionDelta = next.position - prev.position;
      var adjustedPosition = (position - prev.position) / positionDelta;
      var out = [];
      for(var i = 0; i < 3; i ++) {
        out[i] = {
          frequency: lerp(prev.formants[i], next.formants[i], adjustedPosition),
          gain: 1
        }
      }
      return out;
    } else {
      return null;
    }
  }

  getVoicedValue(position) {
    var e = this.voicedEvents;
    var prev = null;
    var next = null;
    for(var i = 0; i < e.length && !next; i ++) {
      if(position >= e[i].position) prev = e[i];
      if(position < e[i].position) next = e[i];
    }
    return prev.voiced;
  }

  getConstrictionValues(position) {
    var e = this.constrictionEvents;
    var prev = null;
    var next = null;
    for(var i = 0; i < e.length && !next; i ++) {
      if(position >= e[i].position) prev = e[i];
      if(position < e[i].position) next = e[i];
    }
    return prev;
  }

  triggerWavetables(position) {
    var n = this.nodes;
    for(var i = 0; i < n.length; i ++) {
      if(n[i].type == "wavetable" && !n[i].triggered && position >= n[i].position) {
        n[i].trigger();
      }
    }
  }
}
