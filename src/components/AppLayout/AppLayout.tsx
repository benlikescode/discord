import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledAppLayout } from '.'
import { selectUser } from '../../reducers/user'
import { realDb } from '../../utils/firebase'
import { Sidebar } from '../Sidebar'

type Props = {
  children?: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {

  const user = useSelector(selectUser)
  const history = useHistory()

  // will probably add some cookie / localstorage for this in future
  if (!user) {
    history.push('/login')
  }

  useEffect(() => {
    if (user.id) {
      realDb.ref('removes').child(user.id).on('value', (snapshot) => {
        if (snapshot.exists()) {
          history.push('/home')
          realDb.ref('removes').child(user.id).remove()
        }
      })
    } 
  }, [user.id])

  return (
    <StyledAppLayout>
      <Sidebar />
      <div className="app-content">
        {children}
      </div>
    </StyledAppLayout>
  )
}

export default AppLayout
