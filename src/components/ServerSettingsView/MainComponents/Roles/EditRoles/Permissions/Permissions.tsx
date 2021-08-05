import { FC, useEffect, useState } from 'react'
import { StyledPermissions } from '.'
import { fireDb } from '../../../../../../utils/firebase'
import { Searchbar, ToggleSwitch } from '../../../../../System'
import { PermissionItem } from './PermissionItem'

type Permission = {
  name: string
  description: string
}

const Permissions: FC = () => {
  const [perms, setPerms] = useState<Permission[]>([])

  const getPermissions = async () => {
    let permsArr: Permission[] = []
    const perms = await fireDb.collection('permissions').get()
    perms.forEach(perm => {
      permsArr.push({
        name: perm.data()!.name,
        description: perm.data()!.description
      }) 
    })
    setPerms(permsArr) 
  }

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <StyledPermissions>
      <Searchbar />
      <div className="header">
        <span>General Server Permissions</span>
        <span className="clearPermissions">Clear permissions</span>
      </div>

      {
        perms.map((perm, idx) => (
          <PermissionItem key={idx} name={perm.name} description={perm.description}/>
        ))
      }

      
      
    </StyledPermissions>
  )
}

export default Permissions
