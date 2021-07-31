import { FC } from 'react'
import { StyledUserVideo } from '.'
import { Avatar } from '../System'

type Props = {
  avatarUrl?: string
  name: string
  localVideo?: any
  remoteVideo?: any
}

const UserVideo: FC<Props> = ({ avatarUrl, name, localVideo, remoteVideo }) => {
  return (
    <StyledUserVideo>
      {localVideo && <video muted autoPlay playsInline id="localVideo"></video>}
      {remoteVideo && <video autoPlay playsInline id="remoteVideo"></video>}
      {avatarUrl && <Avatar size={80} url={avatarUrl}/>}  
      <div className="nameBubble">
        <span>{name}</span>
      </div>
    </StyledUserVideo>
  )
}

export default UserVideo
