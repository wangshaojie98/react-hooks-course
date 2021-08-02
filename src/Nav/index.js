import React from 'react';
import { Link } from "react-router-dom"
import ListWithMore from "../10/ListWithMore"

export const routes = [
  ["10 ListWithMore", ListWithMore]
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