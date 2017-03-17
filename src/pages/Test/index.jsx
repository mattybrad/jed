import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import VocalSynth from '../../components/Singer/VocalSynth';
import Param from './Param';

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      f1Freq: 569,
      f1Q: 10,
      f1Gain: 1,
      f2Freq: 1965,
      f2Q: 10,
      f2Gain: 1,
      f3Freq: 2636,
      f3Q: 10,
      f3Gain: 1,
      crossfade: 0,
      constrictionFade: 0,
      lipFreq: 1
    }
    this.vocalSynth = new VocalSynth();
  }

  componentDidUpdate() {
    var v = this.vocalSynth;
    v.crossfader.setFader(this.state.crossfade);
    v.vocalTractModel.setFormant(0,this.state.f1Freq,this.state.f1Q,this.state.f1Gain);
    v.vocalTractModel.setFormant(1,this.state.f2Freq,this.state.f2Q,this.state.f2Gain);
    v.vocalTractModel.setFormant(2,this.state.f3Freq,this.state.f3Q,this.state.f3Gain);
    v.lipModel.filter.frequency.value = this.state.lipFreq;
  }

  onChange(param, ev) {
    var obj = {};
    obj[param] = parseFloat(ev.target.value);
    this.setState(obj);
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <div>
          <Param name="f1Freq" value={this.state.f1Freq} onChange={this.onChange.bind(this, "f1Freq")} min={10} max={4000} />
          <Param name="f1Gain" value={this.state.f1Gain} onChange={this.onChange.bind(this, "f1Gain")} min={0} max={1} />
          <Param name="f1Q" value={this.state.f1Q} onChange={this.onChange.bind(this, "f1Q")} min={1} max={20} />
          <Param name="f2Freq" value={this.state.f2Freq} onChange={this.onChange.bind(this, "f2Freq")} min={10} max={4000} />
          <Param name="f2Gain" value={this.state.f2Gain} onChange={this.onChange.bind(this, "f2Gain")} min={0} max={1} />
          <Param name="f2Q" value={this.state.f2Q} onChange={this.onChange.bind(this, "f2Q")} min={1} max={20} />
          <Param name="f3Freq" value={this.state.f3Freq} onChange={this.onChange.bind(this, "f3Freq")} min={10} max={4000} />
          <Param name="f3Gain" value={this.state.f3Gain} onChange={this.onChange.bind(this, "f3Gain")} min={0} max={1} />
          <Param name="f3Q" value={this.state.f3Q} onChange={this.onChange.bind(this, "f3Q")} min={1} max={20} />
          <Param name="crossfade" value={this.state.crossfade} onChange={this.onChange.bind(this, "crossfade")} min={0} max={1} />
          <Param name="constrictionFade" value={this.state.constrictionFade} onChange={this.onChange.bind(this, "constrictionFade")} min={0} max={1} />
          <Param name="lipFreq" value={this.state.lipFreq} onChange={this.onChange.bind(this, "lipFreq")} min={1} max={1000} />
        <p>{JSON.stringify(this.state)}</p>
        </div>
      </div>
    )
  }
}
