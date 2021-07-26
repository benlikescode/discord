
import React, { FC, useState, useEffect } from 'react'
import { config, fireDb } from '../../utils/firebase'
import { StyledHomeSidebar } from '.'
import { ExitIcon, PlusIcon } from '../Icon'
import { UserInfo } from '../UserInfo'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'
import { DirectMessage } from '../../types'
import { Button } from '../System'
import { useHistory } from 'react-router-dom'

type Props = {
  setCurrentDirectName?: any
}

const HomeSidebar: FC<Props> = ({ setCurrentDirectName }) => {
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([])
  const user = useSelector(selectUser)
  const history = useHistory()

  const loadDirectMessages = () => {
    fireDb.collection('directMessages').where('users', 'array-contains', user.id)
    .onSnapshot(({ docs }) => { 
      let dms: DirectMessage[] = []
      docs.map((doc) => {
        let newDM = null
        if (doc.data().user1.name === user.name) {
          newDM = {
            id: doc.id,
            name: doc.data().user2.name,
            avatar: doc.data().user2.avatar
          } 
        }
        else {
          newDM = {
            id: doc.id,
            name: doc.data().user1.name,
            avatar: doc.data().user1.avatar
          }
        }
        dms.push(newDM)

      })
      setDirectMessages(dms)
       
    })
  }


  const sendToDirectMessage = (directMessage: DirectMessage) => {
    setCurrentDirectName && setCurrentDirectName(directMessage.name)
    history.push(`/direct/${directMessage.id}`)
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
          directMessages.map((directMessage, idx) => (
            <Button type="solid2" width="100%" callback={() => sendToDirectMessage(directMessage)}>
              <div className="directMessageItem">
                <UserInfo key={idx} userName={directMessage.name} avatar={directMessage.avatar}/>
                <ExitIcon size={16}/>
              </div>       
            </Button>
          ))
        
        }
        
      </div>

      <div className="userInfoWrapper">
        <div className="userInfo">
          <UserInfo/>
        </div>
      </div>
    
    </StyledHomeSidebar>
  )
}

export default HomeSidebar
