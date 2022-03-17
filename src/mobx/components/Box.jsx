import React from 'react'

const Box = ({ title, children }) => { 
  return (
    <section>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

export default Box