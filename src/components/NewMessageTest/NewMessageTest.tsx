import React, { FC, useState, createRef, useEffect } from 'react'
import { realDb } from '../../utils/firebase'
import { StyledNewMessageTest } from '.'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/user'
import { ChannelType } from '../../types'
import { selectPermissions } from '../../reducers/permissions'
import { useParams } from 'react-router-dom'
import { MessagePings } from '../Popouts/MessagePings'
import { Popout } from '../Popouts/Popout'
import { formatTypingMessage } from '../../utils/helperFunctions'
import { Modal } from '../Modals'
import { MessageTooLong } from '../Modals/MessageTooLong'

type Props = {
  currentChannel: ChannelType
}

const NewMessageTest: FC<Props> = ({ currentChannel }) => { 
  const [messageContent, setMessageContent] = useState("")
  const messageInput = createRef<HTMLDivElement>()
  const user = useSelector(selectUser)
  const permissions = useSelector(selectPermissions)
  const { channelToken }: any = useParams()
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [pingMembersOpen, setPingMembersOpen] = useState(false)
  const [tooLongModalOpen, setTooLongModalOpen] = useState(false)
  const [currPingedMember, setCurrPingedMember] = useState("")

  const closePopout = () => {
    setPingMembersOpen(false)
  }

  const closeModal = () => {
    setTooLongModalOpen(false)
  }

  const sendMessage = async () => {
    messageInput!.current!.innerText = ""
    await removeTyping()

    const newMessage = await realDb.ref(channelToken).child('messages').push()
    newMessage.set({
      user: user.name,
      content: messageContent,
      date: Date().toString(),
      avatar: user.avatar
    })
  }
  
  const handleInputChange = async (e: React.FormEvent<HTMLDivElement>) => {
    const updatedMessage = e.currentTarget.innerText
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

  const isEnterClick = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const inputText = messageInput.current!.innerText
      if (inputText !== '') {
        if (inputText!.length > 2000) {
          setTooLongModalOpen(true)
        }
        else {
          await sendMessage()
        }
      }
    }
  }

  useEffect(() => {
    messageInput.current!.focus()
    messageInput.current!.innerText = ""
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
    if (currPingedMember) {
      messageInput.current!.innerHTML = `<span class="userMention" contentEditable="false">@${currPingedMember}</span> `
      closePopout()
    }
    
  }, [currPingedMember])

  return (
    <StyledNewMessageTest>   
      <div className="editorContainer">
        <div 
          className="editor" 
          contentEditable={true} 
          role="textbox" 
          spellCheck={true} 
          autoCorrect="off"
          aria-label="Send a message" 
          placeholder={`Message #${currentChannel.name}`} 
          onInput={(e) => handleInputChange(e)}
          onKeyDown={(e) => isEnterClick(e)}
          ref={messageInput}
        >
        </div>
      </div>
     

      {typingUsers.length > 0 && 
        <div className="isTyping">
          <img src="/images/typingAnimation.gif" className="typingAnimation" alt="Typing"/>
          { formatTypingMessage(typingUsers) }         
        </div>
      }

      {pingMembersOpen &&
        <Popout closePopout={closePopout}>
          <MessagePings setCurrPingedMember={setCurrPingedMember}/>
        </Popout>      
      }

      {tooLongModalOpen &&
        <Modal closeModal={closeModal}>
          <MessageTooLong closeModal={closeModal} />
        </Modal>
      }

      
    </StyledNewMessageTest>
  )
}

export default NewMessageTest
