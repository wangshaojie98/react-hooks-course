import React, { useState, useEffect } from "react"

import Service from '@/service'
import './style.scss';

import { 
  TitleInsideWrap, 
  PdfTable, 
  IntervalLineChart,
  FacetingChart,
  SectionList
 } from './components';

const PDF = () => {
  const [tableState, setTableState] = useState({
    columns: [],
    tableList: []
  })
  const [intervalLineInfo, setIntervalLineInfo] = useState(null)
  const [facetingInfo, setFacetingInfo] = useState(null)
  const [sectionList, setSectionList] = useState(null)

  const emptyType = [null, undefined, ''];
  const columns = [
    {
      title: '学籍号',
      dataIndex: 'study_id',
      width: 220,
      align: 'center'
    },
    {
      title: '校内学号',
      dataIndex: 'student_number',
      align: 'center',
      render(text, record) {
        return emptyType.includes(text) ? '/' : text;
      }
    },
    {
      title: '学校',
      dataIndex: 'school_name',
      align: 'center',

    },
    {
      title: '班级',
      align: 'center',
      dataIndex: 'clazz_name',
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'real_name',
    },
    {
      title: '参考状态',
      align: 'center',
      dataIndex: 'exam_status',
      render(text, record) {
        return record.exam_status === '0' ? "正常" : "/"
      }
    },
    {
      title: '总分',
      align: 'center',
      dataIndex: 'total_score'
    },
  ]

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    getTableList()
    getIntervalLines()
    getFacetingInfo()
    getSectionList()
  }

  const getTableList = async () => {
    const res = await Service.fetchTableList();
    console.log(res);
    setTableState(prevState => ({
      ...prevState,
      tableList: res
    }))
  }

  const getIntervalLines = async () => {
    try {
      const res = await Service.fetchIntervalLine();
      setIntervalLineInfo(res)
      console.log(res)
    } catch (error) {
      
    }
  }

  const getFacetingInfo = async () => {
    try {
      const res = await Service.fetchFaceting();
      setFacetingInfo(res)
      console.log(res)
    } catch (error) {
      
    }
  }

  const getSectionList = async () => {
    try {
      const res = await Service.fetchSectionList();
      setSectionList(res)
      console.log(res)
    } catch (error) {
      
    }
  }
  return (
    <div className="pdf">
      <TitleInsideWrap>
        <h1>全区总体情况</h1>
        <h2>考试情况概览</h2>
        <p>
        闵行区2021学年第一学期高三年级质量监控考试包含语文、数学、英语、政治、历史、地理、物理、化学、生物共9个学科，语文、数学、英语满分为150分，其余学科满分均为100分，现对闵行区2021学年第一学期高三年级质量监控考试的总体情况进行分析，并将各学科得分率进行全区及三类校间对比，详细结果如下：
        </p>
        <PdfTable 
          rowKey={(record) => record.study_id}
          dataSource={tableState.tableList.slice(0, 10)}
          columns={columns}
        />
      </TitleInsideWrap>
      <TitleInsideWrap>
        <h2>各科目得分率对比</h2>
        <div className="pdf-chart" style={{height: 194, backgroundColor: 'green'}}>
          图表
        </div>
      </TitleInsideWrap>
      <TitleInsideWrap>
        <h1>各各校达限情况</h1>
        <PdfTable 
          rowKey={(record) => record.study_id}
          dataSource={tableState.tableList.slice(0, 1)}
          columns={columns}
        />
        <div className="pdf-chart">
          {
            intervalLineInfo && 
            <IntervalLineChart 
            category={intervalLineInfo.category}
            lines={intervalLineInfo.lines}
            data={intervalLineInfo.data.slice(0, 31)}
            position='label*data'
          />
          }
        </div>
      </TitleInsideWrap>
      <TitleInsideWrap>
        <div className="pdf-chart">
          {
            intervalLineInfo && 
            <IntervalLineChart 
            // category={intervalLineInfo.category}
            lines={intervalLineInfo.lines}
            data={intervalLineInfo.data.slice(31)}
            position='label*data'
          />
          }
        </div>
      </TitleInsideWrap>
      <TitleInsideWrap>
        <h1>各校考试情况</h1>
        <h2>得分率对比</h2>
        <div className="pdf-chart">
          {
            facetingInfo && 
            <FacetingChart 
            category={facetingInfo.category}
            data={facetingInfo.data.slice(0, 32)}
            position='label*value'
          />
          }
          
        </div>
      </TitleInsideWrap>
      <TitleInsideWrap>
        {/* <h1>各校考试情况</h1>
        <h2>得分率对比</h2> */}
        <div className="pdf-chart">
          {
            facetingInfo && 
            <FacetingChart 
            category={facetingInfo.category}
            data={facetingInfo.data.slice(32)}
            position='label*value'
          />
          }
          
        </div>
      </TitleInsideWrap>
      <TitleInsideWrap>
        <h1>语文科目总体情况</h1>
        {
          sectionList &&
          <SectionList 
            list={sectionList}
            position='label*value'
          />
      }
      </TitleInsideWrap>
      
    </div>
  )
}

export default PDF