import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { CustomChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CustomChart,
  CanvasRenderer
]);

const colorMap = {
  选择题: '#1890FF',
  填空题: '#13C2C2',
  解答题: '#8543E0'
};
// Generate mock

function renderItem(params, api) {
  var categoryIndex = api.value(0);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  var height = 20;
  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  );
  return (
    rectShape && {
      type: 'rect',
      transition: ['shape'],
      shape: rectShape,
      style: api.style()
    }
  );
}

function TimeAnalysis({ curTimeAnalysisData }) {
  const echartRef = useRef(null);
  const timerRef = useRef(null);
  const { goodStudent, student } = curTimeAnalysisData

  const handleChart = () => {
    var data = [];
      var categories = ['标杆学生', student.name];
      const list = [...goodStudent.items_data, ...student.items_data]
      console.log(list)
      categories.forEach(function (category, index) {
        let num = 0;
        for (var i = 0; i < list.length; i++) {
          
          const item = list[i];
          data.push({
            name: item.type_name,
            value: [index, num, num + item.elapsed_time, item.elapsed_time],
            itemStyle: {
              normal: {
                color: colorMap[item.type_name]
              }
            }
          });
          num += item.elapsed_time + 0.1;
        }
      });
      const option = {
        tooltip: {
          formatter: function (params) {
            return params.marker + params.name + ': ' + params.value[3] + ' 分钟';
          }
        },
        title: {
          text: 'Profile',
          left: 'center',
          show: false
        },
        // dataZoom: [
        //   {
        //     type: 'slider',
        //     filterMode: 'weakFilter',
        //     showDataShadow: false,
        //     top: 400,
        //     labelFormatter: ''
        //   },
        //   {
        //     type: 'inside',
        //     filterMode: 'weakFilter'
        //   }
        // ],
        grid: {
          height: 100
        },
        xAxis: {
          min: 0,
          scale: true,
          axisLabel: {
            formatter: function (val) {
              return val;
            }
          }
        },
        yAxis: {
          data: categories
        },
        series: [
          {
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: data
          }
        ]
      };
      if (echartRef.current) {
        echartRef.current.dispose();
        echartRef.current = null;
    }
      const dom = document.getElementById('study-quality-time-analysis');
      if (dom) {
        echartRef.current = echarts.init(dom);
        // 绘制图表
        echartRef.current.setOption(option);
        clearTimeout(timerRef.current);
    } else {
        clearTimeout(timerRef.current);
        setTimeout(() => {
            handleChart();
            clearTimeout(timerRef.current);
        });
    }
  }
  useEffect(() => {
    handleChart();
  }, [curTimeAnalysisData])

  

  return (
    <div id="study-quality-time-analysis" style={{width: '100%', height: '180px'}}></div>
  )
}

export default TimeAnalysis
