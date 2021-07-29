import React, { FC, useState, useEffect } from 'react'
import { StyledOtherUserInfo } from '.'
import { config, fireDb } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { Avatar } from '../System/Avatar'

type Props = {
  userId?: string
}



const OtherUserInfo: FC<Props> = ({ userId }) => {
  const user = useSelector(selectUser)
  const [otherUser, setOtherUser] = useState<any>()

  const getUserDetails = () => {
    if (userId) {
      let otherUser = {}
      fireDb.collection('users').doc(userId).get().then((user) => {
        otherUser = {
          name: user.data()!.username,
          avatar: user.data()!.avatarUrl,
          status: user.data()!.status
        }
        
      }).then((otherUser) =>     setOtherUser(otherUser) 
      )
    }
  
    
    

  }

  useEffect(() => {
    
      getUserDetails()
    
  }, [userId])

  return (
    <StyledOtherUserInfo>
     <div className="user-profile-image">
       <Avatar url="" size={30} status={otherUser.status}/>
      </div>
      <div className="user-name-wrapper">
        <span>{otherUser.name}</span>
      </div>
    </StyledOtherUserInfo>
  )
}

export default OtherUserInfo
