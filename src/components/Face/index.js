import React from 'react';
import classNames from 'classnames';
import styles from './index.css';

export default class Face extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.lastDrawTime = Date.now();
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d");
    this.draw();
  }

  tweenMouth(t) {
    this.mouthPoints = [[-1,0],[-0.5,-0.5],[0.5,-0.5],[1,0],[0.5,0.5],[-0.5,0.5]];
  }

  draw() {

    var tweenTime = Date.now() - this.lastDrawTime;
    this.tweenMouth(tweenTime);
    this.lastDrawTime = Date.now();

    var c = this.ctx;
    c.clearRect(0,0,c.canvas.width,c.canvas.height);
    c.beginPath();
    c.arc(50,50,20,0,2*Math.PI);
    c.arc(150,50,20,0,2*Math.PI);
    c.fill();

    var mouthScale = 30;
    c.beginPath();
    for(var i = 0; i < this.mouthPoints.length; i ++) {
      if(i==0) c.moveTo(100+mouthScale*this.mouthPoints[i][0],120+mouthScale*this.mouthPoints[i][1]);
      else c.lineTo(100+mouthScale*this.mouthPoints[i][0],120+mouthScale*this.mouthPoints[i][1]);
    }
    c.closePath();
    c.lineWidth = 4;
    c.stroke();

    window.requestAnimationFrame(this.draw.bind(this));
  }

  render() {
    return(
      <div className={classNames(styles.this)}>
        <canvas ref="canvas"></canvas>
        <p>Mouth shape = {this.props.mouthShape}</p>
      </div>
    )
  }
}
