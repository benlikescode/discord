import React, { FC, useEffect, useState } from 'react'
import { parse } from 'twemoji-parser'
import { Link, useParams } from 'react-router-dom' 

type Props = {
  key?: string
  serverEmoji: string
  serverID: string
  channelToken: string
}

interface ParamTypes {
  serverToken: string
}

const ServerAvatar: FC<Props> = ({ key, serverEmoji, serverID, channelToken }) => {
  const [active, setActive] = useState(false)
  const { serverToken } = useParams<ParamTypes>()

  useEffect(() => {
    setActive(serverID === serverToken)
  }, [serverToken])

  return (
    <Link key={key} to={`/server/${serverID}/${channelToken}`}>
      <div className={`server-image ${active ? 'active' : ''}`}>
        <img src={serverEmoji && parse(serverEmoji)[0].url} alt="server emoji"/>
      </div>
    </Link>
  )
}

export default ServerAvatar
