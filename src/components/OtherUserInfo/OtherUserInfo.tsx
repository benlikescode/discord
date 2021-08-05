import React, { FC, useState, useEffect } from 'react'
import { StyledOtherUserInfo } from '.'
import { fireDb, realDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  userId: string
  noStatus?: boolean
  avatarSize?: number
}

const OtherUserInfo: FC<Props> = ({ userId, noStatus, avatarSize }) => {
  const user = useSelector(selectUser)
  const [otherUser, setOtherUser] = useState<any>({name: '', avatar: ''})
  const [otherUserStatus, setOtherUserStatus] = useState<'Online' | 'Offline' | 'Idle' | 'Busy'>("Offline")

  const getUserDetails = async () => {
    const otherUser = await fireDb.collection('users').doc(userId).get()
    
    const otherUserDetails = {
      name: otherUser.data()!.username,
      avatar: otherUser.data()!.avatarUrl,
    }
    setOtherUser(otherUserDetails)
  }

  useEffect(() => {
    getUserDetails()
    realDb.ref('status').child(userId).on('value', (snapshot) => {
      setOtherUserStatus(snapshot.val().status)
    })
  }, [userId])

  return (
    <StyledOtherUserInfo>
     <div className="user-profile-image">
      {noStatus ? <Avatar url={otherUser.avatar} size={avatarSize || 32}/> :
        <Avatar url={otherUser.avatar} size={avatarSize || 32} status={otherUserStatus}/>
      }
      </div>
      <div className="user-name-wrapper">
        <span>{otherUser.name}</span>
      </div>
    </StyledOtherUserInfo>
  )
}

export default OtherUserInfo
