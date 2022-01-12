import React from "react"
import { Table } from 'antd';
import './style.scss';


const PdfTable = ({columns=[], dataSource=[], rowKey=(record => record.key)}) => {
 
  

  return (
    <div className="pdf-table">
      <Table 
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      
    </div>
  )
}

export default PdfTable