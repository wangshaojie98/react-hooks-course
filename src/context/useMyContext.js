import React, { useContext } from 'react';
// const ContextObj = React.createContext();

const useContextValue = (ContextObj) => {
  const state = useContext(ContextObj);
  console.log('state', state)
  return state;
}

export default useContextValue