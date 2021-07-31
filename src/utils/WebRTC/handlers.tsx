import { fireDb } from "../firebase"
import { pc } from "./config"

export const localStreamInit = async (setLocalStream: any) => {
  let localStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
  setLocalStream(localStream)

  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream)
  })

  let myAudio = document.querySelector('#localAudio') as HTMLAudioElement
  myAudio.srcObject = localStream
}

export const remoteStreamInit = (setRemoteStream: any) => {
  let remoteStream = new MediaStream()

  // Pull tracks from remote stream, add to audio stream
  pc.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track)
    })
  }
  var remoteAudio = document.querySelector('#remoteAudio') as HTMLAudioElement 

  remoteAudio.srcObject = remoteStream
  setRemoteStream(remoteStream)
}

export const createCall = async (channelId: any) => {
  // Reference Firestore collections for signaling
  const callDoc = fireDb.collection('calls').doc()
  const offerCandidates = callDoc.collection('offerCandidates')
  const answerCandidates = callDoc.collection('answerCandidates')

  await fireDb.collection('voiceChannels').doc(channelId).update({
    callToken: callDoc.id
  })

  // Get candidates for caller, save to db
  pc.onicecandidate = event => {
    event.candidate && offerCandidates.add(event.candidate.toJSON())
  }

  // Create offer
  const offerDescription = await pc.createOffer()
  await pc.setLocalDescription(offerDescription)

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  }

  await callDoc.set({ offer })

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data()
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer)
      pc.setRemoteDescription(answerDescription)
    }
  })

  // Listen for remote ICE candidates
  answerCandidates.onSnapshot(snapshot => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data())
        pc.addIceCandidate(candidate)
      }
    })
  })
}

export const answerCall = async (callId: string) => {
  const callDoc = fireDb.collection('calls').doc(callId)
  const offerCandidates = callDoc.collection('offerCandidates')
  const answerCandidates = callDoc.collection('answerCandidates')

  pc.onicecandidate = event => {
    event.candidate && answerCandidates.add(event.candidate.toJSON())
  }

  // Fetch data, then set the offer & answer

  const callData = (await callDoc.get()).data()

  const offerDescription = callData!.offer
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

  const answerDescription = await pc.createAnswer()
  await pc.setLocalDescription(answerDescription)

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  }

  await callDoc.update({ answer })

  // Listen to offer candidates

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        let data = change.doc.data()
        pc.addIceCandidate(new RTCIceCandidate(data))
      }
    })
  })
}

export const hangUp = async (roomId: string) => {
  let myAudio: any = document.querySelector('#localAudio') as HTMLAudioElement 
  const tracks: any = myAudio.srcObject!.getTracks()
  tracks.forEach((track: any) => {
    track.stop()
  })
  /*
  if (remoteStream) {
    remoteStream.getTracks().forEach((track: any) => track.stop())
  }
  */
  if (pc) {
    pc.close()
  }
  
  myAudio.srcObject = null
  let remoteAudio: any = document.querySelector('#remoteAudio') as HTMLAudioElement 
  remoteAudio.scrObject = null

  // Delete room on hangup
  if (roomId) {
    const roomRef = fireDb.collection('calls').doc(roomId)
    const calleeCandidates = await roomRef.collection('answerCandidates').get()
    calleeCandidates.forEach(async (candidate: any) => {
      await candidate.ref.delete()
    })
    const callerCandidates = await roomRef.collection('offerCandidates').get()
    callerCandidates.forEach(async (candidate: any) => {
      await candidate.ref.delete()
    })
    await roomRef.delete()
  }
  
  //window.location.reload() 
}
