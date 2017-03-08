import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Main extends React.Component {

  render() {
    return(
      <div className={classNames(styles.this)}>
        {this.props.children}
      </div>
    )
  }
}
