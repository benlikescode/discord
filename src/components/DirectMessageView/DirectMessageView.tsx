import { FC, useState, useEffect } from 'react'
import { StyledDirectMessageView } from '.'
import { Sidebar } from '../Sidebar'
import { config, fireDb } from '../../utils/firebase'
import { Splash } from '../Splash'
import { HomeSidebar } from '../HomeSidebar'
import { Route, Switch } from 'react-router-dom'
import routeList from '../../utils/routes'
import { ChannelMessages } from '../ChannelMessages'
import { ServerType } from '../../types'


const DirectMessageView: FC = () => {
  const [loading, setLoading] = useState(true)
  const [currentServer, setCurrentServer] = useState<ServerType>()
  const [currentDirectName, setCurrentDirectName] = useState<string>("")

  return (
    <StyledDirectMessageView>
      <HomeSidebar setCurrentDirectName={(directName: string) => setCurrentDirectName(directName)} />
      <Switch>
        <Route exact path={routeList.app.directMessages} render={() => <ChannelMessages type="directMessages" currentDirectName={currentDirectName}/>}  />
      </Switch>
      
        
    </StyledDirectMessageView>
  )
}

export default DirectMessageView
