/**
 * title: View
 * desc: 接受 source、onChange、onCollapse 三个参数
 */
 import React from 'react'
 import { Radio, Button } from 'antd'
 
 export const TagRadioGroup = ({ source, collapse = true, onChange, onCollapse }) => {
   const isCollapse = !!collapse
   source = source || []
 
   const handleChange = event => {
     onChange && onChange(event.target.value, event)
   }
   const handleCollapse = () => {
     onCollapse && onCollapse(isCollapse)
   }
   
   return (
     <section>
       <Radio.Group onChange={handleChange}>
         {
           source.map(item =>
             <Radio value={item.id} key={item.id}>{item.title}</Radio>
           )
         }
         <Button type="link" onClick={handleCollapse}>{isCollapse ? '展开' : '折叠'}</Button>
       </Radio.Group>
     </section>
   )
 }

 