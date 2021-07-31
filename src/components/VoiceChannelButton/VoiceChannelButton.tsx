import React, { FC, useEffect, useState } from 'react'
import { StyledVoiceChannelButton } from '.'
import { FlexBox } from '../FlexBox'
import { ExitIcon, HashTag, VoiceIcon } from '../Icon'
import { useHistory, useParams } from 'react-router-dom'
import { config, fireDb } from '../../utils/firebase'
import { ChannelType } from '../../types'
import { answerCall, createCall, localStreamInit, remoteStreamInit } from '../../utils/WebRTC/handlers'
import { useDispatch, useSelector } from 'react-redux'
import { selectVoice, updateVoice } from '../../reducers/voice'
import firebase from 'firebase'
import { selectUser } from '../../reducers/user'
import { OtherUserInfo } from '../OtherUserInfo'
import { VoiceChannelUser } from '../VoiceChannelUser'

type Props = {
  channel: ChannelType
  callBack?: (channel: ChannelType) => void
}

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const VoiceChannelButton: FC<Props> = ({ channel, callBack}) => {
  const history = useHistory()
  const [active, setActive] = useState(false)
  const { serverToken, channelToken } = useParams<ParamTypes>()
  const [remoteStream, setRemoteStream]: any = useState(null)
  const [localStream, setLocalStream]: any = useState(null)
  const [vcMembers, setVCMembers] = useState<string[]>([])

  const dispatch = useDispatch()
  const voice = useSelector(selectVoice)
  const user = useSelector(selectUser)

  const goToVoiceChannel = async () => {
    await localStreamInit(setLocalStream)
    remoteStreamInit(setRemoteStream)
    
    const voiceChannelRef = fireDb.collection('voiceChannels').doc(channel.id)
    const voiceChannel = await voiceChannelRef.get()
    const vcMembers: string[] = voiceChannel.data()!.members
    const callToken = voiceChannel.data()!.callToken

    dispatch(updateVoice({id: callToken, inVoice: true}))
    setVCMembers(vcMembers)

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

  const getCurrVCMembers = async () => { 
    const currVC = await fireDb.collection('voiceChannels').doc(channel.id).get()
    const memberIds: string[] = currVC.data()!.members
    setVCMembers(memberIds)  
  }

  // change this to delete a VC
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

  useEffect(() => {
    getCurrVCMembers()
  }, [serverToken])

  return (
    <StyledVoiceChannelButton>
      <button 
        onClick={() => goToVoiceChannel()} 
        className={`text-channel-wrapper ${active ? 'active' : ''}`}
      >
        <FlexBox>
          <VoiceIcon size={20}/>
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

      <div className="vcUserList">
        { vcMembers &&
          vcMembers.map((vcMember, idx) => (
            <VoiceChannelUser key={idx} userId={vcMember}/>
          ))
        }
      </div>
      
       
      <div>
        <audio id="localAudio"></audio>
        <audio id="remoteAudio"></audio>
      </div>         
    </StyledVoiceChannelButton>
  )
}

export default VoiceChannelButton

{/*
  <video muted autoPlay playsInline id="localAudio" height={200} width={200}></video>
            <video autoPlay playsInline id="remoteAudio" height={200} width={200}></video>
*/
}