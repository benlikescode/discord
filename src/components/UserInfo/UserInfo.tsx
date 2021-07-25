import React, { FC, useState, useEffect } from 'react'
import { UserInfoStyled } from '.'
import { config, fireDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  avatarColor: string
  userName?: string
}

const UserInfo: FC<Props> = ({ avatarColor, userName }) => {
  const [avatar, setAvatar] = useState("")
  const user = useSelector(selectUser)

  

  console.log(user)

  return (
    <UserInfoStyled avatarColor={ avatarColor }>
     <div className="user-profile-image">
       {avatar ? <Avatar url={avatar} size={30}/> : <span>{ user.name[0] }</span>}
      </div>
      <div className="user-name-wrapper">
        <span>{ user.name }</span>
      </div>
    </UserInfoStyled>
  )
}

export default UserInfo
