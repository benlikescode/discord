import { FC } from 'react'
import { IconStyled } from '.'

type Props = {
  size: number
}

const AirHorn: FC<Props> = ({ size }) => {
  return (
    <IconStyled className="icon" size={size}>
      <svg aria-hidden="false" viewBox="0 0 24 24"><path d="M3.9 8.26H2V15.2941H3.9V8.26Z" fill="currentColor"></path><path d="M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5242L19.1 17.9304V19.0588H21V4H19.1ZM9.2181 17.9944L6.75 17.3826V15.2113L10.6706 16.0753L9.2181 17.9944Z" fill="currentColor"></path></svg>
    </IconStyled>
  )
}
export default AirHorn
