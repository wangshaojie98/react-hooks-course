import React, { useEffect, useState } from 'react';
import { makeAutoObservable } from "mobx";
import { Select } from 'antd'
import { observer } from "mobx-react";

class Timer {
  secondsPassed = 0

  constructor() {
      makeAutoObservable(this)

      this.secondsPassed = 0
  }

  increase() {
      // setInterval(() => {
      //   this.secondsPassed += 1
      // }, 1000)
      this.secondsPassed += 1
  }

  reset() {
      this.secondsPassed = 0
  }
}

let timer = new Timer();
const TimerView = observer(() => {
  // useEffect(() => {
  //   timer = new Timer()
  // }, [])
  return (<button onClick={() => timer.increase()}>已过秒数：{timer.secondsPassed}</button>)
})

export default TimerView