import React from 'react';
import './style.scss';

function Progress(props) {
  const { 
    width = 84, 
    bgColor = '#1890FF',
    progress=0,
    text
  } = props

  const realWidth = `calc(${progress}%)`;
  return (
    <div className="progress-wrap">
      <div className="progress" style={{width}}>
        <div className="progress-item" style={ {width: realWidth, backgroundColor: bgColor }} />
      </div>
      {
        text && <span style={{marginLeft: 10}}>{text}</span>
      }
    </div>
  )
}

export default Progress