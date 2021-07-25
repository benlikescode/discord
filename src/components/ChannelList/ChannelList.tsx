import React, { FC, useEffect, useState } from 'react'
import { config, fireDb } from '../../utils/firebase'
import { useParams, useHistory } from 'react-router-dom'
import { ChannelStyled, Channel } from '.'
import { Deafen, DisconnectIcon, GearIcon, Mute, PingIcon, PlusIcon, ScreenIcon, VideoIcon, VoiceIcon } from '../Icon'
import { Modal } from '../Modal'
import { ChannelButton } from '../ChannelButton'
import { Server } from '../Sidebar'
import { createInviteLink } from '../../utils/helperFunctions'
import { UserInfo } from '../UserInfo'
import { Button, Icon } from '../System'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'
import { ServerDropdown } from '../ServerDropdown'

type Props = {
  setCurrentChannel: (channel: Channel) => void
  toggleVideoGrid: any
  //setCurrentVoiceChannel: (channel: Channel) => void
  currentServer: Server | undefined
}

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const ChannelList: FC<Props> = ({ setCurrentChannel, toggleVideoGrid, currentServer }) => {
  const history = useHistory()
  const [channelsJSX, setChannelsJSX] = useState<JSX.Element[]>([])
  const [voiceChannelsJSX, setVoiceChannelsJSX] = useState<JSX.Element[]>([])
  const { serverToken, channelToken } = useParams<ParamTypes>()
  const [channelModalOpen, setChannelModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inVoice, setInVoice] = useState(false)
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false)

  const closeModal = () => {
    setInviteModalOpen(false) 
    setChannelModalOpen(false)
  }

  const handleUserSettingsClick = () => {
    history.push('/settings')
  }
/*
  const logOut = () => {
    auth.signOut()
    .then(() => {
      history.push('/login')
    })
    .catch((error) => {
      console.log(error)
    })
  }
*/
  const loadChannels = () => {
    if (serverToken !== '') {
      fireDb.collection('channels')
      .where('serverToken', '==', serverToken)
      .onSnapshot(({ docs }) => {
        const channelList = docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Channel[]

        let channelJSX: JSX.Element[] = []

        channelList.map((channel, index) => {
          if (channel.id === channelToken) {
            setCurrentChannel(channel)
          }
          channelJSX.push( <ChannelButton key={index} channel={channel} callBack={setCurrentChannel} channelType="text"/> )
        })
        setChannelsJSX(channelJSX)
      })
    }
  }

  const loadVoiceChannels = () => {
    if (serverToken !== '') {
      fireDb.collection('voiceChannels')
      .where('serverToken', '==', serverToken)
      .onSnapshot(({ docs }) => {
        const voiceChannelList = docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Channel[]

        let voiceChannelJSX: JSX.Element[] = []

        voiceChannelList.map((channel, index) => {
          voiceChannelJSX.push( <ChannelButton key={index} channel={channel} channelType="voice"/> )
        })
        setVoiceChannelsJSX(voiceChannelJSX)
      })
    }
  }

  const handleServerDropdown = () => {
    setServerDropdownOpen(!serverDropdownOpen);
  }

  useEffect(() => {
    loadChannels()
    loadVoiceChannels()
  }, [serverToken])

  return (
    <ChannelStyled>
      <div className="channel-list">
        <div className="channel-list-navbar">
          <span className="server-name">{ currentServer && currentServer!.name }</span>
          <Button type="icon" callback={() => handleServerDropdown()}>
            {serverDropdownOpen ? 
              <Icon size={16} fill="#fff"><XIcon /></Icon>           
              :
              <Icon size={16} fill="#fff"><ChevronDownIcon /></Icon>
            }
          </Button>
        </div>

        <div className="server-invite-wrapper">
          <button onClick={() => setInviteModalOpen(true)} className="server-invite-btn">Invite People</button>
        </div>

        <div className="channel-list text">
          <div className="channel-header">
            <div className="channel-header-left">
              <span>TEXT CHANNELS</span>
            </div>
            <button onClick={() => setChannelModalOpen(true)} className="add-channel-btn">
              <PlusIcon size={18} />
            </button>
          </div>
          
          { channelsJSX }
          
        </div>

        <div className="channel-list voice">
          <div className="channel-header">
            <div className="channel-header-left">
              <span>VOICE CHANNELS</span>
            </div>
            <button onClick={() => setChannelModalOpen(true)} className="add-channel-btn">
              <PlusIcon size={18} />
            </button>
          </div>

          { voiceChannelsJSX }

        </div>

        <div className="user-info-footer">
          {
            !inVoice &&
            
            <div className="user-info-footer-top">
              <div className="user-info-footer-top1">
                <div className="ping-wrapper">
                  <PingIcon size={16}/>
                  <span>Voice Connected</span>
                </div>
                <button>
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
          
          <div className="user-info-footer-bottom">
            <UserInfo avatarColor={ "#2f3136" }/>
            <div className="footerButtons">
              <Button type="icon">
                <Mute size={20}/>
              </Button>
              <Button type="icon">
                <Deafen size={20}/>
              </Button>
              <Button type="icon" callback={() => handleUserSettingsClick()}>
                <GearIcon size={20}/>          
              </Button>
            </div>
          </div>
          
        </div>

        {channelModalOpen &&
          <Modal 
          closeModal={ closeModal }
          headerText={"Create Text Channel"}
          labelText={"CHANNEL NAME"}
          buttonText={"Create Channel"}
          serverToken={serverToken}
          modalFunction={"textChannel"}
          />
        }

        {inviteModalOpen &&
          <Modal 
          closeModal={ closeModal } 
          headerText={`Invite Friends To Server`}
          labelText={"SEND THIS INVITE LINK TO A FRIEND"}
          buttonText={"Copy"}
          modalFunction={"invite"}
          inviteLink={ createInviteLink() }
          />
        }
      </div>
      {serverDropdownOpen && <ServerDropdown setServerDropdownOpen={setServerDropdownOpen}/>}
    </ChannelStyled>
  )
}

export default ChannelList
