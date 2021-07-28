import { FC, useState } from 'react'
import { StyledKick } from '.'
import { Textarea } from '../../System/Textarea'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: any
  userId: string
}

const Kick: FC<Props> = ({ closeModal, userId }) => {

  const [kickMessage, setKickMessage] = useState("")

  const handleKick = () => {
    alert("get kicked fool")
  }

  const hardCodedUsername = "ben16"
 
  return (
    <StyledKick>
      <h2 className="header">{`Kick '${hardCodedUsername}'`}</h2>
      <div className="content">
        <div className="warningLabel">
          <span>{`Are you sure you want to kick ${hardCodedUsername}? They will be able to rejoin again with a new invite.`}</span>
        </div>
        <Textarea label="Reason For Kick" maxLength={512} callback={setKickMessage} value={kickMessage}/> 
      </div>
      <ModalFooter closeModal={closeModal} actionLabel="Kick" cancelLabel="Cancel" actionCallback={handleKick}/>
    </StyledKick>
  )
}

export default Kick
