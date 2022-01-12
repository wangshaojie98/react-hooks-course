import React, { useEffect, useState } from 'react';
import { makeAutoObservable } from "mobx";
import { Select } from 'antd'
import { observer } from "mobx-react";

class Timer {
  secondsPassed = 0
  selectedVal = ''

  constructor() {
      makeAutoObservable(this)
  }

  increaseTimer = () => {
      this.secondsPassed += 1
  }

  handleChange = (val) => {
    this.selectedVal = val
  }
}

// const store = new Store();
const myTimer = new Timer()

const TimerView = observer(({ timer }) => {
  // const [store] = useState(() => new Store()) 
  useEffect(() => {
    console.log('useEffect', timer)
  })

  const handleChange = (val) => {
    timer.handleChange(val)
    console.log('handleChange', timer.selectedVal)
    submit()
  }

  const submit = async () => {
    const data = {
      secondsPassed: timer.secondsPassed,
      selectedVal: timer.selectedVal
    }
    
    const response = await fetch('xxxx', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // return response.json();
  }
  return (
    <div>
      {timer.secondsPassed}
      <button onClick={timer.increaseTimer}>++</button>
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    </div>
  )
})

export default function() {
  return <TimerView timer={myTimer} />
}
// export default View