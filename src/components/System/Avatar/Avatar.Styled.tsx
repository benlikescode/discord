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
`

export default StyledAvatar

