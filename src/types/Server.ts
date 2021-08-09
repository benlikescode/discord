import { RoleType } from '.'
import BannedUser from './BannedUser'

type Server = {
  id: string
  name: string
  avatar?: string
  channels?: string[]
  members?: string[]
  roles?: RoleType[]
  generalId?: string
  createdAt?: number
  banList?: BannedUser[]
}

export default Server