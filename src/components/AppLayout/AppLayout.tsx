import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledAppLayout } from '.'
import { selectUser } from '../../reducers/user'
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
