import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledBannedMember } from '.'
import { selectServer } from '../../../reducers/server'
import { fireDb } from '../../../utils/firebase'
import { Button } from '../../System'
import firebase from 'firebase'
import { BannedUserType } from '../../../types'

type Props = {
  closeModal: () => void
  bannedUser: BannedUserType
}

const BannedMember: FC<Props> = ({ closeModal, bannedUser }) => {
  const [username, setUsername] = useState("")
  const server = useSelector(selectServer)

  const getUsername = async () => {
    const thisUser = await fireDb.collection('users').doc(bannedUser.id).get()
    setUsername(thisUser.data()!.username)
  }
  
  const revokeBan = async () => {
    await fireDb.collection('servers').doc(server.id).update({
      banList: firebase.firestore.FieldValue.arrayRemove(bannedUser)
    })   
    closeModal()
  }

  useEffect(() => {
    if (bannedUser.id) {
      getUsername()
    }
  }, [bannedUser.id])

  return (
    <StyledBannedMember>
       <h2 className="username">{username}</h2>
       <div className="content">
         <div className="label">Ban Reason</div>
         <div className="banReason">{bannedUser.reason}</div>
       </div>
       <div className="footer">
        <button className="cancelButton" onClick={() => revokeBan()}>Revoke Ban</button>
        <Button type="solid" callback={() => closeModal()}>Done</Button>
       </div>
    </StyledBannedMember>
  )
}

export default BannedMember
