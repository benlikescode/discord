import styled from 'styled-components'

const MemberSidebarStyled = styled.div`
  background-color: #2f3136;

  .member-list-center {
    margin: 20px 8px;

    h2 {
      font-size: 14px;
      color: #8e9297;
      padding-left: 8px;
    }
  }

  .members-grid {
    display: grid;
    gap: 2px;
    margin-top: 8px;
  }

  .memberItem {
    z-index: 1;
    cursor: pointer;
    padding: 1px 0;
    border-radius: 4px;
    color: #8e9297;
    height: 42px;
    display: flex;
    align-items: center;
    padding-left: 8px;

    :hover {
      background-color: rgba(79, 84, 92, 0.32);
    }
  }

  .active {
    background-color: rgba(79, 84, 92, 0.32);
  }
`

export default MemberSidebarStyled