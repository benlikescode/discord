import { FC, useState, useEffect } from 'react'
import { StyledAvatar } from '.'
import { Link } from 'react-router-dom'

type Props = {
  url: string
  size?: number
  alt?: string
  status?: 'Online' | 'Idle' | 'Busy' | 'Offline'
  onClick?: any
  userId?: string
}

const Avatar: FC<Props> = ({ url, size, alt, status, onClick, userId }) => {

  const [currSrc, setCurrSrc] = useState(url || '')
  const fallback = 'https://muscathome.com/uploads/profile_images/default.png'

  useEffect(() => {
    setCurrSrc(url)
  }, [url])

  return (
    <StyledAvatar size={size} status={status}>
      <img src={currSrc || fallback} alt={alt} onError={() => setCurrSrc(fallback)} />
      {status && <div className="status"></div>}        
    </StyledAvatar>
  )
}

export default Avatar


