export default class SoundNode {
  constructor(type, sound) {
    this.type = type;
    this.position = 0;
    this.sound = sound;
    this.triggered = false;
  }

  trigger() {
    if(this.type == "wavetable") {
      this.triggered = true;
    }
  }
}
