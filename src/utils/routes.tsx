const App = {
  landingPage: '/',
  home: '/home',
  server: '/server/:serverToken',
  channel: '/server/:serverToken/:channelToken',
  login: '/login',
  register: '/register',
  invite: '/invite/:serverToken',
  settings: '/server/:serverToken/settings',
  userSettings: '/settings'
}

const routeList = {
  app: App
}
  
export default routeList