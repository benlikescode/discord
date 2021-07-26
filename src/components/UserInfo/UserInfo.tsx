import React, { FC, useState, useEffect } from 'react'
import { UserInfoStyled } from '.'
import { config, fireDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  avatar?: string
  userName?: string
}

const UserInfo: FC<Props> = ({ avatar, userName }) => {
  const user = useSelector(selectUser)

  return (
    <UserInfoStyled>
     <div className="user-profile-image">
       <Avatar url={avatar ? avatar : user!.avatar} size={30}/>
      </div>
      <div className="user-name-wrapper">
        <span>{userName ? userName : user!.name }</span>
      </div>
    </UserInfoStyled>
  )
}

export default UserInfo
