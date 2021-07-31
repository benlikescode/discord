import styled from 'styled-components'

const StyledUserVideo = styled.div`
  height: 300px;
  width: 500px;
  border-radius: 8px;
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .nameBubble {
    border-radius: 8px;
    background: rgba(0,0,0,0.3);
    color: #fff;
    padding: 6px 12px;
    position: absolute;
    bottom: 12px;
    left: 12px;
  }

  video {
    height: 100%;
    width: 100%;
  }
  
`

export default StyledUserVideo
