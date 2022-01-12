export const formatFormModel = (data = {}) => {
  if (!data) return null;
  console.log('formatFormModel-data', data)
  const keys = Object.keys(data);
  const roleOptions = keys.map(key => ({label: data[key][key], value: key }));
  const curRole = roleOptions[0].value;

  const { timeSegment, currentMonth } = formatFormModelTime(data[curRole].default_time)

  const curGrades = data[curRole].grade
  const gradeOptions = formatFormModelGrade(curGrades);
  
  return {
    currentMonth,
    role: curRole,
    timeSegment,
    roleOptions,
    gradeOptions,
    grade: gradeOptions[0].value,
    roleMapData: data
  }
}

export const formatFormModelTime = ({start_time, end_time}) => {
  const timeSegment = [start_time, end_time];
  const currentMonth = start_time

  return {
    currentMonth,
    timeSegment
  }
}

export const formatFormModelGrade = (data) => {
  const gradeOptions = Object.keys(data).map(key => ({label: data[key], value: key }));

  return gradeOptions
}