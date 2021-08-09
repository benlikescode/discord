import styled from 'styled-components'

const StyledServerDropdown = styled.div`
  background-color: #18191c;
  padding: 6px;
  width: 220px;
  position: absolute;
  top: 55px;
  left: 82px;
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

  .boostIcon {
    color: hsl(302,calc(var(--saturation-factor, 1)*100%),72.5%);
  }

`

export default StyledServerDropdown
