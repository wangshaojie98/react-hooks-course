import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts/core";
import { GaugeChart, BarChart, RadarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { Tabs } from "antd";
import "./index.scss";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
echarts.use([
  RadarChart,
  LegendComponent,
  GaugeChart,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
]);

export default function MyEcharts() {
  const chartRef = useRef({
    plan: null,
    bar: null,
    radar: null
  });

  const timerRef = useRef({
    plan: null,
    bar: null,
    radar: null
  });
  useEffect(() => {
    handlePlan();
    handleBar()
    handleRar()
    window.onresize = function() {
      console.log('onresize')
      chartRef.current.plan.resize();
      chartRef.current.bar.resize();
      chartRef.current.radar.resize();
    }
  }, []);

  const handlePlan = (res = 0.5) => {
    console.log('handlePlan')
    if (chartRef.current.plan) {
      chartRef.current.plan.dispose();
      chartRef.current.plan = null;
    }
    // 基于准备好的dom，初始化echarts实例
    const dom = document.getElementById("dashboard-plan");
    const map = {
      "0.875": "A+",
      "0.75": "A",
      "0.625": "A-",
      "0.5": "B+",
      "0.375": "B",
      "0.25": "B-",
      "0.125": "C",
      "0": "D",
    }
    const option = {
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.125, "#E1E9FA"],
                [0.25, "#C8D8FA"],
                [0.375, "#AFC7FA"],
                [0.5, "#96B7FA"],
                [0.625, "#7DA6FA"],
                [0.75, "#6495FA"],
                [0.875, "#4B84FA"],
                [1, "#3273F9"],
              ],
            },
          },
          anchor: {
            itemStyle: {
              borderWidth: 10,
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          splitLine: {
            distance: -20,
            length: 20,
            lineStyle: {
              color: "#fff",
              width: 5,
            },
          },
          axisLabel: {
            color: "#464646",
            fontSize: 20,
            distance: -60,
            formatter: function (value) {
              return "";
            },
          },
          title: {
            offsetCenter: [0, "12%"],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, "30%"],
            valueAnimation: true,
            formatter: function (value) {
              return map[Math.floor(value / 0.125) * 0.125];
            },
            color: "#000",
          },
          data: [
            {
              value: res,
              name: "学习策略-计划",
            },
          ],
        },
      ],
    };
    if (dom) {
      chartRef.current.plan = echarts.init(dom);
      // 绘制图表
      chartRef.current.plan.setOption(option);
      clearTimeout(timerRef.current.plan);
    } else {
      clearTimeout(timerRef.current.plan);
      timerRef.current.plan = setTimeout(() => {
        handlePlan(res)
        clearTimeout(timerRef.current.plan);
      })
    }
  };
  const handleBar = (res=0.5) => {
    console.log('handleBar')
    if (chartRef.current.bar) {
      chartRef.current.bar.dispose();
      chartRef.current.bar = null;
    }
    const dom = document.getElementById("dashboard-evaluate");
    const map = {
      "0.875": "A+",
      "0.75": "A",
      "0.625": "A-",
      "0.5": "B+",
      "0.375": "B",
      "0.25": "B-",
      "0.125": "C",
      "0": "D",
    }
    const option = {
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.125, "#F9EDC7"],
                [0.25, "#FAE7AF"],
                [0.375, "#FAE196"],
                [0.5, "#FCDC7E"],
                [0.625, "#FCD665"],
                [0.75, "#FACD4B"],
                [0.875, "#F9C632"],
                [1, "#F7BF19"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "#F7BF19",
            },
          },
          anchor: {
            itemStyle: {
              borderWidth: 10,
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          splitLine: {
            distance: -20,
            length: 20,
            lineStyle: {
              color: "#fff",
              width: 5,
            },
          },
          axisLabel: {
            color: "#464646",
            fontSize: 20,
            distance: -60,
            formatter: function (value) {
              return "";
            },
          },
          title: {
            offsetCenter: [0, "12%"],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, "30%"],
            valueAnimation: true,
            formatter: function (value) {
              return map[Math.floor(value / 0.125) * 0.125];
            },
            color: "#000",
          },
          data: [
            {
              value: res,
              name: "学习策略-评价与反思",
            },
          ],
        },
      ],
    };
    if (dom) {
      chartRef.current.bar = echarts.init(dom);
      // 绘制图表
      chartRef.current.bar.setOption(option);
      clearTimeout(timerRef.current.bar)
    } else {
      clearTimeout(timerRef.current.bar)
      setTimeout(() => {
        handleBar(res)
        clearTimeout(timerRef.current.bar)
      })
    }
    
    
  };

  const handleRar = (total, data) => {
    console.log('handleRar')
    if (chartRef.current.radar) {
      chartRef.current.radar.dispose();
      chartRef.current.radar = null;
    }
    const dom = document.getElementById("radar-map-portrait")
    const option = {
      title: {
        text: 'Customized Radar Chart'
      },
      legend: {},
      radar: [
        {
          indicator: [
            { name: '学习策略-计划策略', max: 100 },
            { name: '学习策略-评价与反思', max: 100 },
            { name: '学习风格-主动性', max: 100 },
            { name: '学习风格-坚韧性', max: 100 },
            { name: '学习风格-专注性', max: 100 },
            { name: '学习动力-学习兴趣', max: 100 },
            { name: '学习动力-学习自信', max: 100 },
          ],
          center: ['50%', '50%'],
          radius: 120,
          startAngle: 90,
          splitNumber: 4,
        }
      ],
      series: [
        {
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 4
            }
          },
          data: [
            {
              value: total || [100, 58, 64, 70, 10, 99, 88],
              name: '全体',
              areaStyle: {
                color: '#D6E3FD'
              }
            },
            {
              value: data || [88, 88, 88, 88, 88, 88, 88],
              name: '张小雪',
              areaStyle: {
                color: '#D6F5E9'
              }
            }
          ]
        },
      ]
    };

    if (dom) {
      chartRef.current.radar = echarts.init(dom);
      // 绘制图表
      chartRef.current.radar.setOption(option);
      clearTimeout(timerRef.current.radar)
    } else {
      clearTimeout(timerRef.current.radar)
      setTimeout(() => {
        handleRar()
        clearTimeout(timerRef.current.radar)
      })
    }
  }

  function callback(key) {
    if (key === "1") {
      handlePlan();
      return;
    }

    if (key === "2") {
      handleBar();
      return
    }

    if (key === "3") {
      handleRar();
      return 
    }
  }
  const onClickChangeData = () => {
    handlePlan(parseFloat(Math.random().toFixed(3)))
  }
  return (
    <div className="student-portrait">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <Tabs.TabPane tab="Tab 1" key="1">
            <div className="">
              <div id="radar-map-portrait"></div>

            </div>
            <div className="gauge-wrap">
              <div id="dashboard-evaluate"></div>
              <div id="dashboard-plan"></div>

            </div>
          <button onClick={onClickChangeData}>btn</button>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
