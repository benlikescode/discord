import { FC } from 'react'
import { IconStyled } from '.'

type Props = {
  size: number
}

const AirHorn: FC<Props> = ({ size }) => {
  return (
    <IconStyled className="icon" size={size}>
      <svg aria-hidden="false" viewBox="0 0 8 12"><path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor"></path><path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor"></path></svg>
    </IconStyled>
  )
}
export default AirHorn


