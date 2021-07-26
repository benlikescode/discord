const App = {
  landingPage: '/',
  home: '/home',
  server: '/server/:serverToken',
  channel: '/server/:serverToken/:channelToken',
  login: '/login',
  register: '/register',
  invite: '/invite/:serverToken',
  settings: '/server/:serverToken/settings',
  userSettings: '/settings',
  directMessages: '/direct/:channelToken'
}

const routeList = {
  app: App
}
  
export default routeList