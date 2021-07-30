import React, { FC, useEffect, useState } from 'react'
import { ChannelButtonStyled } from '.'
import { FlexBox } from '../FlexBox'
import { ExitIcon, HashTag, VoiceIcon } from '../Icon'
import { useHistory, useParams } from 'react-router-dom'
import { config, fireDb } from '../../utils/firebase'
import { ChannelType } from '../../types'
import { answerCall, createCall, createRoom, hangUp, joinRoomById, localStreamInit, openUserMedia, remoteStreamInit } from '../../utils/WebRTC/handlers'
//import { webRTCHandler } from '../../utils/helperFunctions'

type Props = {
  channel: ChannelType
  callBack?: (channel: ChannelType) => void
  channelType: 'voice' | 'text'
  setInVoice?: any

}

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const ChannelButton: FC<Props> = ({ channel, callBack, channelType, setInVoice}) => {
  const history = useHistory()
  const [active, setActive] = useState(false)
  const { serverToken, channelToken } = useParams<ParamTypes>()

  const [localStream, setLocalStream]: any = useState(null)
  const [remoteStream, setRemoteStream]: any = useState(null)
  const [peerConnection, setPeerConnection]: any = useState(null)
  const [roomId, setRoomId]: any = useState(null)

  const goToTextChannel = (channel: ChannelType) => {
    callBack && callBack(channel)  
    history.push(`/server/${channel.serverToken}/${channel.id}`) 
  }

  const goToVoiceChannel = async () => {
    await localStreamInit()
    remoteStreamInit(setRemoteStream)
    //await openUserMedia(setLocalStream, setRemoteStream)
    setInVoice(true)
    //await createCall()
    //await answerCall('4uw4Kev1fiA2tEAKLLF6')
    const benny = await fireDb.collection('calls').get()
    if (benny.size === 0) {
      await createCall()
    }
    else {
      console.log(benny.docs[0].id)
      await answerCall(benny.docs[0].id)
    }
    //await joinRoomById(remoteStream, 'ECsqDkBRIeJywXJm3NwJ') 
    //await createRoom(localStream, setRoomId, remoteStream)
  }

  const deleteChannel = (channel: ChannelType) => {
    if (channel.name !== "general") {
      fireDb.collection("channels").doc(channel.id).delete()
    }
  }

  useEffect(() => {
    setActive(channel.id === channelToken)
  }, [channel.id, channelToken])

  return (
    <ChannelButtonStyled>
      <button 
        onClick={() => channelType === 'text' ? goToTextChannel(channel) : goToVoiceChannel() } 
        className={`text-channel-wrapper ${active ? 'active' : ''}`}
      >
        <FlexBox>
          {channelType === "text" ? <HashTag size={20} /> : <VoiceIcon size={20}/>}
          <span className="text-channel-name">{ channel.name }</span>
        </FlexBox>
        
        <div className="text-channel-btns">
          <FlexBox>
            { channel.name !== 'general' &&
            <button onClick={() => deleteChannel(channel) } className="delete-channel-btn">
              <ExitIcon size={16}/>
            </button>
            }
          </FlexBox>
        </div>
      </button>
   
        { channelType === "voice" &&
          <div>
            <video muted autoPlay playsInline id="localAudio" height={200} width={200}></video>
            <video autoPlay playsInline id="remoteAudio" height={200} width={200}></video>
          </div>         
        }   
    </ChannelButtonStyled>
  )
}

export default ChannelButton
