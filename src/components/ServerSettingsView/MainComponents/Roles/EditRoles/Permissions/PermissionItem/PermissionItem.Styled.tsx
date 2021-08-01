import styled from 'styled-components'

const StyledPermissionItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  .labelRow {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .label {
    flex: 1;
    display: block;
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 0;
    color: #fff;
    line-height: 24px;
    font-size: 16px;
    font-weight: 500;
    word-wrap: break-word;
    cursor: pointer;
  }

  .note {
    margin-top: 8px;
    color: #b9bbbe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }

  .divider {
    margin-top: 20px;
    width: 100%;
    height: 1px;
    border-top: thin solid #ffffff0f
  }
`

export default StyledPermissionItem
