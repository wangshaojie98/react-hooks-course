const initState = {
  role: {
    show: true,
    value: '',
    options: [],
    type: 'default',
    changeMap: new Map(),
    // getChange(type) {
    //   initState.role.onChangeMap.get(type);
    // },
    // registerChange(type, fn) {
    //   initState.role.onChangeMap.set(type, fn);
    //   initState.role.type = type;
    // }
  },
  time: {
    show: true,
    value: '',
    options: [],
    // onChange: (val) => {}
  },
  grade: {
    show: true,
    value: '',
    options: [],
    // onChange: (val) => {}
  }
}

export const actionTypes = {
  role: {
    SET_VALUE: "SET_VALUE",
    SET_SHOW: "SET_SHOW",
    SET_OPTIONS: "SET_OPTIONS",
    SET_TYPE: "SET_TYPE",
    // GET_CHANGE: "GET_CHANGE",
    REGISTER_CHANGE: "REGISTER_CHANGE",
  },
  OTHER_INFO: {
    SET_GRADER: "OTHER_INFO/SET_GRADER",
    SET_SUBJECT: "OTHER_INFO/SET_SUBJECT"
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case actionTypes.role.GET_CHANGE:

  }
}

// const tab1 = {
//   regi
// }