import React, { FC, useState, createRef, KeyboardEvent, useEffect } from 'react'
import { config, realDb } from '../../utils/firebase'
import { NewMessageStyled } from '.'
import { Channel } from '../ChannelList'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'

type Props = {
  channelToken: string
  currentChannel: Channel | undefined
}

const NewMessage: FC<Props> = ({ channelToken, currentChannel }) => { 
  const [messageContent, setMessageContent] = useState("")
  const messageInput = createRef<HTMLInputElement>()
  const user = useSelector(selectUser)

  const sendMessage = () => {
    const newMessage = realDb.ref(channelToken).push()
    newMessage.set({
      user: user.name,
      content: messageContent,
      date: Date().toString()
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
    <NewMessageStyled>
      <input ref={messageInput} type="text" placeholder={`Message #${currentChannel?.name}`} onChange={(e) => setMessageContent(e.currentTarget.value)} onKeyDown={(e) => isEnterClick(e)}/>
    </NewMessageStyled>
  )
}

export default NewMessage
