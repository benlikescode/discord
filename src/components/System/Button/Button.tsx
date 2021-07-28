import {FC, ReactNode } from 'react'
import { StyledButton } from '.'

type Props = {
  type: 'solid' | 'ghost' | 'icon' | 'closeButton' | 'blue' | 'icon2' | 'solid2' | 'red'
  callback?: any
  primaryColor?: string
  secondaryColor?: string
  isDisabled?: boolean
  children?: ReactNode
  width?: string
}

const Button: FC<Props> = ({ type, callback, primaryColor, secondaryColor, isDisabled, children, width}) => {
  return (
    <StyledButton 
    type={type} 
    primaryColor={primaryColor} 
    secondaryColor={secondaryColor} 
    isDisabled={isDisabled}
    width={width}
    >
      <button onClick={callback ? (e) => callback(e) : undefined}>
        {children}
      </button>
    </StyledButton>
  )
}

export default Button