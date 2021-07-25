import styled from 'styled-components'

const VideoGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background-color: black;

  .video-window {
    max-width: 800px;
    max-height: 500px;
  }
`

export default VideoGridStyled
