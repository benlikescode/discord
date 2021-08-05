import styled from 'styled-components'

type StyledProps = {
  hasDropdown?: boolean
  bottomOpen: boolean
  iconType: 'Create' | 'Delete' | 'Update'
}

const StyledAuditItem = styled.div<StyledProps>`
  border: 1px solid #202225;;
  border-radius: 3px;

  .auditItem {
    background-color: ${({ bottomOpen }) => bottomOpen ? 'rgba(32,34,37,.6)' : 'rgba(32,34,37,.3)'};
    color: #b9bbbe;
    cursor: ${({ hasDropdown }) => hasDropdown && 'pointer'};
    padding: 10px 20px 10px 10px;
    transition: background-color .2s ease;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .auditIcon {
    position: relative;
    background: ${({ iconType }) => 
    iconType === 'Create' && "url('https://discord.com/assets/87fc8330f32b0aeed92eebccc3bd1493.svg')" ||
    iconType === 'Delete' && "url('https://discord.com/assets/9e869ac90a09e13d9825044cea88ea78.svg')" ||
    iconType === 'Update' && "url('https://discord.com/assets/fd7c3b7bb65f185a5d91f5302f30ac0c.svg')"};

    ::after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  
  .avatar {
    margin-left: 10px;
  }

  .content {
    flex: 1 1 auto;
    max-width: calc(100% - 118px);
    margin: 0 10px;
  }

  .top {
    flex: 1 1 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .label1 {
    color: #f6f6f7;
    font-weight: 500;
  }

  .action {
    color: #b9bbbe;
  }

  .label2 {
    color: #f6f6f7;
    font-weight: 500;
  }

  .timestamp {
    color: #72767d;
    font-size: 14px;
    margin-top: 4px;
  }

  .divider {
    background-color: #202225;
    width: 100%;
    height: 1px;
  }

  .bottomSection {
    flex: 1 1 auto;
    background-color: rgba(32,34,37,.3);
    color: #72767d;
    padding: 0 8px 10px;
    display: flex;
    align-items: stretch;
    justify-content: flex-start; 
    flex-direction: column;
    flex-wrap: nowrap; 
  }

  .bottomItem {
    flex: 1 1 auto;
    position: relative;
    top: 1px;
    margin-top: 8px;
    margin-left: 40px;
    display: flex;
    align-items: stretch;
    justify-content: flex-start; 
  }
  
`

export default StyledAuditItem
