export const getServerAcronym = (serverName: string) => {
  //return serverName.match(/\b([A-Z])/g)!.join('')
  if (serverName) {
    return serverName[0].toUpperCase()
  }
  return ""
}

export const getRandomAvatar = () => {
  const defaultAvatars = ['defaultAvatarYellow.png', 'defaultAvatarBlue.png', 'defaultAvatarGreen.png', 'defaultAvatarRed.png']
  return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
}

export const formatDate = (dateRaw: string) => {
  const date = new Date(dateRaw)
  const today = new Date()

  let dateFormatted = ""

  const dateDay = date.getDate()
  const dateMonth = date.getMonth()
  const dateYear = date.getFullYear()

  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  const dateNum = ((dateMonth + 1) * 1000000) + (dateDay * 10000) + dateYear
  const todayNum = ((todayMonth + 1) * 1000000) + (todayDay * 10000) + todayYear

  if (dateNum === todayNum) {
    dateFormatted = "Today at " + date.toLocaleTimeString().split(':')[0] + ":" + date.toLocaleTimeString().split(':')[1] + " " + date.toLocaleTimeString().split(' ')[1]
  }
  else if (dateNum === todayNum - 10000) {
    dateFormatted = "Yesterday at " + date.toLocaleTimeString().split(':')[0] + ":" + date.toLocaleTimeString().split(':')[1] + " " + date.toLocaleTimeString().split(' ')[1]
  }
  else {
    dateFormatted = date.toLocaleDateString()
  }

  return <span>{dateFormatted}</span>
}

export const createInviteLink = () => {
  const fullUrl = window.location.href
  const splitUrl = fullUrl.split('/')
  const inviteUrl = "http://" + splitUrl[2] + "/invite/" + splitUrl[4]
  return inviteUrl
}