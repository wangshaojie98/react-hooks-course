import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { Form } from './components';
import controller from './controller'

// const ObserverForm = 
const WorkBurdenMVC = observer(() => {
  console.log(controller)

  useEffect(() => {
        controller.fetchFormModel()
      }, [])
  return (
    <Form 
      role = {controller.formModel.role}
      timeSegment = {controller.formModel.timeSegment}
      grade = {controller.formModel.grade}
      test={controller.test}
      roleOptions = {controller.formModel.roleOptions}
      gradeOptions = {controller.formModel.gradeOptions}
      onRoleChange = {controller.onRoleChange}
      onTimeChange = {controller.onTimeSegmentChange}
      onGradeChange = {controller.onGradeChange}
      onSubmit = {controller.onSubmit}
    />
  )
})

export default WorkBurdenMVC
//   useEffect(() => {
//     controller.fetchFormModel()
//   }, [])
//   return (
    
//   )
// }