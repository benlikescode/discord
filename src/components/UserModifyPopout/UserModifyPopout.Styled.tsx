import styled from 'styled-components'

type StyledProps = {
  cursorX: number
  cursorY: number
}

const StyledUserModifyPopout = styled.div<StyledProps>`
  background-color: #18191c;
  padding: 6px;
  width: 220px;
  position: absolute;
  top: ${({ cursorY }) => cursorY}px;
  left: ${({ cursorX }) => cursorX}px;
  border-radius: 4px;
  box-sizing: border-box;
  z-index: 9999999;
  pointer-events: all;

  .buttonItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

export default StyledUserModifyPopout
