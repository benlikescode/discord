import React, { FC, useState, useEffect } from 'react'
import { StyledOtherUserInfo } from '.'
import { fireDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  userId?: string
}



const OtherUserInfo: FC<Props> = ({ userId }) => {
  const user = useSelector(selectUser)
  const [otherUser, setOtherUser] = useState<any>({name: '', avatar: '', status: ''})

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
    <StyledOtherUserInfo>
     <div className="user-profile-image">
       <Avatar url={otherUser.avatar} size={30} status={otherUser.status}/>
      </div>
      <div className="user-name-wrapper">
        <span>{otherUser.name}</span>
      </div>
    </StyledOtherUserInfo>
  )
}

export default OtherUserInfo
