import { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { StyledModal } from '.'

type Props = {
  closeModal: any
  children: ReactNode
}

const Modal: FC<Props> = ({ closeModal, children }) => {
  return ReactDOM.createPortal(
    <StyledModal>
    <div className="layerContainer">
      <div className="modal">
        <div className="modalBody">
         { children }
        </div>
      </div>
      <div className="backdrop" onClick={() => closeModal()} />
    </div>
  </StyledModal>, 
  document.getElementById('root') as HTMLElement
  )
}

export default Modal
