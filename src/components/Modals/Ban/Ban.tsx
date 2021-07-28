import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledBan } from '.'
import { fireDb } from '../../../utils/firebase'
import { Textarea } from '../../System/Textarea'
import { ModalFooter } from '../Modal/ModalFooter'
import firebase from 'firebase'

type Props = {
  closeModal: any
  userId: string
}

interface ParamTypes {
  serverToken: string
}

const Ban: FC<Props> = ({ closeModal, userId }) => {
  const { serverToken } = useParams<ParamTypes>()
  const [banMessage, setBanMessage] = useState("")

  const handleBan = () => {
    fireDb.collection('servers').doc(serverToken).update({
      banList: firebase.firestore.FieldValue.arrayUnion(userId)
    })
  }

  const hardCodedUsername = "ben16"
 
  return (
    <StyledBan>
      <h2 className="header">{`Would you like to ban '@${hardCodedUsername}?'`}</h2>
      <div className="content">
        <div className="banVideo">
          <video src="/videos/banVideo.mp4" autoPlay loop muted width={400}></video>
        </div>
        <Textarea label="Reason For Ban" maxLength={512} callback={setBanMessage} value={banMessage}/> 
      </div>
      <ModalFooter closeModal={closeModal} actionLabel="Ban" cancelLabel="Cancel" actionCallback={handleBan}/>
    </StyledBan>
  )
}

export default Ban
