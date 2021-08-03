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
import { auth, realDb } from './utils/firebase'
import { UserSettingsView } from './components/UserSettingsView'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, logOutUser, selectUser } from './reducers/user'
import { DirectMessageView } from './components/DirectMessageView'
import { AppLayout } from './components/AppLayout'

const App: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  // updating Users State
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          updateUser({
            id: authUser.uid,
            name: authUser.displayName,
            email: authUser.email,
            avatar: authUser.photoURL         
          })
        )
      }
      else {
        dispatch(logOutUser())
      }
    })
  }, [dispatch])

  // Note that the onDisconnect listener fires when refresh so I am setting back to Online on every refresh
  // Try and find less expensive way to do this

  // updating Users Status
  useEffect(() => {
    if (user.id) {
      const thisUserStatus = realDb.ref('status').child(user.id)
      thisUserStatus.update({status: 'Online'})
      document.onvisibilitychange = (e) => {
        if (document.visibilityState === 'hidden') {
          thisUserStatus.update({status: 'Idle'})
        }
        else {
          thisUserStatus.update({status: 'Online'})
        }
      }
      thisUserStatus.onDisconnect().update({status: 'Offline'})    
    }

  }, [user])

  

  return (
    <Router>
      <Switch>
        <Route path={routeList.app.register} component={Register} />
        <Route path={routeList.app.login} component={LogIn} />
        <Route path={routeList.app.invite} component={InviteView}/>
        <Route path={routeList.app.settings} component={ServerSettingsView}/>
        <Route path={routeList.app.userSettings} component={UserSettingsView}/>
        <Route exact path={routeList.app.landingPage} component={LandingPage} />

        <Route path="*">
          <AppLayout>
              <Route path={routeList.app.channel} component={ServerView} />
              <Route path={routeList.app.home} component={HomeView} />
              <Route path={routeList.app.directMessages} component={DirectMessageView} />
          </AppLayout>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
