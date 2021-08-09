import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledNickname } from '.'
import { selectServer } from '../../../reducers/server'
import { fireDb } from '../../../utils/firebase'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: () => void
  closePopout?: () => void
  userId: string
}

const Nickname: FC<Props> = ({ closeModal, closePopout, userId }) => {
  const [inputVal, setInputVal] = useState("")
  const [nickname, setNickname] = useState("")
  const [username, setUsername] = useState("")
  const server = useSelector(selectServer)
  const [thisUserId, setThisUserId] = useState(userId)

  const changeNickname = async () => {
    await fireDb.collection('servers').doc(server.id).collection('members').doc(thisUserId).update({ nickname: inputVal })
    closeModal()
  }

  const getUserDetails = async () => {
    const thisUser = await fireDb.collection('servers').doc(server.id).collection('members').doc(userId).get()
    setNickname(thisUser.data()!.nickname)
    setUsername(thisUser.data()!.username)
  }

  useEffect(() => {
    closePopout && closePopout()
    if (server.id && userId) {
      getUserDetails()
    } 
  }, [server.id, userId])

  return (
    <StyledNickname>
      <h2 className="header">Change Nickname</h2>
      <div className="content">
        <div className="warningLabel">
          <span>Nicknames are visible to everyone on this server. Do not change them unless you are enforcing a naming system or clearing a bad nickname.</span>
        </div>
        <Input 
          placeholder={nickname ? nickname : username} 
          type="text" 
          value={inputVal} 
          callback={setInputVal} 
          label="Nickname"
        />
      </div>
      
      <ModalFooter 
        cancelLabel="Cancel" 
        actionLabel="Save" 
        actionCallback={changeNickname} 
        closeModal={closeModal}
        actionPrimaryColor="#7289da"
      />
    </StyledNickname>
  )
}

export default Nickname
