import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useParams, useHistory } from 'react-router-dom'
import routeList from '../../utils/routes'
import { ServerViewStyled } from '.'
import { Channel, ChannelList } from '../ChannelList'
import { ChannelMessages } from '../ChannelMessages'
import { Sidebar } from '../Sidebar'
import { config, fireDb } from '../../utils/firebase'
import { Splash } from '../Splash'
import { VideoGrid } from '../VideoGrid'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'
import { ServerType } from '../../types'

interface ParamTypes {
  serverToken: string
}

const ServerView: FC = () => {
  const history = useHistory()
  const [currentChannel, setCurrentChannel] = useState<Channel>()
  const [currentVoiceChannel, setCurrentVoiceChannel] = useState<Channel>()
  const [loading, setLoading] = useState(true)
  const { serverToken } = useParams<ParamTypes>()
  const [isVideo, setIsVideo] = useState(false)
  const user = useSelector(selectUser)

  // Gets current users servers and checks if they are a member of the current server path, if not they are redirected to the home page
  const checkIfUserInThisServer = () => {
    if (user.id) {
      fireDb.collection('servers').doc(serverToken).get()
      .then((server) => {
        const members: string[] = server.data()!.members
        if (!members.includes(user.id)) {
          history.push("/home")
        }
      })    
    }
  }

  const toggleVideoGrid = () => {
    setIsVideo(!isVideo)
  }

  useEffect(() => {
    checkIfUserInThisServer()
  }, [user.id])

  return (
    <ServerViewStyled>
      <Sidebar setLoading={() => setLoading(false)}/>
      <ChannelList 
        setCurrentChannel={(channel) => setCurrentChannel(channel)} 
        toggleVideoGrid={toggleVideoGrid} 
      />
      {!isVideo ?
      <Switch>
        <Route exact path={routeList.app.channel} render={() => <ChannelMessages type="channelMessages" currentChannel={currentChannel} />}  />
      </Switch>
      :
      <VideoGrid/>
      }
    </ServerViewStyled>
  )
}

export default ServerView
