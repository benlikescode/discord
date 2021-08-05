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

export const getAuditIcon = (type: string) => {
  switch (type) {
    case 'Ban':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path fill="#FFFFFF" d="M11.3667306,13.529955 C10.1654211,13.1768476 8.90586299,13 8,13 C5.67,13 1,14.17 1,16.5 L1,19 L10.0621141,19 C10.021119,18.67233 10,18.3385783 10,18 C10,16.3443701 10.5041979,14.8062072 11.3667306,13.529955 Z M14.7080045,10.7083081 C13.6978429,10.2255448 13,9.19426739 13,8 C13,6.34314575 14.3431458,5 16,5 C17.6568542,5 19,6.34314575 19,8 C19,8.76996698 18.7099327,9.47218511 18.2331132,10.0033394 C18.1556794,10.0011182 18.0779699,10 18,10 C16.8273956,10 15.7126841,10.2533133 14.7080045,10.7083081 Z M8,11 C6.34314575,11 5,9.65685425 5,8 C5,6.34314575 6.34314575,5 8,5 C9.65685425,5 11,6.34314575 11,8 C11,9.65685425 9.65685425,11 8,11 Z" opacity=".6"/>
        <rect width="24" height="24"/>
      </g>
    </svg>
    case 'CreatedText':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path fill="#FFFFFF" d="M16,10.2528087 L16,9 L4,9 L4,11 L14.1279823,11 C14.7114074,10.676233 15.3393223,10.4232983 16,10.2528087 Z M11.7574567,13 L4,13 L4,15 L10.5826987,15 C10.8769599,14.2743353 11.2746938,13.6015805 11.7574567,13 Z M10.0620401,17 L4,17 L4,19 L10.0621141,19 C10.021119,18.67233 10,18.3385783 10,18 C10,17.6613397 10.0210962,17.3275942 10.0620401,17 Z M4,5 L20,5 L20,7 L4,7 L4,5 Z" opacity=".6"/>
        <rect width="24" height="24"/>
      </g>
    </svg>
    case 'Kick':
      return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path fill="#FFFFFF" d="M11.3667306,13.529955 C10.1654211,13.1768476 8.90586299,13 8,13 C5.67,13 1,14.17 1,16.5 L1,19 L10.0621141,19 C10.021119,18.67233 10,18.3385783 10,18 C10,16.3443701 10.5041979,14.8062072 11.3667306,13.529955 Z M14.7080045,10.7083081 C13.6978429,10.2255448 13,9.19426739 13,8 C13,6.34314575 14.3431458,5 16,5 C17.6568542,5 19,6.34314575 19,8 C19,8.76996698 18.7099327,9.47218511 18.2331132,10.0033394 C18.1556794,10.0011182 18.0779699,10 18,10 C16.8273956,10 15.7126841,10.2533133 14.7080045,10.7083081 Z M8,11 C6.34314575,11 5,9.65685425 5,8 C5,6.34314575 6.34314575,5 8,5 C9.65685425,5 11,6.34314575 11,8 C11,9.65685425 9.65685425,11 8,11 Z" opacity=".6"/>
        <rect width="24" height="24"/>
      </g>
    </svg>
      
  }
}

export const getAuditAction = (type: string) => {
  switch (type) {
    case 'Ban':
      return 'banned'
    case 'RemovedBan':
      return 'removed the ban for'
    case 'Kick':
      return 'kicked'
    case 'Invite':
      return 'created an invite'
    case 'CreatedText':
      return 'created a text channel'
    case 'CreatedVoice':
      return 'created a voice channel'
    case 'CreatedRole':
      return 'created the role'
    case 'RemovedRole':
      return 'deleted the role'
    default:
      return ''
  }
}