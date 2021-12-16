export const initState = {
  baseInfo: {
    taskName: '',
    schoolId: '',
  },
  otherInfo: {
    grade: '',
    subject: ''
  }
}

export const actionTypes = {
  BASE_INFO: {
    SET_TASK_NAME: "BASE_INFO/SET_TASK_NAME",
    SET_SCHOOLID: "BASE_INFO/SET_SCHOOLID",
  },
  OTHER_INFO: {
    SET_GRADER: "OTHER_INFO/SET_GRADER",
    SET_SUBJECT: "OTHER_INFO/SET_SUBJECT"
  }
}

export const handleBaseInfoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.BASE_INFO.SET_TASK_NAME:
      return { 
        ...state,
        taskName: action.payload 
      }
    case actionTypes.BASE_INFO.SET_SCHOOLID:
      return { 
        ...state,
        schoolId: action.payload
      }
    default:
      return state
  }
}

export const handleOtherInfoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.OTHER_INFO.SET_GRADER:
      return { 
        ...state,
        grade: action.payload 
      }
    case actionTypes.OTHER_INFO.SET_SUBJECT:
      return { 
        ...state,
        subject: action.payload
      }
    default:
      return state
  }
}