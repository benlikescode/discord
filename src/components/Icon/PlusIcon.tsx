import { FC } from 'react'
import { IconStyled } from '.'

type Props = {
  size: number
}

const PlusIcon: FC<Props> = ({ size }) => {
  return (
    <IconStyled className="icon" size={size}>
      <svg aria-hidden="false" viewBox="0 0 18 18"><polygon fillRule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon></svg>
    </IconStyled>
  )
}
export default PlusIcon
