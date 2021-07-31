import { FC, ReactNode } from 'react'
import { StyledAppLayout } from '.'
import { Sidebar } from '../Sidebar'

type Props = {
  children?: ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
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
