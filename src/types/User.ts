type User = {
  id?: string
  name: string
  avatar?: string
  status?: 'Online' | 'Idle' | 'Busy' | 'Offline'
}

export default User