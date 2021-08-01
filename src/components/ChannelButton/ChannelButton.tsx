import React, { FC, useEffect, useState } from 'react'
import { ChannelButtonStyled } from '.'
import { FlexBox } from '../FlexBox'
import { ExitIcon, HashTag, VoiceIcon } from '../Icon'
import { useHistory, useParams } from 'react-router-dom'
import { fireDb } from '../../utils/firebase'
import { ChannelType } from '../../types'
import { answerCall, createCall, localStreamInit, remoteStreamInit } from '../../utils/WebRTC/handlers'
import { useDispatch, useSelector } from 'react-redux'
import { selectVoice, updateVoice } from '../../reducers/voice'
import firebase from 'firebase'
import { selectUser } from '../../reducers/user'

type Props = {
  channel: ChannelType
  callBack?: (channel: ChannelType) => void
  channelType: 'voice' | 'text'
}

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const ChannelButton: FC<Props> = ({ channel, callBack, channelType}) => {
  const history = useHistory()
  const [active, setActive] = useState(false)
  const { serverToken, channelToken } = useParams<ParamTypes>()
  const [remoteStream, setRemoteStream]: any = useState(null)
  const [localStream, setLocalStream]: any = useState(null)

  const dispatch = useDispatch()
  const voice = useSelector(selectVoice)
  const user = useSelector(selectUser)


  const goToTextChannel = (channel: ChannelType) => {
    callBack && callBack(channel)  
    history.push(`/server/${channel.serverToken}/${channel.id}`) 
  }

  const goToVoiceChannel = async () => {
    await localStreamInit(setLocalStream)
    remoteStreamInit(setRemoteStream)
    
    const voiceChannelRef = fireDb.collection('voiceChannels').doc(channel.id)
    dispatch(updateVoice({id: channel.id, inVoice: true}))


    const voiceChannel = await voiceChannelRef.get()
    const vcMembers: string[] = voiceChannel.data()!.members
    const callToken = voiceChannel.data()!.callToken
    if (vcMembers.length === 0) {
      await createCall(channel.id)
    }
    else {
      await answerCall(callToken)
    }
    await voiceChannelRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(user.id)
    })
  }

  const deleteChannel = (channel: ChannelType) => {
    if (channel.name !== "general") {
      fireDb.collection("channels").doc(channel.id).delete()
    }
  }

  const handleMute = () => {
    if (localStream) {
      if (voice.isMuted) {
        localStream.getAudioTracks()[0].enabled = false
      }
      if (!voice.isMuted) {
        localStream.getAudioTracks()[0].enabled = true
      }
    }
    
  }

  useEffect(() => {
    setActive(channel.id === channelToken)
  }, [channel.id, channelToken])

  useEffect(() => {
    handleMute()
  }, [voice])

  return (
    <ChannelButtonStyled>
      <button 
        onClick={() => channelType === 'text' ? goToTextChannel(channel) : goToVoiceChannel() } 
        className={`text-channel-wrapper ${active ? 'active' : ''}`}
      >
        <div className="channelContent">
          {channelType === "text" ? <HashTag size={20} /> : <VoiceIcon size={20}/>}
          <span className="text-channel-name">{ channel.name }</span>
        </div>
        
        <div className="text-channel-btns">
          <FlexBox>
            { channel.name !== 'general' &&
            <div onClick={() => deleteChannel(channel) } className="delete-channel-btn">
              <ExitIcon size={16}/>
            </div>
            }
          </FlexBox>
        </div>
      </button>
   
        { channelType === "voice" &&
          <div>
            <audio id="localAudio"></audio>
            <audio id="remoteAudio"></audio>
          </div>         
        }   
    </ChannelButtonStyled>
  )
}

export default ChannelButton

{/*
  <video muted autoPlay playsInline id="localAudio" height={200} width={200}></video>
            <video autoPlay playsInline id="remoteAudio" height={200} width={200}></video>
*/
}