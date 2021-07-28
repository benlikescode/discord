import { FC } from 'react'
import { StyledModalFooter } from '.'
import { Button } from '../../../System'

type Props = {
  cancelLabel: string
  actionLabel: string
  actionCallback: any
  closeModal: any
  actionPrimaryColor: '#ED4245' | '#7289da'
}

const ModalFooter: FC<Props> = ({ cancelLabel, actionLabel, actionCallback, closeModal, actionPrimaryColor }) => {
  return (
    <StyledModalFooter>
      <Button type="solid" primaryColor={actionPrimaryColor} secondaryColor="#fff" callback={() => actionCallback()}>{actionLabel}</Button>
      <button className="cancelButton" onClick={() => closeModal()}>{cancelLabel}</button>
    </StyledModalFooter>
  )
}

export default ModalFooter
