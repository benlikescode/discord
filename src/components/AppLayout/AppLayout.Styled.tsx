import styled from 'styled-components'

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 72px auto;

  .app-content {
    min-height: 100vh;
    overflow: hidden;
  }
`

export default StyledAppLayout
