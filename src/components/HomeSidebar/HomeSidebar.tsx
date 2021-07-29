
import React, { FC, useState, useEffect } from 'react'
import { config, fireDb } from '../../utils/firebase'
import { StyledHomeSidebar } from '.'
import { ExitIcon, PlusIcon } from '../Icon'
import { UserInfo } from '../UserInfo'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'
import { DirectMessageType } from '../../types'
import { Button } from '../System'
import { useHistory } from 'react-router-dom'
import { UserControls } from '../UserControls'
import { DirectMessageItem } from '../DirectMessageItem'

type Props = {
  setCurrentDirectName?: any
}

const HomeSidebar: FC<Props> = ({ setCurrentDirectName }) => {
  const [directMessageIds, setDirectMessageIds] = useState<string[]>([])
  const user = useSelector(selectUser)
  const history = useHistory()

  const loadDirectMessages = () => {
    fireDb.collection('directMessages').where('users', 'array-contains', user.id)
    .onSnapshot(({ docs }) => { 
      let directIds: string[] = []
      docs.map((doc) => directIds.push(doc.id))
      setDirectMessageIds(directIds)    
    })
  }

  

  useEffect(() => {
    loadDirectMessages()
  }, [])

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

        { 
          directMessageIds.map((id, idx) => (
            <DirectMessageItem key={idx} directMessageId={id}/>
          ))     
        }
        
      </div>

      <div className="user-info-footer">
        <UserControls />
      </div>

    
    </StyledHomeSidebar>
  )
}

export default HomeSidebar
