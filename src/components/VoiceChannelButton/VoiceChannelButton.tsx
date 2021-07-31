import React, { FC, useEffect, useState, useRef } from 'react'
import { StyledVoiceChannelButton } from '.'
import { FlexBox } from '../FlexBox'
import { ExitIcon, HashTag, VoiceIcon } from '../Icon'
import { useHistory, useParams } from 'react-router-dom'
import { fireDb } from '../../utils/firebase'
import { ChannelType, VoiceChannelType } from '../../types'
import { answerCall, createCall, localStreamInit, remoteStreamInit } from '../../utils/WebRTC/handlers'
import { useDispatch, useSelector } from 'react-redux'
import { selectVoice, updateVoice } from '../../reducers/voice'
import firebase from 'firebase'
import { selectUser } from '../../reducers/user'
import { OtherUserInfo } from '../OtherUserInfo'
import { VoiceChannelUser } from '../VoiceChannelUser'
import { selectServer } from '../../reducers/server'
import { useUserMedia } from '../../utils/customHooks/useUserMedia'

type Props = {
  channel: VoiceChannelType
  callBack?: (channel: ChannelType) => void
}

const VoiceChannelButton: FC<Props> = ({ channel, callBack}) => {
  const history = useHistory()
  const [active, setActive] = useState(false)
  const [remoteStream, setRemoteStream]: any = useState(null)
  const [localStream, setLocalStream]: any = useState(null)

  const localAudioRef = useRef<HTMLAudioElement>(null)
  const remoteAudioRef = useRef<HTMLAudioElement>(null)

  const dispatch = useDispatch()
  const voice = useSelector(selectVoice)
  const user = useSelector(selectUser)
  const server = useSelector(selectServer)

  const requestedMedia = {audio: true, video: false}
  //const localStream = useUserMedia(requestedMedia)
 

  const goToVoiceChannel = async () => {
    await localStreamInit(setLocalStream)
    //let myAudio = document.querySelector('#localAudio') as HTMLAudioElement
    //myAudio.srcObject = localStream

    remoteStreamInit(setRemoteStream)
    
    const voiceChannelRef = fireDb.collection('voiceChannels').doc(channel.id)
    const voiceChannel = await voiceChannelRef.get()
    const vcMembers: string[] = voiceChannel.data()!.members
    const callToken = voiceChannel.data()!.callToken

    dispatch(updateVoice({id: callToken, voiceId: voiceChannel.id, inVoice: true}))

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
    handleMute()
  }, [voice])

  return (
    <StyledVoiceChannelButton>
      <button onClick={() => goToVoiceChannel()} className={`text-channel-wrapper`}>
        <FlexBox>
          <VoiceIcon size={20}/>
          <span className="text-channel-name">{ channel.name }</span>
        </FlexBox>  
      </button>

      <div className="vcUserList">
        { channel.members &&
          channel.members.map((vcMember, idx) => (
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