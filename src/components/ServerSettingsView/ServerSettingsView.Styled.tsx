import styled from 'styled-components'

const StyledServerSettingsView = styled.div`
  display: grid;
  grid-template-columns: 0.46fr 1fr;
  height: 100vh;

  .sidebar {
    background-color: #2f3136;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .main {
    background-color: #36393f;
  }

  .mainContent {
    max-width: 680px;
    height: 100%;
    box-sizing: border-box;

  }

  
`

export default StyledServerSettingsView
