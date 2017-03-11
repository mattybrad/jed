import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import PronunciationTool from '../../components/PronunciationTool';
import Singer from '../../components/Singer';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rawWords: "I am testing the system for syllables",
      pronunciationToolReady: false
    }
    this.singer = new Singer();
    PronunciationTool.init(true, function() {
      this.setState({
        pronunciationToolReady: true
      })
    }.bind(this));
  }

  onTextChange(ev) {
    this.setState({
      rawWords: ev.target.value
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
        {this.state.pronunciationToolReady ?
          <div>
            <h1>testing</h1>
            <form onSubmit={this.onSubmit.bind(this)}>
              <textarea value={this.state.rawWords} onChange={this.onTextChange.bind(this)}/><br/>
              <input type="submit" value="Load words"></input>
            </form>
          </div>
          :
          <p>Loading...</p>
        }
      </div>
    )
  }
}
