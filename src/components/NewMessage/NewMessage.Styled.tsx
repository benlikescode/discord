import styled from 'styled-components'

type StyledProps = {
  canSendMessages: boolean
}

const NewMessageStyled = styled.div<StyledProps>`
  width: 100%;
  padding: 0 16px 24px 16px;
  box-sizing: border-box;
  cursor: ${({ canSendMessages }) => !canSendMessages && 'not-allowed'};
  opacity: ${({ canSendMessages }) => !canSendMessages && '0.5'};

  input {
    padding: 11px;
    outline: none;
    border: none;
    color: #dcddde;
    width: 100%;
    font-size: 1rem;
    background-color: #40444b;
    border-radius: 8px;
    box-sizing: border-box;
    height: 45px;
    pointer-events: ${({ canSendMessages }) => !canSendMessages && 'none'};
  }
`

export default NewMessageStyled
