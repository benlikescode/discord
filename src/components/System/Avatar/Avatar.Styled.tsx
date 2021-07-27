import styled from 'styled-components'

type StyledProps = {
  size?: number
  status?: 'Online' | 'Idle' | 'Busy' | 'Offline'
}

const StyledAvatar = styled.div<StyledProps>`
  height: ${({ size }) => size ? size : '30'}px;
  width: ${({ size }) => size ? size : '30'}px;
  position: relative;
  cursor: pointer;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }

  .status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 3px solid #36393f;
    background-color: ${({ status }) => 
    (status === 'Online' && 'green') ||
    (status === 'Offline' && 'gray')
    };
    position: absolute;
    bottom: -3px;
    right: -3px;
  }
`

export default StyledAvatar

