import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useParams, useHistory } from 'react-router-dom'
import routeList from '../../utils/routes'
import { ServerViewStyled } from '.'
import { ChannelList } from '../ChannelList'
import { ChannelMessages } from '../ChannelMessages'
import { Sidebar } from '../Sidebar'
import { config, fireDb } from '../../utils/firebase'
import { Splash } from '../Splash'
import { VideoGrid } from '../VideoGrid'
import { selectUser } from '../../reducers/user'
import { updateServer } from '../../reducers/server'
import { useDispatch, useSelector } from 'react-redux'
import { ServerType, ChannelType } from '../../types'

interface ParamTypes {
  serverToken: string
}

const ServerView: FC = () => {
  const history = useHistory()
  const [currentChannel, setCurrentChannel] = useState<ChannelType>()
  const [currentVoiceChannel, setCurrentVoiceChannel] = useState<ChannelType>()
  const [loading, setLoading] = useState(true)
  const { serverToken } = useParams<ParamTypes>()
  const [isVideo, setIsVideo] = useState(false)
  const dispatch = useDispatch()
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

  useEffect(() => {
    console.log(serverToken)
    if (serverToken) {
      fireDb.collection('servers').doc(serverToken).get().then((server) => {
        dispatch(updateServer({
          id: serverToken,
          name: server.data()!.name,
          avatar: server.data()!.avatar
        }))
      })  
    }
     
  }, [serverToken])

  return (
    <ServerViewStyled>
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
