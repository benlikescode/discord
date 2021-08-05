import React, { FC, useState, createRef, KeyboardEvent, useEffect } from 'react'
import { realDb } from '../../utils/firebase'
import { NewMessageStyled } from '.'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { ChannelType } from '../../types'
import { selectPermissions } from '../../reducers/permissions'


type Props = {
  channelToken: string
  currentChannel?: ChannelType | undefined
}

const NewMessage: FC<Props> = ({ channelToken, currentChannel }) => { 
  const [messageContent, setMessageContent] = useState("")
  const messageInput = createRef<HTMLInputElement>()
  const user = useSelector(selectUser)
  const permissions = useSelector(selectPermissions)

  const sendMessage = () => {
    const newMessage = realDb.ref(channelToken).push()
    newMessage.set({
      user: user.name,
      content: messageContent,
      date: Date().toString(),
      avatar: user.avatar
    })
    messageInput.current!.value = ""
  }
  
  const isEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  useEffect(() => {
    messageInput.current!.focus()
    messageInput.current!.value = ""
  }, [channelToken])

  return (
    <NewMessageStyled canSendMessages={permissions.sendMessages}>
      <input 
        ref={messageInput} 
        type="text" 
        placeholder={permissions.sendMessages ? `Message #${currentChannel?.name}` : 'You do not have permission to send messages in this channel'} 
        onChange={(e) => setMessageContent(e.currentTarget.value)} 
        onKeyDown={(e) => isEnterClick(e)}
        maxLength={2000}      
      />
    </NewMessageStyled>
  )
}

export default NewMessage
