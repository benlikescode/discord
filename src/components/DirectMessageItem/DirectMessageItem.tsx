import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledDirectMessageItem } from '.'
import { selectUser } from '../../reducers/user'
import { fireDb } from '../../utils/firebase'
import { ExitIcon } from '../Icon'
import { OtherUserInfo } from '../OtherUserInfo'
import { Button } from '../System'
import { UserInfo } from '../UserInfo'

type Props = {
  directMessageId: string
}

const DirectMessageItem: FC<Props> = ({ directMessageId }) => {
  const history = useHistory()
  const user = useSelector(selectUser)
  const [otherUserId, setOtherUserId] = useState("")
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [status, setStatus] = useState<'Online' | 'Offline' | 'Idle' | 'Busy'>()

  const loadDirectMessages = () => {
    fireDb.collection('directMessages').doc(directMessageId).get().then((directMessage) => {
      const userIds = directMessage.data()!.users
      //      setOtherUserId(userIds.filter((userId: string) => userId !== user.id))

      for (const userId of userIds) {
        if (userId !== user.id) {
          getUserData(userId)
        }
      }
    })   
  }

  const getUserData = (userId: string) => {
    fireDb.collection('users').doc(userId).get().then((user) => {
      setName(user.data()!.username)
      setAvatar(user.data()!.avatarUrl)
      setStatus(user.data()!.status)
      
    })
  }


  const sendToDirectMessage = () => {
    history.push(`/direct/${directMessageId}`)
  }

  useEffect(() => {
    loadDirectMessages()
  }, [])

  return (
    <StyledDirectMessageItem>
      <Button type="solid2" width="100%" callback={() => sendToDirectMessage()}>
        <div className="directMessageItem">
          <UserInfo userName={name} avatar={avatar} status={status}/>
          <ExitIcon size={16}/>
        </div>       
      </Button>
    </StyledDirectMessageItem>
  )
}

export default DirectMessageItem
