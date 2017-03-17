import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import VocalSynth from '../../components/Singer/VocalSynth';
import Param from './Param';

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      f1Freq: 500,
      f1Q: 10,
      f1Gain: 1,
      crossfade: 0,
      constrictionFade: 0,
      lipFreq: 20000
    }
    this.vocalSynth = new VocalSynth();
  }

  componentDidUpdate() {
    var v = this.vocalSynth;
    v.crossfader.setFader(this.state.crossfade);
    v.vocalTractModel.setFormant(0,this.state.f1Freq,this.state.f1Q,this.state.f1Gain);
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
          <Param name="f1Freq" value={this.state.f1Freq} onChange={this.onChange.bind(this, "f1Freq")} min={10} max={2000} />
          <Param name="f1Gain" value={this.state.f1Gain} onChange={this.onChange.bind(this, "f1Gain")} min={0} max={1} />
          <Param name="f1Q" value={this.state.f1Q} onChange={this.onChange.bind(this, "f1Q")} min={1} max={20} />
          <Param name="crossfade" value={this.state.crossfade} onChange={this.onChange.bind(this, "crossfade")} min={0} max={1} />
          <Param name="constrictionFade" value={this.state.constrictionFade} onChange={this.onChange.bind(this, "constrictionFade")} min={0} max={1} />
          <Param name="lipFreq" value={this.state.lipFreq} onChange={this.onChange.bind(this, "lipFreq")} min={1} max={20000} />
        <p>{JSON.stringify(this.state)}</p>
        </div>
      </div>
    )
  }
}
