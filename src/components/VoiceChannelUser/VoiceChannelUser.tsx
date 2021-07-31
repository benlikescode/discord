import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledVoiceChannelUser } from '.'
import { selectUser } from '../../reducers/user'
import { selectVoice } from '../../reducers/voice'
import { fireDb } from '../../utils/firebase'
import { Muted } from '../Icon'
import { Avatar } from '../System'

type Props = {
  userId: string
}

const VoiceChannelUser: FC<Props> = ({ userId }) => {
  const user = useSelector(selectUser)
  const voice = useSelector(selectVoice)
  const [otherUser, setOtherUser] = useState<any>({name: '', avatar: '', status: ''})

  const IS_THIS_USER = userId === user.id

  const getUserDetails = async () => {
    const otherUser = await fireDb.collection('users').doc(userId).get()
    const otherUserDetails = {
      name: otherUser.data()!.username,
      avatar: otherUser.data()!.avatarUrl,
      status: otherUser.data()!.status
    }
    setOtherUser(otherUserDetails)
  }

  useEffect(() => {
    getUserDetails()
  }, [userId])

  return (
    <StyledVoiceChannelUser>
      <div className="user-profile-image">
        <Avatar url={otherUser.avatar} size={24}/>
      </div>
      <div className="user-name-wrapper">
        <span>{otherUser.name}</span>
      </div>
      {(IS_THIS_USER && voice.isMuted) &&
        <div className="icons">
          <div className="icon">
            <Muted size={16}/>
          </div>
        </div>
      }
    </StyledVoiceChannelUser>
  )
}

export default VoiceChannelUser
