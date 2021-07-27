import { FC } from 'react'
import { StyledModalFooter } from '.'
import { Button } from '../../../System'

type Props = {
  cancelLabel: string
  actionLabel: string
  actionCallback: any
  closeModal: any
}

const ModalFooter: FC<Props> = ({ cancelLabel, actionLabel, actionCallback, closeModal }) => {
  return (
    <StyledModalFooter>
      <Button type="solid" primaryColor="#ED4245" secondaryColor="#fff" callback={() => actionCallback()}>{actionLabel}</Button>
      <button className="cancelButton" onClick={() => closeModal()}>{cancelLabel}</button>
    </StyledModalFooter>
  )
}

export default ModalFooter
