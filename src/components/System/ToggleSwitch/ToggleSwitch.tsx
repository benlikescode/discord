import {FC } from 'react'
import { StyledToggleSwitch } from '.'

const ToggleSwitch: FC = () => {
  return (
    <StyledToggleSwitch>
      <label className="switch">
        <input type="checkbox"/>
        <span className="slider"></span>
      </label>    
    </StyledToggleSwitch>
  )
}

export default ToggleSwitch
