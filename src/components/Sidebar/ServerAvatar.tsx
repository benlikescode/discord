import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom' 
import { getServerAcronym } from '../../utils/helperFunctions'
import { Avatar } from '../System/Avatar'

type Props = {
  avatar?: string
  name: string
  serverId?: string
  generalId?: string
}

interface ParamTypes {
  serverToken: string
}

const ServerAvatar: FC<Props> = ({ avatar, name, serverId, generalId }) => {
  const [active, setActive] = useState(false)
  const { serverToken } = useParams<ParamTypes>()

  useEffect(() => {
    setActive(serverId === serverToken)
  }, [serverToken])

  return (
    <Link to={`/server/${serverId}/${generalId}`}>
      <div className={`server-image ${active ? 'active' : ''}`}>
        {avatar ? <img src={avatar} className="image" alt="" /> : <span className="serverAcronym">{getServerAcronym(name)}</span>}
        
      </div>
    </Link>
  )
}

export default ServerAvatar
