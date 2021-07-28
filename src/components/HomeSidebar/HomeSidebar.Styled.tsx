import styled from 'styled-components'

const StyledHomeSidebar = styled.div`

  color: #8e9297;
  background-color: #2f3136;
  position: relative;

  .topNavbar {
    height: 48px;
    background-color: #2f3136;
    box-shadow: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
  }

  .directMessagesTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 8px 4px 18px;
    margin-bottom: 5px;
    span {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 600;

      :hover {
        color: #fff;
      }
    }
  }

  .directMessageItem {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .user-info-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #292b2f;
    z-index: 999;
  }
`

export default StyledHomeSidebar
