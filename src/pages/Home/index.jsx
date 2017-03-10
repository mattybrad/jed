import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import PronunciationTool from '../../components/PronunciationTool';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rawWords: "these words are my own"
    }
    PronunciationTool.init(true, function() {
      console.log("DONE");
    });
  }

  onTextChange(ev) {
    this.setState({
      rawWords: ev.target.value
    })
  }

  onSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <h1>testing</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <textarea value={this.state.rawWords} onChange={this.onTextChange.bind(this)}/><br/>
          <input type="submit" value="Load words"></input>
        </form>
      </div>
    )
  }
}
