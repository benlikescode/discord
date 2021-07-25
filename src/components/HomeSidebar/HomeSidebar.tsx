
import React, { FC, useState } from 'react'
import { config } from '../../utils/firebase'
import { StyledHomeSidebar } from '.'
import { PlusIcon } from '../Icon'
import { UserInfo } from '../UserInfo'

const HomeSidebar: FC = ({  }) => {
  const [directMessages, setDirectMessages] = useState([])

/*
  const logOut = () => {
    auth.signOut()
    .then(() => {
      history.push('/login')
    })
    .catch((error) => {
      console.log(error)
    })
  }
*/
  return (
    <StyledHomeSidebar>
      <div className="topNavbar">
        <button>Find Stuff</button>
      </div>

      <div className="directMessages">
        <div className="directMessagesTitle">
          <span>Direct Messages</span>
          <PlusIcon size={16}/>
        </div>

        { directMessages }
        
      </div>

      <div className="userInfoWrapper">
        <div className="userInfo">
          <UserInfo avatarColor={ "#2f3136" }/>
        </div>
      </div>
    
    </StyledHomeSidebar>
  )
}

export default HomeSidebar
