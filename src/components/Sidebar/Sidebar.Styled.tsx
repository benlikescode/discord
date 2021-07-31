import styled from 'styled-components'

const SidebarStyled = styled.div`
  background-color: #202225;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: sticky;
  top: 0;

  .add-server-btn {
    margin: 12px 12px 0 12px;
    cursor: pointer;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: #36393f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    position: relative;
    transition: .1s ease-out;
  }

  .add-server-btn:hover {
    background-color: #43b581;
    border-radius: 16px;

    path {
      fill: #fff;
    }
  }

  .server-image {
    margin: 10px 12px 0 12px;
    cursor: pointer;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: #36393f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    position: relative;
    transition: .1s ease-out;
  }

  .server-image.active::after {
    content: "";
    top: 50%;
    bottom: 0;
    background: white;
    width: 5px;
    position: absolute;
    left: -12px;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    height: 40px;
    transform: translateY(-50%);
  }

  .server-image:hover {
    border-radius: 16px;
    background-color: #7289da;
  }
  
  .border-divider {
    width: 30px;
    border-top: 2px solid #2f3136;
    display: flex;
    margin: 10px 21px 0 21px;
  }

  .serverAcronym {
    color: #fff;
    font-weight: 500;
    line-height: 1.2em;
    white-space: nowrap;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;

    :hover {
      border-radius: 16px;

    }
  }
`

export default SidebarStyled
