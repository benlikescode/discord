import React, { FC, useEffect, useState, createRef } from 'react'
import { useParams } from 'react-router-dom'
import { config, realDb } from '../../utils/firebase'
import { ChannelMessagesStyled } from '.'
import { FlexBox } from '../FlexBox'
import { AtIcon, HashTag, HelpIcon, MemberList } from '../Icon'
import { Message } from '../Message'
import { NewMessage } from '../NewMessage'
import { HelpModal } from '../HelpModal'
import { MemberSidebar } from '../MemberSidebar'
import { ChannelType } from '../../types'

type Props = {
  currentChannel?: any
  type: 'channelMessages' | 'directMessages'
  currentDirectName?: string
}

interface ParamTypes {
  channelToken: string
}

const ChannelMessages: FC<Props> = ({ currentChannel, type, currentDirectName }) => {
  const [messages, setMessages] = useState<JSX.Element[]>([])
  const { channelToken } = useParams<ParamTypes>()
  const messageListRef = createRef<HTMLDivElement>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => setModalIsOpen(false)
  const [memberListOpen, setMemberListOpen] = useState(true)

  const deleteMessage = async (messageId: string) => {
    const dbRef = realDb.ref();
    dbRef.child(channelToken).child(messageId).remove()
  }

  const editMessage = async () => {
    // TODO
  }

  useEffect(() => {
    realDb.ref(channelToken).on('value', (( snapshot ) => {
      let messageList: JSX.Element[] = []
      let lastUser = ""

      snapshot.forEach((snap) => {
        messageList.push(
          <Message 
            id={snap.key}
            deleteCallback={deleteMessage}
            editCallback={editMessage}
            date={snap.val().date} 
            fullView={!(lastUser === snap.val().user)} 
            username={snap.val().user} 
            content={snap.val().content}
            avatar={snap.val().avatar}
            />
        )
        lastUser = snap.val().user
      })
     
      setMessages(messageList)
    }))
  }, [channelToken])

  useEffect(() => {
    messageListRef.current!.scrollTop = messageListRef.current!.scrollHeight
  }, [messageListRef])

  return (
    <ChannelMessagesStyled memberListOpen={memberListOpen && type === 'channelMessages'}>

      <div className="channel-messages-navbar">
        <FlexBox>
          {currentChannel ? <HashTag size={24}/> : <AtIcon size={24}/>}        
          <span className="navbar-channel-name">{currentChannel ? currentChannel?.name : currentDirectName}</span>
        </FlexBox>
        
        <FlexBox>
          <button className="light-gray-btns" onClick={() => memberListOpen ? setMemberListOpen(false) : setMemberListOpen(true)}><MemberList size={24}/></button>
          <button className="light-gray-btns" onClick={() => setModalIsOpen(true)}><HelpIcon size={24}/></button>
        </FlexBox>
      </div>

      <div className="channel-messages-body">
        <div className="messaging-container">
          <div ref={ messageListRef } className="message-list">
            { messages }
            <div className="spacer"/>
          </div>
    
          <NewMessage channelToken={ channelToken } currentChannel={ currentChannel } />
        </div>

        {(memberListOpen && type === 'channelMessages') && <MemberSidebar/>}
        
      </div>

      {modalIsOpen && <HelpModal closeModal={closeModal}/>}

    </ChannelMessagesStyled>
  )
}

export default ChannelMessages
