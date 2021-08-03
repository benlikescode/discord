import React, { FC, useState, useEffect } from 'react'
import { UserInfoStyled } from '.'
import { fireDb, realDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  avatar?: string
  userName?: string
  status?: 'Online' | 'Offline' | 'Idle' | 'Busy'
}

const UserInfo: FC<Props> = ({ avatar, userName, status }) => {
  const user = useSelector(selectUser)
  const [userStatus, setUserStatus] = useState<'Online' | 'Offline' | 'Idle' | 'Busy'>("Offline")

  useEffect(() => {
    if (user.id) {
      realDb.ref('status').child(user.id).on('value', (snapshot) => {
        setUserStatus(snapshot.val().status)
      })
    }
  }, [user.id])
  
  return (
    <UserInfoStyled>
     <div className="user-profile-image">
       <Avatar url={avatar ? avatar : user!.avatar} size={30} status={status ? status : userStatus}/>
      </div>
      <div className="user-name-wrapper">
        <span>{userName ? userName : user!.name }</span>
      </div>
    </UserInfoStyled>
  )
}

export default UserInfo
