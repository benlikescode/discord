import { FC, useEffect, useState } from 'react'
import { StyledBan } from '.'
import { fireDb, realDb } from '../../../utils/firebase'
import { Textarea } from '../../System/Textarea'
import { ModalFooter } from '../Modal/ModalFooter'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { selectServer } from '../../../reducers/server'
import { selectUser } from '../../../reducers/user'

type Props = {
  closeModal: any
  userId: string
}

const Ban: FC<Props> = ({ closeModal, userId }) => {
  const [banMessage, setBanMessage] = useState("")
  const [clickedUsername, setClickedUsername] = useState("")
  const server = useSelector(selectServer)
  const user = useSelector(selectUser)

  const handleBan = async () => {
    if (server.id && userId) {
      await fireDb.collection('servers').doc(server.id).update({
        banList: firebase.firestore.FieldValue.arrayUnion({id: userId, reason: banMessage}),
        members: firebase.firestore.FieldValue.arrayRemove(userId)
      })
      await fireDb.collection('servers').doc(server.id).collection('auditLog').add({
        avatar: user.avatar,
        label1: user.name,
        label2: clickedUsername,
        action: 'Ban',
        iconType: 'Delete',
        timestamp: Date().toString(),
        reason: banMessage,
        hasDropdown: (banMessage !== '')
      })
      
      realDb.ref('removes').child(userId).set({ removed: true })
      closeModal()
    }  
  }

  const getClickedUsername = async () => {
    const clickedUser = await fireDb.collection('users').doc(userId).get()
    setClickedUsername(clickedUser.data()!.username)
  }

  useEffect(() => {
    if (userId) {
      getClickedUsername()
    }  
  }, [userId])

  return (
    <StyledBan>
      <h2 className="header">{`Would you like to ban '@${clickedUsername}?'`}</h2>
      <div className="content">
        <div className="banVideo">
          <video src="/videos/banVideo.mp4" autoPlay loop muted width={400}></video>
        </div>
        <Textarea label="Reason For Ban" maxLength={512} callback={setBanMessage} value={banMessage}/> 
      </div>
      <ModalFooter 
        closeModal={closeModal} 
        actionLabel="Ban" 
        cancelLabel="Cancel" 
        actionCallback={handleBan}
        actionPrimaryColor="#ED4245"
      />
    </StyledBan>
  )
}

export default Ban
