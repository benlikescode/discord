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

  const loadDirectMessage = async () => {
    const directMessage = await fireDb.collection('directMessages').doc(directMessageId).get()
    const userIds: string[] = directMessage.data()!.users
    setOtherUserId(userIds.filter((id) => id !== user.id)[0])
  }

  const sendToDirectMessage = () => {
    history.push(`/direct/${directMessageId}`)
  }

  useEffect(() => {
    loadDirectMessage()
  }, [])

  return (
    <StyledDirectMessageItem>
      <Button type="solid2" width="100%" callback={() => sendToDirectMessage()}>
        <div className="directMessageItem">
          {otherUserId && <OtherUserInfo userId={otherUserId}/>}
          <ExitIcon size={16}/>
        </div>       
      </Button>
    </StyledDirectMessageItem>
  )
}

export default DirectMessageItem
