import styled from 'styled-components'

const ChannelButtonStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
  margin-top: 4px;

  .text-channel-wrapper {
    width: 100%;
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    color: inherit;
  }

  .text-channel-wrapper.active {
    width: 100%;
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
    background-color: rgba(79,84,92,0.32);
    border-radius: 3px;

    .text-channel-name {
      color: #fff;
    }
  }

  .text-channel-name {
    padding-left: 5px;
    font-size: 16px;
  }

`

export default ChannelButtonStyled