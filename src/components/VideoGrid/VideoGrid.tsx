import React, { FC } from 'react'
import { VideoGridStyled } from '.'

const VideoGrid: FC = () => {
  return (
    <VideoGridStyled>
      <div className="video-window"></div>
    </VideoGridStyled>
  )
}

export default VideoGrid
