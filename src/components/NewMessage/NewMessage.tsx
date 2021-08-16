import React, { FC, useState, createRef, KeyboardEvent, useEffect } from 'react'
import { realDb } from '../../utils/firebase'
import { NewMessageStyled } from '.'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { ChannelType } from '../../types'
import { selectPermissions } from '../../reducers/permissions'
import { useParams } from 'react-router-dom'
import { MessagePings } from '../Popouts/MessagePings'
import { Popout } from '../Popouts/Popout'

type Props = {
  currentChannel: ChannelType
}

const NewMessage: FC<Props> = ({ currentChannel }) => { 
  const [messageContent, setMessageContent] = useState("")
  const messageInput = createRef<HTMLInputElement>()
  const user = useSelector(selectUser)
  const permissions = useSelector(selectPermissions)
  const { channelToken }: any = useParams()
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [pingMembersOpen, setPingMembersOpen] = useState(false)
  const [currPingedMember, setCurrPingedMember] = useState("")

  const closePopout = () => {
    setPingMembersOpen(false)
  }

  const sendMessage = async () => {
    messageInput!.current!.value = ""
    await removeTyping()

    const newMessage = await realDb.ref(channelToken).child('messages').push()
    newMessage.set({
      user: user.name,
      content: messageContent,
      date: Date().toString(),
      avatar: user.avatar
    })
  }
  
  const handleInputChange = async (e: any) => {
    const updatedMessage = e.currentTarget.value
    setMessageContent(updatedMessage)
    setPingMembersOpen(false)
     
    if (updatedMessage === '') {
      await removeTyping()
    }
    else {
      await realDb.ref(channelToken).child('typing').child(user.id).set({ username: user.name })

      if (updatedMessage === '@') {
        setPingMembersOpen(true)
      }
    }
  }

  const removeTyping = async () => {
    realDb.ref(channelToken).child('typing').child(user.id).remove()
  }

  const isEnterClick = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await sendMessage()
    }
  }

  useEffect(() => {
    messageInput.current!.focus()
    messageInput.current!.value = ""
  }, [channelToken])
 

  useEffect(() => {
    if (user) {
      realDb.ref(channelToken).child('typing').on('value', (( snapshot ) => {
        let typingUsersList: string[] = []
  
        snapshot.forEach((snap) => {
          if (snap.val().username !== user.name) {
            typingUsersList.push(snap.val().username)   
          }
        }) 
  
        setTypingUsers(typingUsersList)   
      })) 
    }
    
  }, [channelToken, user])

  useEffect(() => {
    messageInput.current!.value += currPingedMember
    closePopout()
  }, [currPingedMember])

  return (
    <NewMessageStyled canSendMessages={permissions.sendMessages}>   
      <input 
        ref={messageInput}
        type="text" 
        placeholder={permissions.sendMessages ? `Message #${currentChannel?.name}` : 'You do not have permission to send messages in this channel'} 
        onChange={(e) => handleInputChange(e)} 
        onKeyDown={(e) => isEnterClick(e)}
        maxLength={2000}
      />

      {typingUsers.length > 0 && 
        <div className="isTyping">
          <img src="/images/typingAnimation.gif" className="typingAnimation" alt="Typing"/>
          {typingUsers.map(username => <span><strong>{username}</strong> is typing...</span>)}      
        </div>
      }

      {pingMembersOpen &&
        <Popout closePopout={closePopout}>
          <MessagePings setCurrPingedMember={setCurrPingedMember}/>
        </Popout>      
      }

      
    </NewMessageStyled>
  )
}

export default NewMessage
