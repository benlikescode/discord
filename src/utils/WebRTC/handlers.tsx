import { fireDb } from "../firebase"
import { configuration, pc } from "./config"

export const localStreamInit = async () => {
  let localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
  });
  var myVideo = document.querySelector('#localAudio') as HTMLVideoElement
  myVideo.srcObject = localStream

}

export const remoteStreamInit = (setRemoteStream: any) => {
  let remoteStream = new MediaStream();

// Pull tracks from remote stream, add to video stream
pc.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
        remoteStream.addTrack(track);
    });
};
var remoteVideo = document.querySelector('#remoteAudio') as HTMLVideoElement 

remoteVideo.srcObject = remoteStream;
 setRemoteStream(remoteStream)
}

export const createCall = async () => {
  // Reference Firestore collections for signaling
  const callDoc = fireDb.collection('calls').doc();
  const offerCandidates = callDoc.collection('offerCandidates');
  const answerCandidates = callDoc.collection('answerCandidates');

  const callId = callDoc.id;

  // Get candidates for caller, save to db
  pc.onicecandidate = event => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await callDoc.set({ offer });

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // Listen for remote ICE candidates
  answerCandidates.onSnapshot(snapshot => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
}

export const answerCall = async (callId: string) => {
  const callDoc = fireDb.collection('calls').doc(callId);
  const offerCandidates = callDoc.collection('offerCandidates');
  const answerCandidates = callDoc.collection('answerCandidates');

  pc.onicecandidate = event => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  // Fetch data, then set the offer & answer

  const callData = (await callDoc.get()).data();

  const offerDescription = callData!.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await callDoc.update({ answer });

  // Listen to offer candidates

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change)
      if (change.type === 'added') {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
}













export const openUserMedia = async (setLocalStream: any, setRemoteStream: any) => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream)
  })

  var myVideo = document.querySelector('#localAudio') as HTMLVideoElement
  myVideo.srcObject = stream

  // moved from openUserMedia()
  const tmpremoteStream = new MediaStream();
  var remoteVideo = document.querySelector('#remoteAudio') as HTMLVideoElement 
  remoteVideo.srcObject = tmpremoteStream
  setRemoteStream(tmpremoteStream)
  
}

export const hangUp = async () => {
 
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

export const createRoom = async (localStream: any, setRoomId: any, remoteStream: any) => {
  const roomRef = fireDb.collection('rooms').doc();

  console.log('Create PeerConnection with configuration: ', configuration);
 
  
 
  
  // Code for collecting ICE candidates below
  const callerCandidatesCollection = roomRef.collection('callerCandidates');

  pc.addEventListener('icecandidate', (event: any) => {
    if (!event.candidate) {
      console.log('Got final candidate!');
      return;
    }
    console.log('Got candidate: ', event.candidate);
    callerCandidatesCollection.add(event.candidate.toJSON());
  });

  const offer = await pc.createOffer();
  pc.setLocalDescription(offer);
  console.log('Created offer:', offer);

  const roomWithOffer = {
    'offer': {
      type: offer.type,
      sdp: offer.sdp,
    },
  };
  roomRef.set(roomWithOffer);
  setRoomId(roomRef.id)
  console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
  

  pc.addEventListener('track', (event: any) => {
    console.log('Got remote track:', event.streams[0]);
    event.streams[0].getTracks().forEach((track: any) => {
      console.log('Add a track to the remoteStream:', track);
      remoteStream.addTrack(track);
    });
  });

  // Listening for remote session description below
  roomRef.onSnapshot(async (snapshot: any) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data && data.answer) {
      console.log('Got remote description: ', data.answer);
      const rtcSessionDescription = new RTCSessionDescription(data.answer);
      await pc.setRemoteDescription(rtcSessionDescription);
    }
  });
  // Listening for remote session description above

  // Listen for remote ICE candidates below
  roomRef.collection('calleeCandidates').onSnapshot((snapshot: any) => {
    snapshot.docChanges().forEach(async (change: any) => {
      if (change.type === 'added') {
        let data = change.doc.data();
        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listen for remote ICE candidates above
}

export const joinRoomById = async (remoteStream: any, roomId: any) => {
  const roomRef = fireDb.collection('rooms').doc(`${roomId}`);
  const roomSnapshot = await roomRef.get();
  console.log("ROOMMM: " + roomId)
  console.log('Got room:', roomSnapshot.exists);

  

  if (roomSnapshot.exists) {
    console.log('Create PeerConnection with configuration: ', configuration);
    

    // Code for collecting ICE candidates below
    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    pc.addEventListener('icecandidate', (event: any) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    pc.addEventListener('track', (event: any) => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track: any) => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
    });

    // Code for creating SDP answer below
    const offer = roomSnapshot.data()!.offer;
    console.log('Got offer:', offer);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    console.log('Created answer:', answer);
    await pc.setLocalDescription(answer);

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
          await pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listening for remote ICE candidates above
  }
}
