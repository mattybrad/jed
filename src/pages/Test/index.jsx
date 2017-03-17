import React from 'react';
import classNames from 'classnames';
import styles from './index.css';
import Singer from '../../components/Singer';

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.singer = new Singer();
    this.singer.init(this.onSingerReady.bind(this));
  }

  onSingerReady() {
    this.setState({
      singerReady: true
    })
  }

  onValueChange(param, ev) {
    var obj = {};
    obj[param] = ev.target.value;
    this.setState(obj);
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        {this.state.singerReady ?
          <div>
            <h1>play area</h1>
          </div>
          :
          <p>Loading test...</p>
        }
      </div>
    )
  }
}
