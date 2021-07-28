import React, { FC, useEffect, useState } from 'react'
import { ChannelButtonStyled } from '.'
import { FlexBox } from '../FlexBox'
import { ExitIcon, HashTag, VoiceIcon } from '../Icon'
import { useHistory, useParams } from 'react-router-dom'
import { config, fireDb } from '../../utils/firebase'
import { ChannelType } from '../../types'
//import { webRTCHandler } from '../../utils/helperFunctions'

type Props = {
  channel: ChannelType
  callBack?: (channel: ChannelType) => void
  channelType: string
}

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const ChannelButton: FC<Props> = ({ channel, callBack, channelType}) => {
  const history = useHistory()
  const [active, setActive] = useState(false)
  const { serverToken, channelToken } = useParams<ParamTypes>()

  const [localStream, setlocalStream]: any = useState(null)
  const [remoteStream, setremoteStream]: any = useState(null)
  const [peerConnection, setPeerConnection]: any = useState(null)
  const [roomId, setroomId]: any = useState(null)

  const goToChannel = (channel: ChannelType) => {
    callBack && callBack(channel)
    channelType === 'text' ? 
    history.push(`/server/${channel.serverToken}/${channel.id}`) :
    openUserMedia()
    
    if (roomId != null) {
      joinRoomById()
    }
  }

  const deleteChannel = (channel: ChannelType) => {
    if (channel.name !== "general") {
      fireDb.collection("channels").doc(channel.id).delete()
    }
  }

  useEffect(() => {
    setActive(channel.id === channelToken)
  }, [channel.id, channelToken])

    // Start of WEB RTC Code 
  
    const configuration = {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };
          
     async function openUserMedia() {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
      var myVideo = document.querySelector('#localAudio') as HTMLVideoElement
      myVideo.srcObject = stream
      
      setlocalStream(stream)
      console.log("LOCAL: " + localStream)
      
      
    }
    
    async function hangUp() {
      var myVideo: any = document.querySelector('#localAudio') as HTMLVideoElement 
      const tracks: any = myVideo.srcObject!.getTracks()
      tracks.forEach((track: any) => {
        track.stop();
      });
      /*
      if (remoteStream) {
        remoteStream.getTracks().forEach((track: any) => track.stop());
      }
    
      if (peerConnection) {
        peerConnection.close();
      }
      
      document.querySelector('#localVideo')!.srcObject = null;
      document.querySelector('#remoteVideo')!.srcObject = null;
      document.querySelector('#cameraBtn')!.disabled = false;
      document.querySelector('#joinBtn')!.disabled = true;
      document.querySelector('#createBtn')!.disabled = true;
      document.querySelector('#hangupBtn')!.disabled = true;
      document.querySelector('#currentRoom')!.innerText = '';
    
      // Delete room on hangup
      if (roomId) {
        const db = firebase.firestore();
        const roomRef = db.collection('rooms').doc(roomId);
        const calleeCandidates = await roomRef.collection('calleeCandidates').get();
        calleeCandidates.forEach(async (candidate: any) => {
          await candidate.ref.delete();
        });
        const callerCandidates = await roomRef.collection('callerCandidates').get();
        callerCandidates.forEach(async (candidate: any) => {
          await candidate.ref.delete();
        });
        await roomRef.delete();
      }
      */
    
      window.location.reload()
      
    }

     function createRoom() {
      const roomRef = fireDb.collection('rooms').doc();
    
      console.log('Create PeerConnection with configuration: ', configuration);
      setPeerConnection(new RTCPeerConnection(configuration))
     
      
        localStream.getTracks().forEach((track: any) => {
          peerConnection.addTrack(track, localStream);
        });
      
      
    
      // Code for collecting ICE candidates below
      const callerCandidatesCollection = roomRef.collection('callerCandidates');
    
      peerConnection.addEventListener('icecandidate', (event: any) => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        callerCandidatesCollection.add(event.candidate.toJSON());
      });
    
      const offer = peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      console.log('Created offer:', offer);
    
      const roomWithOffer = {
        'offer': {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      roomRef.set(roomWithOffer);
      setroomId(roomRef.id)
      console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
      
    
      peerConnection.addEventListener('track', (event: any) => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach((track: any) => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track);
        });
      });
    
      // Listening for remote session description below
      roomRef.onSnapshot(async (snapshot: any) => {
        const data = snapshot.data();
        if (!peerConnection.currentRemoteDescription && data && data.answer) {
          console.log('Got remote description: ', data.answer);
          const rtcSessionDescription = new RTCSessionDescription(data.answer);
          await peerConnection.setRemoteDescription(rtcSessionDescription);
        }
      });
      // Listening for remote session description above
    
      // Listen for remote ICE candidates below
      roomRef.collection('calleeCandidates').onSnapshot((snapshot: any) => {
        snapshot.docChanges().forEach(async (change: any) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listen for remote ICE candidates above
    }

    async function joinRoomById() {
      const roomRef = fireDb.collection('rooms').doc(`${roomId}`);
      const roomSnapshot = await roomRef.get();
      console.log("ROOMMM: " + roomId)
      console.log('Got room:', roomSnapshot.exists);

      // moved from openUserMedia()
      const tmpremoteStream = new MediaStream();
      var remoteVideo = document.querySelector('#remoteVideo') as HTMLVideoElement 
      remoteVideo.srcObject = tmpremoteStream
      setremoteStream(tmpremoteStream)
    
      if (roomSnapshot.exists) {
        console.log('Create PeerConnection with configuration: ', configuration);
        setPeerConnection(new RTCPeerConnection(configuration))
        localStream.getTracks().forEach((track: any) => {
          peerConnection.addTrack(track, localStream);
        });
    
        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        peerConnection.addEventListener('icecandidate', (event: any) => {
          if (!event.candidate) {
            console.log('Got final candidate!');
            return;
          }
          console.log('Got candidate: ', event.candidate);
          calleeCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above
    
        peerConnection.addEventListener('track', (event: any) => {
          console.log('Got remote track:', event.streams[0]);
          event.streams[0].getTracks().forEach((track: any) => {
            console.log('Add a track to the remoteStream:', track);
            remoteStream.addTrack(track);
          });
        });
    
        // Code for creating SDP answer below
        const offer = roomSnapshot.data()!.offer;
        console.log('Got offer:', offer);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        console.log('Created answer:', answer);
        await peerConnection.setLocalDescription(answer);
    
        const roomWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        await roomRef.update(roomWithAnswer);
        // Code for creating SDP answer above
    
        // Listening for remote ICE candidates below
        roomRef.collection('callerCandidates').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
              let data = change.doc.data();
              console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
              await peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
        // Listening for remote ICE candidates above
      }
    }

  return (
    <ChannelButtonStyled>
      <button onClick={() => goToChannel(channel)} className={`text-channel-wrapper ${active ? 'active' : ''}`}>
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
            <video muted autoPlay playsInline id="localAudio" height="200px" width="200px"></video>
            <video autoPlay playsInline id="remoteAudio"></video>
            <button onClick={hangUp}>Disconnect</button>
          </div>

          
        }
   
     
    </ChannelButtonStyled>
  )
}

export default ChannelButton
