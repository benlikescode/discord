import { FC } from 'react'
import { IconStyled } from '.'

type Props = {
  size: number
}

const DropArrow: FC<Props> = ({ size }) => {
  return (
    <IconStyled className="icon" size={size}>
      <svg viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path></svg>
    </IconStyled>
  )
}
export default DropArrow