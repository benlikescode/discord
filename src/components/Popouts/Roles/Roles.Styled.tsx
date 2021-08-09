import styled from 'styled-components'

type StyledProps = {
  cursorX: number
  cursorY: number
}

const StyledRoles = styled.div<StyledProps>`
  width: 250px;
  overflow: hidden;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
  background-color: #36393f;
  border: var(--border);
  position: absolute;
  top: ${({ cursorY }) => cursorY}px;
  left: ${({ cursorX }) => cursorX}px;
  z-index: 999;
  pointer-events: all;

  .rolesWrapper {
    overflow: hidden;
    height: 100%;
  }

  .roleList {
    display: grid;
    gap: 3px;
  }
  
`

export default StyledRoles
