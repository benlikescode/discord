import { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { StyledPopout } from '.'

type Props = {
  closePopout: any
  children: ReactNode
}

const Popout: FC<Props> = ({ closePopout, children }) => {
  return ReactDOM.createPortal(
    <StyledPopout>
    <div className="layerContainer">   
      { children }
      <div className="backdrop" onClick={() => closePopout()} />
    </div>
  </StyledPopout>, 
  document.getElementById('root') as HTMLElement
  )
}

export default Popout
