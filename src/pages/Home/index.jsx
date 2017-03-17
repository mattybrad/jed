import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import Singer from '../../components/Singer';
import Face from '../../components/Face';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rawWords: "these ways those ways you see I say",
      sliderValue: 0,
      syllableProgress: 0,
      sliderDirectionPositive: true,
      singerReady: false,
    }
    this.singer = new Singer();
    this.singer.init(this.onSingerReady.bind(this));
    //setInterval(this.tempIncrementSlider.bind(this), 50);
  }

  tempIncrementSlider() {
    var oldDirection = this.state.sliderDirectionPositive;
    var newDirection = this.state.sliderDirectionPositive;
    var sliderValue = oldDirection ? this.state.sliderValue + 0.05 : this.state.sliderValue - 0.05;
    if(oldDirection && sliderValue > 0.99) {
      newDirection = false;
    } else if(!oldDirection && sliderValue < 0.01) {
      newDirection = true;
    }
    var syllableProgress = newDirection ? sliderValue : 1 - sliderValue;
    if(newDirection != oldDirection) this.singer.nextSyllable();
    this.singer.syllableProgress = syllableProgress;
    this.setState({
      sliderValue: sliderValue,
      sliderDirectionPositive: newDirection,
      syllableProgress: syllableProgress
    })
  }

  onSingerReady() {
    this.setState({
      singerReady: true
    })
  }

  onTextChange(ev) {
    this.setState({
      rawWords: ev.target.value
    })
  }

  onSliderChange(ev) {
    var sliderValue = ev.target.value;
    var oldDirection = this.state.sliderDirectionPositive;
    var newDirection = this.state.sliderDirectionPositive;
    if(oldDirection && sliderValue > 0.99) {
      newDirection = false;
    } else if(!oldDirection && sliderValue < 0.01) {
      newDirection = true;
    }
    var syllableProgress = newDirection ? sliderValue : 1 - sliderValue;
    if(newDirection != oldDirection) this.singer.nextSyllable();
    this.singer.syllableProgress = syllableProgress;
    this.setState({
      sliderValue: sliderValue,
      sliderDirectionPositive: newDirection,
      syllableProgress: syllableProgress
    })
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.singer.addToWordQueue(this.state.rawWords.split(" "));
    this.setState({
      rawWords: ""
    })
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        {this.state.singerReady ?
          <div>
            <h1>testing</h1>
            <form onSubmit={this.onSubmit.bind(this)}>
              <textarea value={this.state.rawWords} onChange={this.onTextChange.bind(this)}/><br/>
              <input
                value={this.state.sliderValue}
                type="range"
                min={0}
                max={1}
                step={0.001}
                onChange={this.onSliderChange.bind(this)}
              /><br/>
              <input type="submit" value="Load words"></input>
            </form>
            <Face/>
          </div>
          :
          <p>Loading...</p>
        }
      </div>
    )
  }
}
