import styled from 'styled-components'

const StyledPopout = styled.div`
  .layerContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none!important;
    pointer-events: none;
    z-index: 9999999;
  }

  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
  }
`

export default StyledPopout
