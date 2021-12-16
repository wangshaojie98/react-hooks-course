import React from 'react';
import { Link } from "react-router-dom"
import ListWithMore from "../10/ListWithMore";
import CouterRenderProps from "../10/CouterRenderProps"
import Context from '../context'
import ECharts from "../echarts"
import StudyQuality from '../studyQuality'
import WorkBurden from '../workBurden'
import CodeDesign from '../codeDesign'
import MVP from '../mvp';
import Mobx from '../mobx/view'

export const routes = [
  ["10 ListWithMore", ListWithMore],
  ["10 CouterRenderProps", CouterRenderProps],
  ["11 Context", Context],
  ["12 Echarts", ECharts],
  ["13 StudyQuality", StudyQuality],
  ["14 WorkBurden", WorkBurden],
  ["14 CodeDesign", CodeDesign],
  ["15 MVP", MVP],
  ["16 MVC-Mobx", Mobx],
]
const Empty = () => ""
const Nav = () => (
  <React.Fragment>
    <Empty />
    <ul className="sider">
      { routes.map(([label]) => (
        <li key={label}>
          <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
        </li>
      ))}
    </ul>
  </React.Fragment>
)

export default Nav;