import { makeAutoObservable, runInAction } from 'mobx';
import Service from '@/service';
import { formatFormModel,  formatFormModelTime, formatFormModelGrade } from './formatter'
import { formModel } from './model'

class Controller {
  formModel = {};
  formLoading = false;
  test = {
    a: 1,
    arr: [{name: 'arr'}]
  }
  constructor(formModel) {
    this.formModel = formModel;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchFormModel(username='111', school_id='2222') {
    try {
      this.formLoading = true;
      const res = await Service.fetchForm({
        username,
        school_id
      })
      const formData = formatFormModel(res.data && res.data.data);
      runInAction(() => {
        this.formModel.initModel(formData);
        this.formLoading = false;
      })
    } catch (e) {
      console.log('e', e)
        runInAction(() => {
          this.formLoading = false;
        })
    }
  }

  onRoleChange(role) {
    const { setRole, setGrade, setGradeOptions, setCurrentMonthByTimeSegment } = this.formModel
    const roleData = this.formModel.roleMapData[role];

    const gradeOptions = formatFormModelGrade(roleData.grade)
    const grade = gradeOptions[0].value

    const { timeSegment } = formatFormModelTime(roleData.default_time);

    setRole(role);
    setGrade(grade)
    setGradeOptions(gradeOptions)
    setCurrentMonthByTimeSegment(timeSegment)

    this.onSubmit({ role })
  }

  onTimeSegmentChange(dateString) {
    if (!dateString) {
      this.formModel.setTimeSegment(null)
      return
    }

    if (dateString) {
      const start = dateString[0].format('YYYY-MM-DD')
      const end = dateString[1].format('YYYY-MM-DD')
      this.formModel.setTimeSegment([start, end]);

      this.onMonthChange(start)
    }

  }

  onMonthChange(date) {
    console.log('onMonthChange', date);
    this.onSubmit({ date })
    this.formModel.setCurrentMonth(date)
  }

  onGradeChange(grade) {
    this.formModel.setGrade(grade)
  }

  onFormReset() {

  }

  onSubmit() {
    this.test.a = Math.random()
    console.log(this.test.a)
  }
}

export default new Controller(formModel);