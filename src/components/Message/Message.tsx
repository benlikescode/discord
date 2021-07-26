import React, { FC, useState } from 'react'
import { MessageStyled } from '.'
import { formatDate } from '../../utils/helperFunctions'
import { MessageOptions } from '../MessageOptions'
import { Avatar } from '../System/Avatar'

type Props = {
  id: String | null
  deleteCallback: any
  editCallback: any
  fullView?: boolean
  username: string
  content: string
  date?: string | undefined
  avatar: string
}

const Message: FC<Props> = ({ id, deleteCallback, editCallback, fullView, username, content, date, avatar }) => {

  const [isHovering, setIsHovering] = useState(false);
  
  const handleEnter = () => {
    setIsHovering(true)
  }

  const handleLeave = () => {
    setIsHovering(false);
  }
  
  return (
    <MessageStyled fullView={fullView}>
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
              {date && <span className="message-date">{ formatDate(date) }</span>}
            </div>
          }
          <div className="message-info-body">
            <span className="message-content">{ content }</span>
          </div>
        </div>
        {isHovering && <MessageOptions messageId={id} editCallback={editCallback} deleteCallback={deleteCallback}/>} 
      </div>
        
    </MessageStyled>
  )
}

export default Message