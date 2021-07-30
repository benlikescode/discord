import React, { FC, useEffect, useState } from 'react'
import { config, fireDb } from '../../utils/firebase'
import { useParams, useHistory } from 'react-router-dom'
import { ChannelStyled } from '.'
import { Deafen, DisconnectIcon, GearIcon, Mute, PingIcon, PlusIcon, ScreenIcon, VideoIcon, VoiceIcon } from '../Icon'
import { Modal, CreateChannel, Invite } from '../Modals'
import { ChannelButton } from '../ChannelButton'
import { UserInfo } from '../UserInfo'
import { Button, Icon } from '../System'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'
import { ServerDropdown } from '../ServerDropdown'
import { ServerType, ChannelType } from '../../types/'
import { selectServer } from '../../reducers/server'
import { useSelector } from 'react-redux'
import { UserControls } from '../UserControls'
import { Popout } from '../Popouts/Popout'
import { hangUp } from '../../utils/WebRTC/handlers'

type Props = {
  setCurrentChannel: (channel: ChannelType) => void
  toggleVideoGrid: any
  //setCurrentVoiceChannel: (channel: Channel) => void
}

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const ChannelList: FC<Props> = ({ setCurrentChannel, toggleVideoGrid }) => {
  const history = useHistory()
  const [channelsJSX, setChannelsJSX] = useState<JSX.Element[]>([])
  const [voiceChannelsJSX, setVoiceChannelsJSX] = useState<JSX.Element[]>([])
  const { serverToken, channelToken } = useParams<ParamTypes>()
  const [channelModalOpen, setChannelModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inVoice, setInVoice] = useState(false)
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false)
  const currentServer = useSelector(selectServer)

  const closeModal = () => {
    setInviteModalOpen(false) 
    setChannelModalOpen(false)
  }

  const loadChannels = () => {
    if (serverToken !== '') {
      fireDb.collection('channels')
      .where('serverToken', '==', serverToken)
      .orderBy('createdAt', 'asc')
      .onSnapshot(({ docs }) => {
        const channelList = docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as ChannelType[]

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
        })) as ChannelType[]

        let voiceChannelJSX: JSX.Element[] = []

        voiceChannelList.map((channel, index) => {
          voiceChannelJSX.push( <ChannelButton key={index} channel={channel} channelType="voice" setInVoice={setInVoice}/> )
        })
        setVoiceChannelsJSX(voiceChannelJSX)
      })
    }
  }

  const handleServerDropdown = () => {
    setServerDropdownOpen(!serverDropdownOpen);
  }

  const closePopout = () => {
    setServerDropdownOpen(false)
  }

  useEffect(() => {
    loadChannels()
    loadVoiceChannels()
  }, [serverToken])

  return (
    <ChannelStyled>
      <div className="channel-list">
        <div className="channel-list-navbar">
          <span className="server-name">{ currentServer!.name }</span>
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
            inVoice &&
            
            <div className="user-info-footer-top">
              <div className="user-info-footer-top1">
                <div className="ping-wrapper">
                  <PingIcon size={16}/>
                  <span>Voice Connected</span>
                </div>
                <button onClick={hangUp}>
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
          
          <UserControls />
          
        </div>

        {channelModalOpen &&
          <Modal closeModal={closeModal}>
            <CreateChannel closeModal={closeModal}/>
          </Modal>      
        }
        {inviteModalOpen &&
          <Modal closeModal={closeModal}>
            <Invite closeModal={closeModal}/>
          </Modal>      
        }
       
      </div>
      {serverDropdownOpen && 
        <Popout closePopout={closePopout}>
          <ServerDropdown 
            setServerDropdownOpen={setServerDropdownOpen} 
            setInviteOpen={setInviteModalOpen} 
            setCreateChannelOpen={setChannelModalOpen}
          />
        </Popout>
      }
    </ChannelStyled>
  )
}

export default ChannelList
