/* eslint-disable no-undef */
import React, {useEffect} from 'react';
import { useImmer } from "use-immer";
import { Divider, Select, Table, DatePicker } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Progress, SearchForm} from './components';
import 'moment/locale/zh-cn';

import './style.scss'
const options = []

const bgColorMap = {
  less60: '#1890FF',
  less90: '#0BB955',
  more90: '#FACC14',
}
function WorkBurden() {
  const [state, setState] = useImmer({
    avgBurdenMin: 68,
    lessThanSixtyMin: 12,
    moreThanSixtyMin: 78,
    moreThanNinetyMin: 10,
    burdenTimeTableData: [],
    columns: []
  })

  const [searchForm, setSeachForm] = useImmer({
    curMonth: '2021-12',
    role: '',
    timeSegment: null,
    grade: '',
    roleOptions: [],
    gradeOptions: []
  })

  const [searchData, setSeachData] = useImmer(null)
  const onMonthChange = (date) => {
    setSeachForm(prevState => {
      prevState.curMonth = date
    })
  }

  const getDetail = async (params={}) => {
    const res = await import('./mock.json')
    if (res) {
      const { average=0, rate_le_60=0, rate_le_90=0, rate_ge_90=0, day_info = [] } = res.data;

      const columns = [{
        title: '时长',
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
        width: 200
      }];
      const data = [];

      const less60Temp = {
        time: '≤60 分钟',
        key: "≤60 分钟"
      }
      const less90Temp = {
        time: '60 ~ 90分钟',
        key: "60 ~ 90分钟"
      }
      const more90Temp = {
        time: '＞90 分钟',
        key: "＞90 分钟"
      }
      day_info.forEach(item => {
        const day = item.day.slice(-5);
        less60Temp[day] = [null, undefined].includes(item.rate_le_60) ? '-' : item.rate_le_60;
        less90Temp[day] = [null, undefined].includes(item.rate_le_90) ? '-' : item.rate_le_90;
        more90Temp[day] = [null, undefined].includes(item.rate_ge_90) ? '-' : item.rate_ge_90;

        columns.push({
          title: day,
          dataIndex: day,
          key: day,
          width: 190,
          render(text, record) {
            if (text !== '-') {
              let bgColor = ''
              if (record.time === '≤60 分钟') {
                bgColor = bgColorMap.less60
              }
              if (record.time === '60 ~ 90分钟') {
                bgColor = bgColorMap.less90
              }
              if (record.time === '＞90 分钟') {
                bgColor = bgColorMap.more90
              }
              return (
                <Progress progress={text * 100} bgColor={bgColor} text={`${Number(text * 100).toFixed(2)}%`}/>
              )
            } else {
              return text;
            }
            
          }
        })
      })

      data.push(less60Temp, less90Temp, more90Temp);

      setState(prevState => {
        prevState.avgBurdenMin = average
        prevState.lessThanSixtyMin= rate_le_60
        prevState.moreThanSixtyMin= rate_le_90
        prevState.moreThanNinetyMin= rate_ge_90
        prevState.burdenTimeTableData= data
        prevState.columns = columns
      })
    }
  }

  const getSearchData = async () => {
    // const url = '/api/aqua/master_control/filter';
    // const params = {
    //   username: USER.username,
    //   school_id: USER.school_id
    // }
    const res = await import('./mock.json');
    if (res) {
      console.log(res)
      const data = res.data.data;
      const keys = Object.keys(data);
      setSeachData(data)
      const roleOptions = keys.map(key => ({label: data[key][key], value: key }));
      const curRole = roleOptions[0].value;

      const time = data[curRole].default_time
      const curTime = [moment(time.start_time), moment(time.end_time)];
      const curMonth = moment(time.start_time).format('YYYY-MM');


      const curGrades = data[curRole].grade
      const gradeOptions = Object.keys(curGrades).map(key => ({label: curGrades[key], value: key }));
      
      setSeachForm(form => {
        form.curMonth = curMonth
        form.role = curRole
        form.timeSegment = curTime
        form.roleOptions = roleOptions
        form.grade = gradeOptions[0].value
        form.gradeOptions = gradeOptions
      })
    }
  }

  const onRoleChange = (role) => {
    const roleData = searchData[role]

    const time = roleData.default_time
    const curTime = [moment(time.start_time), moment(time.end_time)];
    const curMonth = moment(time.start_time).format('YYYY-MM');


    const curGrades = roleData.grade
    const gradeOptions = Object.keys(curGrades).map(key => ({label: curGrades[key], value: key }));
    setSeachForm(form => {
      form.curMonth = curMonth
      form.role = role
      form.timeSegment = curTime
      form.grade = gradeOptions[0].value
      form.gradeOptions = gradeOptions
    })
  }
  const onTimeChange = (dateString) => {
    if (!dateString) {
      setSeachForm(form => {
        form.timeSegment = dateString
      })
      return
    }
    console.log('dateString', dateString);
    if (dateString.some(item => item === '')) {
        setSeachForm(form => {
          form.timeSegment = null
        })
        return
    }
    const start = dateString[0].format('YYYY-MM-DD')
    console.log(start)
    setSeachForm(form => {
      form.timeSegment = dateString
    })
  }

  function disabledDate(current) {
    if (!searchForm.timeSegment) {
      return false;
    }

    let startTime = searchForm.timeSegment && moment(searchForm.timeSegment[0]).format('YYYY-MM-DD');
    let endTime = searchForm.timeSegment && moment(searchForm.timeSegment[1]).format('YYYY-MM-DD');
    // Can not select days before today and today
    return (current && current > moment(endTime).endOf('month')) || (current && current < moment(startTime).startOf('month'));
  }

  const onGradeChange = (grade) => {
    setSeachForm(form => {
      form.grade = grade
    })
  }

  const resetTemp = () => {
    setSeachForm(form => {
      form.curMonth = ''
      form.role = ''
      form.timeSegment = null
      form.grade = ''
    })
  }
  const onSubmit = (type="search") => {
    if (!searchForm.timeSegment) {
      return;
    }

    if (type === 'reset') {
      resetTemp()
      return;
    }


    const start_time = `${moment(searchForm.timeSegment[0]).format('YYYY-MM-DD')} 00:00:00`;
    const end_time = `${moment(searchForm.timeSegment[1]).format('YYYY-MM-DD')} 23:59:59`;
    const params = {
      start_time,
      end_time,
      month_time: `${moment(searchForm.curMonth).format('YYYY-MM')}-01 00:00:00`,
      grade_id: searchForm.grade,
      // school_id: USER ? USER.school_id : '',
      school_id: '',
    }

    console.log({params})
  }
  useEffect(() => {
    getDetail()
    getSearchData()
  }, [])
  console.log(state)
  return (
    <div className="work-burden">
      <SearchForm 
        {...searchForm}
        onRoleChange={onRoleChange}
        onTimeChange={onTimeChange}
        onGradeChange={onGradeChange}
        onSubmit={onSubmit}
      />
      <header>
        <h3>各年级作业负担<QuestionCircleOutlined style={{opacity: 0.45}} /></h3>
        <div>
            
          月份：<DatePicker picker="month" disabledDate={disabledDate} local={locale} value={searchForm.curMonth ? moment(searchForm.curMonth, "YYYY-MM") : null} onChange={onMonthChange} />
        </div>
      </header>
      <Divider />
      <section className="work-burden-analysis">
        <article className="work-burden-avg">
          <h3>
            人均每天作业负担时长
          </h3>
          <p className="">
            <span className="min">{Number(state.avgBurdenMin).toFixed(0)}</span>
            <span className="min-label">分钟</span>
          </p>
        </article>
        <article className="work-burden-total">
          <h3>
            总体作业负担时长人数占比
          </h3>
          <ul>
            <li>
              <div className="min">≤60 分钟</div>
              <div className="title">{Number(state.lessThanSixtyMin * 100).toFixed(0)}%</div>
              <Progress progress={Number(state.lessThanSixtyMin * 100).toFixed(0)}/>
            </li>
            <li>
              <div className="min">60 ~ 90分钟</div>
              <div className="title">{Number(state.moreThanSixtyMin * 100).toFixed(0)}%</div>
              <Progress progress={Number(state.moreThanSixtyMin * 100).toFixed(0)} bgColor={bgColorMap.less90}/>
            </li>
            <li>
              <div className="min">＞90 分钟</div>
              <div className="title">{Number(state.moreThanNinetyMin * 100).toFixed(0)}%</div>
              <Progress progress={Number(state.moreThanNinetyMin * 100).toFixed(0)} bgColor={bgColorMap.more90}/>
            </li>
          </ul>
        </article>
      </section>
      <section className="work-burden-percent">
        <h3>每天作业负担时长人数占比</h3>
        <Table dataSource={state.burdenTimeTableData} columns={state.columns} scroll={{ x: 1300 }} bordered pagination={false}/>
      </section>
    </div>
  )
}

export default WorkBurden