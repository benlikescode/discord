import { FC } from 'react'
import { IconStyled } from '.'

type Props = {
  size: number
}

const DisconnectIcon: FC<Props> = ({ size }) => {
  return (
    <IconStyled className="icon" size={size}>
      <svg aria-hidden="false" viewBox="0 0 4 14"><g><ellipse fill="currentColor" cx="3.75" cy="1" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="3.75" cy="4.61111107" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="0" cy="4.61111107" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="3.75" cy="8.22222227" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="0" cy="8.22222227" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="3.75" cy="11.83333337" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="0" cy="11.83333337" rx="1.125" ry="1.08333333"></ellipse><ellipse fill="currentColor" cx="0" cy="1" rx="1.125" ry="1.08333333"></ellipse></g></svg>    
    </IconStyled>
  )
}
export default DisconnectIcon
