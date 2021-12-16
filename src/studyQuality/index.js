import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { Divider, Menu } from "antd";
import TimeAnalysis from './components/TimeAnalysis'

import "./style.scss";

export default function StudyQuality() {
  const [state, setState] = useImmer({
    activeKey: "",
    riskList: [],
    selectedClassData: {
      type: "",
      id: ""
    },
    studentList: [],
    curStudentData: null,
    curTimeAnalysisData: null
  });

  const setBorder = () => {
    const element = document.getElementsByClassName("risk-profile")[0];
    const borderDom = document.getElementsByClassName("border")[0];
    let height = 0;
    if (element) {
      height = element.clientHeight;
      borderDom.style.height = `${height + 10}px`;
    }
  };

  const getDetail = async () => {
    const res = await import("./mock.json");
    if (res && res.code === 200) {
      setState((state) => {
        state.riskList = res.data.classes_strategic;
        // state.studentList = res.data.students;
      });

      setTimeout(() => {
        setBorder()
      })
    }
  };

  const handleClickClass = (id, type) => {
    const typeToStudentKeyMap = {
      normal: "normal_students",
      middle: "potentially_risky_students",
      high: "risky_students",
    }
    setState((state) => {
      state.selectedClassData.id = id;
      const item = state.riskList.find(item => item.id === id);
      state.selectedClassData = item
      state.selectedClassData.type = type;
      state.studentList = item[typeToStudentKeyMap[type]]
    });
  };

  const getWorkTip = (type) => {
    const { normal_students = [], potentially_risky_students = [], risky_students = []} = selectedClassData
    const data = {
      labelClass: "",
      class: "",
      msg: "",
      length: ""
    }
    if (type === "normal") {
      data.labelClass = "green-bg"
      data.class = "alert-green"
      data.msg = "计划策略正常"
      data.length = normal_students.length || ""
    }
    if (type === "middle") {
      data.labelClass = "yellow-bg"
      data.class = "alert-yellow"
      data.msg = "计划策略存在潜在风险"
      data.length = potentially_risky_students.length || ""
    }
    if (type === "high") {
      data.labelClass = "red-bg"
      data.class = "alert-red"
      data.msg = "计划策略有风险"
      data.length = risky_students.length || ""
    }

    return data
  }

  const onClickStudent = async ({ key, keyPath, domEvent }) => {
    console.log({ key, keyPath, domEvent })
    const student = state.studentList.find(item => item.klx_id === key)
    if (student) {
      setState(state => {
        state.curStudentData = {
          ...student
        };
      })

      const res = await import("./mock.json");
      setState(state => {
        state.curTimeAnalysisData = {
          goodStudent: res.data.items_diff[0],
          student: res.data.items_diff[1],
        }
      })
        
    }
    
  }


  useEffect(() => {
    setBorder();
    getDetail();
  }, []);

  const { selectedClassData, curStudentData } = state;
  return (
    <div className="study-quality">
      <header>
        <h3>学生计划策略分析</h3>
        <Divider />
      </header>
      <main>
        <section>
          <h3>各班计划策略风险分步</h3>
          <div className="section-label-wrap">
            <div className="section-item">
              <span className="color-label green-bg"></span>
              <label>正常</label>
            </div>
            <div className="section-item">
              <span className="color-label yellow-bg"></span>
              <label>潜在风险</label>
            </div>
            <div className="section-item">
              <span className="color-label red-bg"></span>
              <label>有风险</label>
            </div>
          </div>
          <div className="risk-profile">
            {state.riskList.map((item, index) => {
              return (
                <div className="risk-item" key={index}>
                  <div className="risk-title">{item.name}</div>
                  <div
                    className={`risk-normal green-bg color-white risk-text ${(
                      selectedClassData.id === item.id 
                        && selectedClassData.type === "normal"
                      ) ? 'active' : ''}`}
                    style={{
                      flex: (item.normal_students && item.normal_students.length) || 1,
                      opacity: (
                        selectedClassData.id === item.id 
                          && selectedClassData.type === "normal"
                        ) ? 1 : 0.7,
                    }}
                    onClick={() => {handleClickClass(item.id, "normal")}}
                  >
                    {(item.normal_students && item.normal_students.length) || '--'}人
                  </div>
                  <div
                    className={`risk-middle yellow-bg color-black risk-text ${(
                      selectedClassData.id === item.id 
                        && selectedClassData.type === "middle"
                      ) ? 'active' : ''}`}
                    style={{
                      flex: (item.potentially_risky_students&&item.potentially_risky_students.length) || 1,
                      opacity: (
                        selectedClassData.id === item.id 
                          && selectedClassData.type === "middle"
                        ) ? 1 : 0.7,
                    }}
                    onClick={() => {handleClickClass(item.id, "middle")}}
                  >
                    {(item.potentially_risky_students&&item.potentially_risky_students.length) || '--'}人
                  </div>
                  <div
                    className={`risk-high red-bg color-white risk-text ${(
                      selectedClassData.id === item.id 
                        && selectedClassData.type === "high"
                      ) ? 'active' : ''}`}
                    style={{
                      flex: (item.risky_students&&item.risky_students.length) || 1,
                      opacity: (
                        selectedClassData.id === item.id 
                          && selectedClassData.type === "high"
                        ) ? 1 : 0.7,
                    }}
                    onClick={() => {handleClickClass(item.id, "high")}}
                  >
                    {(item.risky_students&&item.risky_students.length) || '--'}人
                  </div>
                </div>
              );
            })}
            <div className="border"></div>
          </div>
        </section>
        {
          selectedClassData.id && (
            <section className="study-quality-detail clear">
              <Alert 
                selectedClassData={selectedClassData}
                getWorkTip={getWorkTip}
              />
              <div className="study-quality-detail-main">
                <aside className="student-wrap">
                  <Menu
                    style={{ width: 256 }}
                    // mode={mode}
                    // theme={theme}
                    onClick={onClickStudent}
                    defaultSelectedKeys={state.curStudentData ? [state.curStudentData.klx_id] : [] }
                  >
                    {
                        state.studentList.map(student => {
                          return (
                            <Menu.Item key={student.klx_id}>
                              {student.name}
                            </Menu.Item>
                            
                          )
                        })
                      }
                    
                  </Menu>
                </aside>
                {
                  curStudentData && (
                    <div className="student-data-wrapper">
                      <article className="student-data">
                        <h2>{curStudentData.name}</h2>
                        <h3>各题作答时长分析</h3>
                        <div className="section-label-wrap">
                          <div className="section-item">
                            <span className="color-label choice-qs-bg"></span>
                            <label>正常</label>
                          </div>
                          <div className="section-item">
                            <span className="color-label completion-qs-bg"></span>
                            <label>潜在风险</label>
                          </div>
                          <div className="section-item">
                            <span className="color-label solve-qs-bg"></span>
                            <label>有风险</label>
                          </div>
                        </div>
                        {
                          state.curTimeAnalysisData && <TimeAnalysis curTimeAnalysisData={state.curTimeAnalysisData}/>
                        }
                      </article>
                      <article className="question-sorted-chart">
                        <h3>作答顺序分布图</h3>
                        <div className="section-label-wrap">
                          <div className="section-item">
                            <span className="color-label choice-qs-bg"></span>
                            <label>实际作答</label>
                          </div>
                          <div className="section-item">
                            <span className="color-label solve-qs-bg"></span>
                            <label>有风险</label>
                          </div>
                        </div>
                        {
                          state.curTimeAnalysisData && <TimeAnalysis curTimeAnalysisData={state.curTimeAnalysisData}/>
                        }
                      </article>
                    </div>
                  )
                }
              </div>
              
            </section>
          )
        }
        
      </main>
    </div>
  );
}

const Alert = ({selectedClassData={}, getWorkTip}) => {
  const data = getWorkTip(selectedClassData.type);

  return (
    <div className={`study-quality-detail-alert ${data.class}`}>
      <span className={
        `color-label ${data.labelClass}`
      }></span>
      <span style={{marginRight: 10}}>{selectedClassData.name}</span>
      <span style={{marginRight: 10}}>{data.msg}</span>
      <span>{data.length}人</span>
    </div>
  )
}
