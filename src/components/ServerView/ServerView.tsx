import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useParams, useHistory } from 'react-router-dom'
import routeList from '../../utils/routes'
import { ServerViewStyled } from '.'
import { Channel, ChannelList } from '../ChannelList'
import { ChannelMessages } from '../ChannelMessages'
import { Sidebar, Server } from '../Sidebar'
import { config, fireDb } from '../../utils/firebase'
import { Splash } from '../Splash'
import { VideoGrid } from '../VideoGrid'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'

interface ParamTypes {
  serverToken: string
}

const ServerView: FC = () => {
  const history = useHistory()
  const [currentChannel, setCurrentChannel] = useState<Channel>()
  const [currentVoiceChannel, setCurrentVoiceChannel] = useState<Channel>()
  const [currentServer, setCurrentServer] = useState<Server>()
  const [loading, setLoading] = useState(true)
  const { serverToken } = useParams<ParamTypes>()
  const [isVideo, setIsVideo] = useState(false)
  const user = useSelector(selectUser)

  // Gets current users servers and checks if they are a member of the current server path, if not they are redirected to the home page
  const getUsersServers = () => {
    if (user.id) {
      fireDb.collection('servers')
      .where('members', 'array-contains', user.id)
      .onSnapshot(({ docs }) => { 
        const serverId = docs[0].id
        if (!serverId) {
          history.push("/")
        }
      })
    }
  }

  const toggleVideoGrid = () => {
    setIsVideo(!isVideo)
  }

  useEffect(() => {
    getUsersServers()
  }, [user.id])

  return (
    <ServerViewStyled>
      <Sidebar setLoading={() => setLoading(false)} setCurrentServer={(server) => setCurrentServer(server)}/>
      <ChannelList 
        setCurrentChannel={(channel) => setCurrentChannel(channel)} 
        toggleVideoGrid={toggleVideoGrid} 
        currentServer={currentServer} 
      />
      {!isVideo ?
      <Switch>
        <Route exact path={routeList.app.channel} render={() => <ChannelMessages currentChannel={currentChannel} />}  />
      </Switch>
      :
      <VideoGrid/>
      }
    </ServerViewStyled>
  )
}

export default ServerView
