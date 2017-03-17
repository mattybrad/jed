import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Face extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.fillRect(Math.random()*400,Math.random()*400,10,10);
    window.requestAnimationFrame(this.draw.bind(this));
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <canvas ref="canvas"></canvas>
      </div>
    )
  }
}
