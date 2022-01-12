import React from 'react'
import './style.scss'

const baseClass = 'sectionList'
const SectionList = ({ list = [], position="label*value", labelColor="rgba(255, 255, 255, 0.5)", valueColor="#FFFFFF", bgColor="#4C82F7" }) => {
  const splitArr = position.split("*");
  const [ labelKey, valueKey ] = splitArr;
  return (
    <ul className={`${baseClass}`}>
      {
        list.map((item, index) => {
          return (
            <li key={index} style={{ backgroundColor: bgColor }}>
              <div className={`${baseClass}__label`} style={{color: labelColor}}>{item[labelKey]}</div>
              <div className={`${baseClass}__value`} style={{color: valueColor}}>{item[valueKey]}</div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default SectionList