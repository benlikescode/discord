import React, { FC, useState, createRef, KeyboardEvent, useEffect } from 'react'
import { realDb } from '../../utils/firebase'
import { NewMessageStyled } from '.'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { ChannelType } from '../../types'
import { selectPermissions } from '../../reducers/permissions'
import { useParams } from 'react-router-dom'

type Props = {
  currentChannel: ChannelType
}

const NewMessage: FC<Props> = ({ currentChannel }) => { 
  const [messageContent, setMessageContent] = useState("")
  const messageInput = createRef<HTMLInputElement>()
  const user = useSelector(selectUser)
  const permissions = useSelector(selectPermissions)
  const { channelToken }: any = useParams()

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
  }, [currentChannel.id])

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
