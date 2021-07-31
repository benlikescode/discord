import React, { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom' 
import { getServerAcronym } from '../../utils/helperFunctions'
import { selectServer } from '../../reducers/server'
import { Avatar } from '../System/Avatar'
import { useSelector } from 'react-redux'
import { ServerType } from '../../types'

type Props = {
  server: {
    avatar?: string
    name: string
    id?: string
    generalId?: string
  };
  isActive?: boolean;
  onClick: () => void;
}

interface ParamTypes {
  serverToken: string
}

const ServerAvatar: FC<Props> = ({ server, isActive, onClick }) => {
  const { serverToken } = useParams<ParamTypes>()

  return (
    <Link onClick={() => onClick()} to={`/server/${server.id}/${server.generalId}`}>
      <div className={`server-image ${isActive ? 'active' : ''}`}>
        {server.avatar ? <img src={server.avatar} className="image" alt="" /> : <span className="serverAcronym">{getServerAcronym(server.name)}</span>}
      </div>
    </Link>
  )
}

export default ServerAvatar
