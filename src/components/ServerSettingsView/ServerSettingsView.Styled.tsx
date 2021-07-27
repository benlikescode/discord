import styled from 'styled-components'

const StyledServerSettingsView = styled.div`
  display: grid;
  grid-template-columns: 0.46fr 1fr;
  height: 100vh;
  overflow: hidden;

  .sidebar {
    background-color: #2f3136;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .main {
    background-color: #36393f;
    overflow: auto;
  }

  .mainContent {
    max-width: 680px;
    height: 100%;
    box-sizing: border-box;
    padding-left: 40px;
    padding-top: 60px;
  }

  
`

export default StyledServerSettingsView
