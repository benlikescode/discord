import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledKick } from '.'
import { selectServer } from '../../../reducers/server'
import { fireDb, realDb } from '../../../utils/firebase'
import { Textarea } from '../../System/Textarea'
import { ModalFooter } from '../Modal/ModalFooter'
import firebase from 'firebase'
import { selectUser } from '../../../reducers/user'

type Props = {
  closeModal: any
  userId: string
}

const Kick: FC<Props> = ({ closeModal, userId }) => {

  const [kickMessage, setKickMessage] = useState("")
  const [clickedUsername, setClickedUsername] = useState("")
  const server = useSelector(selectServer)
  const user = useSelector(selectUser)

  const handleKick = async () => {
    if (server.id && userId) {
      await fireDb.collection('servers').doc(server.id).update({
        members: firebase.firestore.FieldValue.arrayRemove(userId)
      })
      await fireDb.collection('servers').doc(server.id).collection('auditLog').add({
        avatar: user.avatar,
        label1: user.name,
        label2: clickedUsername,
        action: 'Kick',
        iconType: 'Delete',
        timestamp: Date().toString(),
        reason: kickMessage,
        hasDropdown: false
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
    <StyledKick>
      <h2 className="header">{`Kick '${clickedUsername}'`}</h2>
      <div className="content">
        <div className="warningLabel">
          <span>{`Are you sure you want to kick ${clickedUsername}? They will be able to rejoin again with a new invite.`}</span>
        </div>
        <Textarea label="Reason For Kick" maxLength={512} callback={setKickMessage} value={kickMessage}/> 
      </div>
      <ModalFooter 
        closeModal={closeModal} 
        actionLabel="Kick" 
        cancelLabel="Cancel" 
        actionCallback={handleKick}
        actionPrimaryColor="#ED4245"
      />
    </StyledKick>
  )
}

export default Kick
