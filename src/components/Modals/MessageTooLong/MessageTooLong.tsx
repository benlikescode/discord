import { FC } from 'react'
import { StyledMessageTooLong } from '.'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: () => void
}

const MessageTooLong: FC<Props> = ({ closeModal }) => {
  return (
    <StyledMessageTooLong>
      <h3 className="header">Your message is too long...</h3>
      <div className="message">You've hit the 2000 character count limit.</div>
    </StyledMessageTooLong>
  )
}

export default MessageTooLong
