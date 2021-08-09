import styled from 'styled-components'

const InviteViewStyled = styled.div`

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .splashImage {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
`

export default InviteViewStyled