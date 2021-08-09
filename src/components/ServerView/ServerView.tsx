import React, { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useParams, useHistory } from 'react-router-dom'
import routeList from '../../utils/routes'
import { ServerViewStyled } from '.'
import { ChannelList } from '../ChannelList'
import { ChannelMessages } from '../ChannelMessages'
import { fireDb } from '../../utils/firebase'
import { VideoGrid } from '../VideoGrid'
import { selectUser } from '../../reducers/user'
import { updateServer } from '../../reducers/server'
import { useDispatch, useSelector } from 'react-redux'
import { updateChannel } from '../../reducers/channel'

const ServerView: FC = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const { serverToken, channelToken }: any = useParams()
  const [videoGridOpen, setVideoGridOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  // checks if this user is a member of this server
  const checkIfUserInThisServer = async () => { 
    const query = await fireDb.collection('servers').doc(serverToken).collection('members').doc(user.id).get()
    if (!query.exists) {
      history.push("/home")
    }      
  }

  const toggleVideoGrid = () => {
    setVideoGridOpen(!videoGridOpen)
  }

  useEffect(() => {
    if (user.id && serverToken) {
      checkIfUserInThisServer()
    }
  }, [user.id, serverToken])

  // updating our global state with current channel and server
  useEffect(() => {
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

  useEffect(() => {
    if (channelToken) {
      fireDb.collection('channels').doc(channelToken).get().then((channel) => {
        dispatch(updateChannel({
          id: channel.id,
          name: channel.data()!.name
        }))
      })  
    }
     
  }, [channelToken])

  return (
    <ServerViewStyled>
      <ChannelList 
        toggleVideoGrid={toggleVideoGrid} 
        videoGridOpen={videoGridOpen}
      />
      {!videoGridOpen ?
      <Switch>
        <Route exact path={routeList.app.channel} render={() => <ChannelMessages type="channelMessages" />}  />
      </Switch>
      :
      <VideoGrid/>
      }
    </ServerViewStyled>
  )
}

export default ServerView
