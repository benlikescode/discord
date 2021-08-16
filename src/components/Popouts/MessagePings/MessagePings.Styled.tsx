import styled from 'styled-components'

const StyledMessagePings = styled.div`
  position: absolute;
  bottom: 80px;
  left: 15px;
  border-radius: 5px;
  background-color: #2f3136;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(4,4,5,0.15), 0 8px 16px rgba(0,0,0,0.24);
  width: calc(100% - 30px);
  z-index: 999;
  pointer-events: all;
  
  .header {
    padding: 10px;
    color: #b9bbbe;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
  }

  .memberList {
    display: grid;
    gap: 5px;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .memberItem {
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    
    :hover {
      background-color: #36393f;
    }
  }
`

export default StyledMessagePings
