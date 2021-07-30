import styled from 'styled-components'

type StyledProps = {
  type: 'solid' | 'ghost' | 'icon' | 'closeButton' | 'blue' | 'icon2' | 'solid2' | 'red'
  primaryColor?: string
  secondaryColor?: string
  isDisabled?: boolean
  width?: string
}

const StyledButton = styled.div<StyledProps>`
  width: ${({ width }) => width ? width : 'fit-content'};
  button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    height: 32px;
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    user-select: none;
    border: none;
    ${({ type, isDisabled }) => 
      type === 'solid' && 
      !isDisabled && `
        font-weight: 400;
        font-size: 14px;
        color: #b9bbbe;
        padding: 0 10px;
        border-radius: 4px;
        background: transparent;
    
        :hover {
          background-color: #5865f2;
          color: #fff;
        }
    `}
    ${({ type, isDisabled }) => 
      type === 'icon' && 
      !isDisabled && `
        background: transparent;
        border-radius: 50%;
        padding: 5px;
        height: fit-content;
    `}
    ${({ type, isDisabled }) => 
    type === 'solid2' && 
    !isDisabled && `
      color: #b9bbbe;
      padding: 6px 10px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: transparent;
      font-weight: 400;
      height: auto;

      :hover {
        background-color: #4f545c52;
        color: #fff;
      }
  `}
   
    ${({ type, isDisabled }) => 
    type === 'icon2' && 
    !isDisabled && `
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: #b9bbbe;
      background-color: #2f3136;    
      display: flex;    
      align-items: center;   
      justify-content: center;
      margin-left: 10px;
  `}
    ${({ type, isDisabled }) => 
      type === 'blue' && 
      !isDisabled && `
        background-color: #5865f2;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        padding: 2px 16px;
    `}
    ${({ type, isDisabled }) => 
    type === 'red' && 
    !isDisabled && `
      background-color: transparent;
      color: #ED4245;
      font-weight: 400;
      font-size: 14px;
      padding: 0 10px;

      :hover {
        background-color: #ED4245;
        color: #fff;
      }
  `}
    ${({ type, isDisabled }) => 
      type === 'closeButton' && 
      !isDisabled && `
        background: transparent;
        border-radius: 50%;
        padding: 5px;
        border: 2px solid #72767d;
    `}
    ${({ primaryColor, secondaryColor, isDisabled }) => 
      primaryColor && 
      secondaryColor && 
      !isDisabled && `
        background-color: ${ primaryColor };
        color: ${ secondaryColor };
    `}
    ${({ isDisabled }) => 
      isDisabled && `
        background-color: #5865f2;
        color: #fff;
        pointer-events: none;
        cursor: not-allowed;
        opacity: .5;
        font-weight: 400;
        font-size: 14px;
        padding: 2px 16px;
        padding: 0 10px;
        border-radius: 4px;

    `}
  }
  
`

export default StyledButton