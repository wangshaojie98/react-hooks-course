import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { Form } from './components';
import controller from './controller'

const ObserverForm = observer(({ controller }) => {
  console.log(controller)
  return (
    <Form 
      role = {controller.formModel.role}
      timeSegment = {controller.formModel.timeSegment}
      grade = {controller.formModel.grade}
      roleOptions = {controller.formModel.roleOptions}
      gradeOptions = {controller.formModel.gradeOptions}
      onRoleChange = {controller.onRoleChange}
      onTimeChange = {controller.onTimeSegmentChange}
      onGradeChange = {controller.onGradeChange}
      onSubmit = {controller.onSubmit}
    />
  )
})
export default function WorkBurdenMVC(props) {
  useEffect(() => {
    controller.fetchFormModel()
  }, [])
  return (
    <div>
        <ObserverForm controller={controller}/ >
    </div>
  )
}