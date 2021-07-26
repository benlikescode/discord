import { FC, useState, useEffect } from 'react'
import { StyledDirectMessageView } from '.'
import { Sidebar, Server } from '../Sidebar'
import { config, fireDb } from '../../utils/firebase'
import { Splash } from '../Splash'
import { HomeSidebar } from '../HomeSidebar'
import { Route, Switch } from 'react-router-dom'
import routeList from '../../utils/routes'
import { ChannelMessages } from '../ChannelMessages'

const DirectMessageView: FC = () => {
  const [loading, setLoading] = useState(true)
  const [currentServer, setCurrentServer] = useState<Server>()
  const [currentDirectName, setCurrentDirectName] = useState<string>("")

  return (
    <StyledDirectMessageView>
      {loading && <Splash/>}
      <Sidebar setLoading={() => setLoading(false)} setCurrentServer={(server) => setCurrentServer(server)}/>
      <HomeSidebar setCurrentDirectName={(directName: string) => setCurrentDirectName(directName)} />
      <Switch>
        <Route exact path={routeList.app.directMessages} render={() => <ChannelMessages type="directMessages" currentDirectName={currentDirectName}/>}  />
      </Switch>
      
        
    </StyledDirectMessageView>
  )
}

export default DirectMessageView
