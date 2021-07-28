import { RoleType } from '.'

type Server = {
  id: string
  name: string
  avatar?: string
  channels?: string[]
  members?: string[]
  roles?: RoleType[]
  generalId?: string
  createdAt?: number
}

export default Server