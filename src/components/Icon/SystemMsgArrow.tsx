import { FC } from 'react'
import { IconStyled } from '.'

type Props = {
  size: number
}

const ScreenIcon: FC<Props> = ({ size }) => {
  return (
    <IconStyled className="icon" size={size}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><g fill="none" fill-rule="evenodd"><path d="M18 0H0v18h18z"/><path fill="#3ba55c" d="M0 8h14.2l-3.6-3.6L12 3l6 6-6 6-1.4-1.4 3.6-3.6H0"/></g></svg>
    </IconStyled>
  )
}
export default ScreenIcon


