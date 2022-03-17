import { Simple, Box } from './components'


import React, { useEffect, useState } from 'react'

const App = () => { 
  return (
    <div>
      <Box title="一个简单的示例">
        <Simple />
      </Box>
    </div>
  )
}

export default App