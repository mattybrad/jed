import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Param extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onChange(ev) {
    this.props.onChange(ev);
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <label>{this.props.name}</label>
        <input
          type="range"
          value={this.props.value}
          name={this.props.name}
          onChange={this.onChange.bind(this)}
        />
        <span>{this.props.value}</span>
      </div>
    )
  }
}
