import React, { useEffect } from "react";
import { Select, Button, DatePicker, Affix } from "antd";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";
import 'moment/locale/zh-cn';

import "./style.scss";
moment.locale('zh-cn');

function WorkBurdenSearchForm(props) {
  const {
    role = "",
    timeSegment = [],
    grade = "",
    roleOptions = [],
    gradeOptions = [],
    onRoleChange = () => {},
    onTimeChange = () => {},
    onGradeChange = () => {},
    onSubmit = (type = "search") => {},
  } = props;

  return (
    <Affix offsetTop={30}>
      <div className="search-form">
        <div className="search-item">
          <span>角色：</span>
          <Select options={roleOptions} value={role} onChange={onRoleChange} style={{width: 240}}/>
        </div>
        <div className="search-item">
          <span>时间：</span>
          <DatePicker.RangePicker
            style={{width: 240}}
            local={locale}
            onChange={onTimeChange}
            value={
              timeSegment
                ? [
                    moment(timeSegment[0], "YYYY-MM-DD"),
                    moment(timeSegment[1], "YYYY-MM-DD"),
                  ]
                : null
            }
            placeholder={["开始时间", "结束时间"]}
          />
        </div>
        <div className="search-item">
          <span>年级：</span>
          <Select
            style={{width: 240}}
            options={gradeOptions}
            value={grade}
            onChange={onGradeChange}
          />
        </div>
        <div className="search-btn">
          <Button
            onClick={() => {
              onSubmit("reset");
            }}
            style={{marginRight: 16}}
          >
            恢复默认
          </Button>
          <Button
            onClick={() => {
              onSubmit("search");
            }}
          >
            应用条件
          </Button>
        </div>
        <p className="tip">*默认展示当前学期数据，按周统计趋势</p>
      </div>
    </Affix>
  );
}

export default WorkBurdenSearchForm;
