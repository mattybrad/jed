import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import Singer from '../../components/Singer';
import Param from './Param';

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      f1Freq: 500,
      f1Q: 10,
      f1Gain: 1
    }
    this.singer = new Singer();
    this.singer.init(this.onSingerReady.bind(this));
  }

  onSingerReady() {
    this.setState({
      singerReady: true
    })
  }

  onChange(param, ev) {
    var obj = {};
    obj[param] = parseFloat(ev.target.value);
    this.setState(obj);
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        {this.state.singerReady ?
        <div>
          <Param name="f1Freq" value={this.state.f1Freq} onChange={this.onChange.bind(this, "f1Freq")} min={10} max={8000} />
        <p>{JSON.stringify(this.state)}</p>
        </div>
        :
        <p>Loading test...</p>
        }
      </div>
    )
  }
}
