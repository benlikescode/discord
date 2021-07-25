import styled from 'styled-components'

const StyledSidebar = styled.div`

  width: 218px;
  padding: 60px 6px 60px 20px;
  box-sizing: border-box;

  .header {
    color: #8e9297;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 10px;

    span {
      text-transform: uppercase;
    }
  }

  .buttonItem {
    cursor: pointer;
    color: #b9bbbe;
    padding: 6px 10px;
    margin-bottom: 2px;
    border-radius: 4px;

    :hover {
      background-color: #4f545c52;
      color: #fff;
    }
  }

  .deleteServerButton {
    cursor: pointer;
    color: #ED4245;
    padding: 6px 10px;
    margin-bottom: 2px;
    border-radius: 4px;

    :hover {
      background-color: #4f545c52;
    }
  }

  .divider {
    background: #ffffff0f;
    margin: 8px 10px;
    height: 1px;
  }
  
`

export default StyledSidebar
