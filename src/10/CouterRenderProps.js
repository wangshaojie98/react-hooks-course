import React, { useState, useCallback } from 'react';

function CounterRenderProps({ children }) {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count])

  const decrement = useCallback(() => {
    setCount(count - 1);
  }, [count])

  return children({ count, increment, decrement });
}

const CounterRenderPropsExample = () => {
  return (
    <CounterRenderProps>
      {({ count, increment, decrement }) => {
        return (
          <div>
            <button onClick={decrement}>-</button>
              {count}
            <button onClick={increment}>+</button>
          </div>
        )
      }}
    </CounterRenderProps>
  )
}

const useCounter = () => {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count])

  const decrement = useCallback(() => {
    setCount(count - 1);
  }, [count])

  return { count, increment, decrement };
}

const CounterRenderPropsExample1 = () => {
  const { count, increment, decrement } = useCounter();
  return (
    <div className="exp-10-counter-render-props">
      <button onClick={decrement}> - </button>
        <span>{count}</span>
      <button onClick={increment}> + </button>
    </div>
  )
}
export default CounterRenderPropsExample1;