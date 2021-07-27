import React, { FC, useState, useEffect } from 'react'
import { UserInfoStyled } from '.'
import { config, fireDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  avatar?: string
  userName?: string
  status?: 'Online' | 'Offline' | 'Away' | 'Busy'
}

const UserInfo: FC<Props> = ({ avatar, userName, status }) => {
  const user = useSelector(selectUser)

  return (
    <UserInfoStyled>
     <div className="user-profile-image">
       <Avatar url={avatar ? avatar : user!.avatar} size={30} status={status ? status : user!.status}/>
      </div>
      <div className="user-name-wrapper">
        <span>{userName ? userName : user!.name }</span>
      </div>
    </UserInfoStyled>
  )
}

export default UserInfo
