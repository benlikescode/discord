
import React, { FC, useState, useEffect } from 'react'
import { config, fireDb } from '../../utils/firebase'
import { StyledHomeSidebar } from '.'
import { DisconnectIcon, ExitIcon, PingIcon, PlusIcon, ScreenIcon, VideoIcon } from '../Icon'
import { UserInfo } from '../UserInfo'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'
import { DirectMessageType } from '../../types'
import { Button } from '../System'
import { useHistory } from 'react-router-dom'
import { UserControls } from '../UserControls'
import { DirectMessageItem } from '../DirectMessageItem'
import { selectVoice } from '../../reducers/voice'
import { hangUp } from '../../utils/WebRTC/handlers'

type Props = {
  setCurrentDirectName?: any
}

const HomeSidebar: FC<Props> = ({ setCurrentDirectName }) => {
  const [directMessageIds, setDirectMessageIds] = useState<string[]>([])
  const user = useSelector(selectUser)
  const history = useHistory()
  
  const voice = useSelector(selectVoice)

  const loadDirectMessages = () => {
    fireDb.collection('directMessages').where('users', 'array-contains', user.id)
    .onSnapshot(({ docs }) => { 
      let directIds: string[] = []
      docs.map((doc) => directIds.push(doc.id))
      setDirectMessageIds(directIds)    
    })
  }

  const toggleVideoGrid = () => {

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
          {
            voice.inVoice &&
            
            <div className="user-info-footer-top">
              <div className="user-info-footer-top1">
                <div className="ping-wrapper">
                  <PingIcon size={16}/>
                  <span>Voice Connected</span>
                </div>
                <button className="disconnectButton" onClick={async () => await hangUp('HSc50FNSSJro1Sm1f6jc')}>
                  <DisconnectIcon size={20}/>
                </button>
              </div>

              <div className="user-info-footer-top2">
                <button onClick={() => toggleVideoGrid()}>
                  <div>
                    <VideoIcon size={18} />
                    <span>Video</span>
                  </div>
                </button>
                <button>
                  <div>
                    <ScreenIcon size={18} />
                    <span>Screen</span>
                  </div>
                </button>
              </div>

            </div>
          }
          
          <UserControls />
          
        </div>

    </StyledHomeSidebar>
  )
}

export default HomeSidebar

