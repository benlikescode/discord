import styled from 'styled-components'

type StyledProps = {
  avatarColor: string
}

const UserInfoStyled = styled.div<StyledProps>`
  display: flex;
  align-items: center;

  .user-profile-image {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background: ${({ avatarColor }) => avatarColor};
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 600;
    color: #8e9297;
  }

  .user-name-wrapper {
    color: #fff;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 600;
    padding-left: 10px;
  }
`

export default UserInfoStyled
