import React, { FC, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routeList from './utils/routes'
import './App.css'
import { ServerView } from './components/ServerView'
import { LandingPage } from './components/LandingPage'
import { Register, LogIn } from './components/Auth'
import { InviteView } from './components/InviteView'
import { ServerSettingsView } from './components/ServerSettingsView'
import { HomeView } from './components/HomeView'
import { config, auth } from './utils/firebase'
import { UserSettingsView } from './components/UserSettingsView'
import { useDispatch } from 'react-redux'
import { updateUser, logOutUser } from './reducers/user'

const App: FC = () => {
  const dispatch = useDispatch()
 
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is: ", authUser )
      if (authUser) {
        dispatch(
          updateUser({
            id: authUser.uid,
            name: authUser.displayName,
            email: authUser.email
          })
        )
      }
      else {
        dispatch(logOutUser())
      }
    })
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route path={routeList.app.register} component={Register} />
        <Route path={routeList.app.login} component={LogIn} />
        <Route path={routeList.app.invite} component={InviteView}/>
        <Route path={routeList.app.settings} component={ServerSettingsView}/>
        <Route path={routeList.app.userSettings} component={UserSettingsView}/>

        <Route path="*">
          <Route exact path={routeList.app.landingPage} component={LandingPage} />
          <Route path={routeList.app.channel} component={ServerView} />
          <Route path={routeList.app.home} component={HomeView} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
