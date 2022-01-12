import React, { useEffect, useState, useCallback } from 'react'
import "./style.scss"

const TitleInsideWrap = (props) => {
  const [wrapEleRef, setWrapEleRef] = useState(null);
  const [defaultClass, setDefaultClass] = useState("page-break-inside")
  const setWrapElementRef = useCallback(ele => ele && setWrapEleRef(ele), [])

  useEffect(() => {
    if (wrapEleRef) {
      console.log('wrapEleRef:', wrapEleRef)
      console.log('children:', {wrapEleRef: wrapEleRef.children})

      const hasH1 = Array.from(wrapEleRef.children).find((child) => {
        if (child && child.nodeName === 'H1') {
          return true
        }

        return false
      })
      if (hasH1) {
        setDefaultClass("page-break-before")
      }
    }
  }, [wrapEleRef])

  return (
    <div className={defaultClass} ref={setWrapElementRef}>
      {props.children}
    </div>
  )
}

export default TitleInsideWrap