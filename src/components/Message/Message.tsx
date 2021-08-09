import React, { FC, useState } from 'react'
import { MessageStyled } from '.'
import { formatDate } from '../../utils/helperFunctions'
import { SystemMsgArrow } from '../Icon'
import { MessageOptions } from '../MessageOptions'
import { Avatar } from '../System/Avatar'

type Props = {
  id: String | null
  deleteCallback: any
  editCallback: any
  fullView?: boolean
  username: string
  content: string
  date: string
  avatar: string
  systemMessage?: boolean
}

const Message: FC<Props> = ({ id, deleteCallback, editCallback, fullView, username, content, date, avatar, systemMessage }) => {

  const [isHovering, setIsHovering] = useState(false);
  
  const handleEnter = () => {
    setIsHovering(true)
  }

  const handleLeave = () => {
    setIsHovering(false);
  }

  function isValidHttpUrl(string: string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  
  return (
    <MessageStyled fullView={fullView}>
      {systemMessage ? 
        <div className="systemMessage">
          <div className="systemMessageIcon">
            <SystemMsgArrow size={18}/>
          </div>
          <div className="systemMessageContent">
            <span className="systemUsername">{`${username}`}</span>
            <span className="systemGreeting">{content}</span>
            <span className="systemTimestamp">{formatDate(date)}</span>
          </div>
        </div>
        :
        <div className="message" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          {fullView ?
            <Avatar url={avatar} size={40}/>
            :
            <div className="user-profile-spacer"/>
          }
          <div className="message-info">
            {fullView && 
              <div className="message-info-header">
                <span className="message-username">{ username }</span>
                <span className="message-date">{formatDate(date)}</span>
              </div>
            }
            <div className="message-info-body">
              {
                isValidHttpUrl(content) ? <a href={content} className="messageUrl">{content}</a> : <span className="message-content">{ content }</span>
              }
            </div>
          </div>
          {isHovering && <MessageOptions messageId={id} editCallback={editCallback} deleteCallback={deleteCallback}/>} 
        </div>
      }
      
        
    </MessageStyled>
  )
}

export default Message