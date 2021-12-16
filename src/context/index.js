import { div } from 'prelude-ls';
import React, { useReducer } from 'react';
import { handleBaseInfoReducer, handleOtherInfoReducer } from './reducer';
import useContextValue from './useMyContext'

const initState = {
  baseInfo: {
    taskName: '111',
    schoolId: '222',
  },
  otherInfo: {
    grade: '333',
    subject: '4444'
  }
}

const ContextObj = React.createContext();
const ContextPage = () => {
  const baseInfo = useReducer(handleBaseInfoReducer, initState.baseInfo);
  const otherInfo = useReducer(handleOtherInfoReducer, initState.otherInfo);
  const _state = {
    baseInfo,
    otherInfo
  }
  return (
    <ContextObj.Provider value={_state}>
      <BasePage />
      <OtherPage />

    </ContextObj.Provider>
  )

}


const BasePage = () => {
  const [baseInfo, dispatch] = useContextValue(ContextObj).baseInfo;
  // console.log(baseInfo);

  return (
    <div>
      <div>
      taskName: {baseInfo.taskName}
      <button onClick={
        () => {dispatch({type: 'BASE_INFO/SET_TASK_NAME', payload: Math.round(Math.random() * 100)})}
      }>
        改变
      </button>
    </div>
    <div>
    schoolId: {baseInfo.schoolId}
      <button onClick={
        () => {dispatch({type: 'BASE_INFO/SET_SCHOOLID', payload: Math.round(Math.random() * 100)})}
      }>
        改变
      </button>
    </div>
    </div>
  )
}

const OtherPage = () => {
  const [otherInfo, dispatch] = useContextValue(ContextObj).otherInfo;
  const [baseInfo] = useContextValue(ContextObj).baseInfo;

  // console.log(otherInfo);
  console.log('baseInfo', baseInfo)
  return (
    <div>
      <div>
      grade: {otherInfo.grade}
      <button onClick={
        () => {dispatch({type: 'OTHER_INFO/SET_GRADER', payload: Math.round(Math.random() * 100)})}
      }>
        改变
      </button>
    </div>
    <div>
    subject: {otherInfo.subject}
      <button onClick={
        () => {dispatch({type: 'OTHER_INFO/SET_SUBJECT', payload: Math.round(Math.random() * 100)})}
      }>
        改变
      </button>
    </div>
    </div>
  )
}

export default ContextPage