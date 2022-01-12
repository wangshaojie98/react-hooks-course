import { makeAutoObservable, runInAction, toJS } from 'mobx';

class FormModel {
  currentMonth = ''
  role = ''
  timeSegment = null
  grade = ''
  roleOptions = []
  gradeOptions = []
  roleMapData = null

  constructor(){
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentMonth(month) {
    this.currentMonth = month
  }

  setRole(role) {
    this.role = role
  }

  setRoleOptions(roleOptions) {
    this.roleOptions = roleOptions
  }

  setTimeSegment(timeSegment) {
    this.timeSegment = timeSegment
  }

  setGrade(grade) {
    this.grade = grade
  }

  setGradeOptions(gradeOptions) {
    this.gradeOptions = gradeOptions
  }

  setCurrentMonthByTimeSegment(timeSegment) {
    this.timeSegment = timeSegment;
    this.currentMonth = timeSegment;
  }

  
  initModel({
    currentMonth,
    role,
    timeSegment,
    roleOptions,
    gradeOptions,
    grade,
    roleMapData
  }) {
    this.setCurrentMonth(currentMonth)
    this.setRole(role)
    this.setTimeSegment(timeSegment)
    this.setGrade(grade)
    this.setRoleOptions(roleOptions)
    this.setGradeOptions(gradeOptions)
    this.roleMapData = roleMapData
  }

  toJSON() {
    return {
      currentMonth: this.currentMonth,
      role: this.role,
      timeSegment: toJS(this.timeSegment),
      roleOptions: toJS(this.roleOptions),
      gradeOptions: toJS(this.gradeOptions),
      grade: this.grade,
    }
  }
}

export const formModel = new FormModel();