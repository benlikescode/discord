import React, { FC } from 'react'
import { Link } from 'react-router-dom' 
import { getServerAcronym } from '../../utils/helperFunctions'

type Props = {
  server: {
    avatar?: string
    name: string
    id?: string
    generalId?: string
  }
  isActive?: boolean
  onClick: () => void
}

const ServerAvatar: FC<Props> = ({ server, isActive, onClick }) => {

  return (
    <Link onClick={() => onClick()} to={`/server/${server.id}/${server.generalId}`}>
      <div className={`server-image ${isActive ? 'active' : ''}`}>
        {server.avatar ? <img src={server.avatar} className="image" alt="" /> : <span className="serverAcronym">{getServerAcronym(server.name)}</span>}
      </div>
    </Link>
  )
}

export default ServerAvatar
