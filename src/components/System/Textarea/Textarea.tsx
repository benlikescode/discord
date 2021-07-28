import React, { FC, useState, useRef } from 'react'
import { StyledTextarea } from '.'

type Props = {
  placeholder?: string
  maxLength?: number
  value?: string
  callback?: any
  label?: string
}

const Textarea: FC<Props> = ({ placeholder, maxLength, value, callback, label }) => {
  const [currValue, setCurrValue] = useState(value || '')
  const [currChars, setCurrChars] = useState(0)

  const onInputChange = (input: string) => {
    setCurrChars(input.split('').length)
    setCurrValue(input)


    if (callback) {
      callback(input)
    }
  }

  return (
    <StyledTextarea>
      {label && <label>{label}</label>}
      <textarea 
      cols={30}
      rows={10}
      placeholder={placeholder} 
      maxLength={maxLength} 
      onChange={(e) => onInputChange(e.currentTarget.value)} 
      value={currValue}
      />
      {maxLength && <div className="charCounter"><span>{maxLength - currChars}</span></div>}
    </StyledTextarea>
  )
}

export default Textarea
