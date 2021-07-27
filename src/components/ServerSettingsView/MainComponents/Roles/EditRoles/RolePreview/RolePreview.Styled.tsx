import styled from 'styled-components'

type StyledProps = {
  roleColor?: string
  isActive: boolean
}

const StyledRolePreview = styled.div<StyledProps>`

  .rolePreview {
    display: flex;
    align-items: center;
    height: 34px;
    margin-left: -6px;
    cursor: pointer;
    position: relative;
    overflow: visible;
    border-radius: 4px; 
    margin-bottom: 2px;
    padding: 6px 10px;
    box-sizing: border-box;
    background-color: ${({ isActive }) => isActive ? '#4f545c52' : ''};
  
    :hover {
      background-color: #4f545c52;
    }
  }
 

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ roleColor }) => roleColor ? roleColor : '#99aab5'}
  }

  .roleName {
    margin-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #fff;
  }
  
`

export default StyledRolePreview
