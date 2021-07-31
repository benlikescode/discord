import { useState, useEffect } from 'react'
import { pc } from '../WebRTC/config'

type Media = {
  audio: boolean
  video: boolean
}

export const useUserMedia = (requestedMedia: Media) => {
  const [mediaStream, setMediaStream]: any = useState(null)

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)

        // Push tracks from local stream to peer connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream)
        })

        setMediaStream(stream)
      } catch(err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track: any) => {
          track.stop()
        })
      }
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}