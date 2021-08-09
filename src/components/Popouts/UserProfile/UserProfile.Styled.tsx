import styled from 'styled-components'

type StyledProps = {
  bannerColor: string
  cursorX: number
  cursorY: number
}

const StyledUserProfile = styled.div<StyledProps>`
  width: 300px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.24);
  background-color: #18191c;
  border-radius: 8px;
  overflow: hidden;
  max-height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${({ cursorY }) => cursorY}px;
  left: ${({ cursorX }) => cursorX}px;
  z-index: 999;
  pointer-events: all;


  .banner {
    width: 300px;
    height: 60px;
    position: relative;
    transition: background-color .1s;
    background-color: ${({ bannerColor }) => bannerColor};
  }

  .avatarWrapper {
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    top: 16px;
    left: 16px;
    border: 6px solid #18191c;
    background-color: #18191c;
  }

  .headerTop {
    display: block;
    flex-shrink: 0;
    padding: 64px 16px 16px;
    overflow: hidden;
    position: relative;
  }

  .body {
    flex: 0 1 auto;
    min-height: 0;
    padding: 0 16px 14px;
    position: relative;
    box-sizing: border-box;
    min-height: 0;
    flex: 1 1 auto;
  }

  .divider {
    height: 1px;
    background-color: #ffffff0f;
    margin-bottom: 12px;
  }

  .bodyInner {
    color: #fff;
  }

  .roleTitle {
    color: #b9bbbe;
    margin-bottom: 8px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
  }

  .roleList {
    margin-bottom: 16px;
    position: relative;
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
  }

  .addRoleBtn {
    padding: 4px 5px;
    color: #fff;
    font-size: 11px;
    line-height: 11px;
    font-size: 12px;
    font-weight: 500;
    background: #292b2f;
    border-radius: 4px;
    box-sizing: border-box;
    height: 22px;
    margin: 0 4px 4px 0;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;   
  }

  .largeName {
    font-size: 20px;
    line-height: 24px;
    word-break: break-word;
    white-space: normal;
    align-items: flex-end;
    color: #fff;
    font-weight: 600;
    overflow: auto;
    word-break: break-all;
    text-overflow: unset;
    white-space: normal;
    vertical-align: top;
    display: block;
  }

  .smallName {
    font-size: 14px;
    font-weight: 500;
    display: block;
    line-height: 18px;
    color: #b9bbbe;
  }
  
`

export default StyledUserProfile
