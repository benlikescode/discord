import { FC, ReactNode } from 'react'
import { FlexBoxStyled } from '.'

type Props = {
  children?: ReactNode
}

const FlexBox: FC<Props> = ({ children }) => {
  return (
    <FlexBoxStyled>{ children }</FlexBoxStyled>
  )
}

export default FlexBox
