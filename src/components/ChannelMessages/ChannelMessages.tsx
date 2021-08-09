import React, { FC, useEffect, useState, createRef } from 'react'
import { realDb } from '../../utils/firebase'
import { ChannelMessagesStyled } from '.'
import { FlexBox } from '../FlexBox'
import { AtIcon, HashTag, HelpIcon, MemberList } from '../Icon'
import { Message } from '../Message'
import { NewMessage } from '../NewMessage'
import { HelpModal } from '../HelpModal'
import { MemberSidebar } from '../MemberSidebar'
import { ChannelType } from '../../types'
import { selectServer } from '../../reducers/server'
import { useSelector } from 'react-redux'
import { selectChannel } from '../../reducers/channel'
import { useParams } from 'react-router-dom'

type Props = {
  type: 'channelMessages' | 'directMessages'
  currentDirectName?: string
}

const ChannelMessages: FC<Props> = ({ type, currentDirectName }) => {
  const [messages, setMessages] = useState<JSX.Element[]>([])
  const messageListRef = createRef<HTMLDivElement>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => setModalIsOpen(false)
  const [memberListOpen, setMemberListOpen] = useState(true)
  const { channelToken }: any = useParams()

  const server = useSelector(selectServer)
  const channel = useSelector(selectChannel)

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
            key={snap.key}
            id={snap.key}
            deleteCallback={deleteMessage}
            editCallback={editMessage}
            date={snap.val().date} 
            fullView={!(lastUser === snap.val().user) || snap.val().systemMessage} 
            username={snap.val().user} 
            content={snap.val().content}
            avatar={snap.val().avatar}
            systemMessage={snap.val().systemMessage}
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
          {channel.id === '' ? <AtIcon size={24}/> : <HashTag size={24}/>}        
          <span className="navbar-channel-name">{channel.id === '' ? currentDirectName : channel.name}</span>
        </FlexBox>
        
        <FlexBox>
          {type === 'channelMessages' &&
            <button className="light-gray-btns" onClick={() => memberListOpen ? setMemberListOpen(false) : setMemberListOpen(true)}><MemberList size={24}/></button>
          }
          <button className="light-gray-btns" onClick={() => setModalIsOpen(true)}><HelpIcon size={24}/></button>
        </FlexBox>
      </div>

      <div className="channel-messages-body">
        <div className="messaging-container">
          <div ref={ messageListRef } className="message-list">
           
            <div className="welcomeMessageWrapper">
              <div className="welcomeMessageInner">
                <h3 className="welcomeMessage">Welcome to {channel.name === 'general' ? server.name : `#${channel.name}!`}</h3>
                <span className="welcomeLabel">{`This is the beginning of ${channel.name === 'general' ? 'this server.' : `the #${channel.name} channel.`}`}</span>
              </div>
            </div>
            
            { messages }

            <div className="spacer"/>
          </div>
    
          <NewMessage currentChannel={channel} />
        </div>

        {(memberListOpen && type === 'channelMessages') && <MemberSidebar/>}
        
      </div>

      {modalIsOpen && <HelpModal closeModal={closeModal}/>}

    </ChannelMessagesStyled>
  )
}

export default ChannelMessages
