import React, { FC, useEffect, useState } from 'react'
import { fireDb } from '../../utils/firebase'
import { useParams, useHistory } from 'react-router-dom'
import { ChannelStyled } from '.'
import { DisconnectIcon, PingIcon, PlusIcon, ScreenIcon, VideoIcon } from '../Icon'
import { Modal, CreateChannel, Invite } from '../Modals'
import { ChannelButton } from '../ChannelButton'
import { UserInfo } from '../UserInfo'
import { Button, Icon } from '../System'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'
import { ServerDropdown } from '../ServerDropdown'
import { ChannelType, VoiceChannelType } from '../../types/'
import { selectServer } from '../../reducers/server'
import { useDispatch, useSelector } from 'react-redux'
import { UserControls } from '../UserControls'
import { Popout } from '../Popouts/Popout'
import { hangUp, localStreamInit, localVideoInit, remoteVideoInit } from '../../utils/WebRTC/handlers'
import { selectVoice, updateVoice } from '../../reducers/voice'
import { VoiceChannelButton } from '../VoiceChannelButton'
import firebase from 'firebase'
import { selectUser } from '../../reducers/user'
import { pc } from '../../utils/WebRTC/config'

type Props = {
  setCurrentChannel: (channel: ChannelType) => void
  toggleVideoGrid: any
  videoGridOpen: boolean
  //setCurrentVoiceChannel: (channel: Channel) => void
}

const ChannelList: FC<Props> = ({ setCurrentChannel, toggleVideoGrid, videoGridOpen }) => {
  const history = useHistory()
  const [channelsJSX, setChannelsJSX] = useState<JSX.Element[]>([])
  const [voiceChannelsJSX, setVoiceChannelsJSX] = useState<JSX.Element[]>([])
  const { channelToken, serverToken }: any = useParams()
  const [channelModalOpen, setChannelModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false)
  const [currVCMembers, setCurrVCMembers] = useState<string[]>([])
  const [hasVideoAccess, setHasVideoAccess] = useState(false)
  const dispatch = useDispatch()

  
  const server = useSelector(selectServer)
  const voice = useSelector(selectVoice)
  const user = useSelector(selectUser)

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
        })) as VoiceChannelType[]

        let voiceChannelJSX: JSX.Element[] = []

        voiceChannelList.map((channel, idx) => {
          voiceChannelJSX.push( <VoiceChannelButton key={idx} channel={channel}/> )
        })
        setVoiceChannelsJSX(voiceChannelJSX)
      })
    }
  }

  

  const handleServerDropdown = () => {
    setServerDropdownOpen(!serverDropdownOpen);
  }

  const handleVoiceDisconnect = async () => {
    await hangUp(voice.id)
    await fireDb.collection('voiceChannels').doc(voice.voiceId).update({
      members: firebase.firestore.FieldValue.arrayRemove(user.id)
    })
    dispatch(updateVoice({
      inVoice: false
    }))
    
  }

  const handleVideoClick = async () => {
    toggleVideoGrid()
    if (!videoGridOpen) {
      await localVideoInit()
      remoteVideoInit()

    }
   

  }

  const closePopout = () => {
    setServerDropdownOpen(false)
  }

  const checkVideoAccess = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.map(device => {
      if (device.kind == 'videoinput' && device.label) {
        setHasVideoAccess(true)
      }
    })
  }

  useEffect(() => {
    loadChannels()
    loadVoiceChannels()
  }, [serverToken])

  useEffect(() => {
    checkVideoAccess()
  }, [])

  return (
    <ChannelStyled>
      <div className="channel-list">
        <div className="channel-list-navbar">
          <span className="server-name">{ server!.name }</span>
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
            voice.inVoice &&
            
            <div className="user-info-footer-top">
              <div className="user-info-footer-top1">
                <div className="ping-wrapper">
                  <PingIcon size={16}/>
                  <span>Voice Connected</span>
                </div>
                <button className="disconnectButton" onClick={() => handleVoiceDisconnect()}>
                  <DisconnectIcon size={20}/>
                </button>
              </div>

              <div className="user-info-footer-top2">
                <Button type="solid" callback={() => handleVideoClick()} >
                  <div>
                    <VideoIcon size={18} />
                    <span>Video</span>
                  </div>
                </Button>
                
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
