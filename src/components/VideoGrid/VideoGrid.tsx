import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { VideoGridStyled } from '.'
import { selectUser } from '../../reducers/user'
import { UserVideo } from '../../UserVideo'

const VideoGrid: FC = () => {

  const user = useSelector(selectUser)

  return (
    <VideoGridStyled>
      <UserVideo name={user.name} localVideo/>
      <UserVideo name={user.name} remoteVideo/>


    </VideoGridStyled>
  )
}

export default VideoGrid
