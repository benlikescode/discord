import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyledMessagePings } from '.'
import { selectServer } from '../../../reducers/server'
import { fireDb } from '../../../utils/firebase'
import { OtherUserInfo } from '../../OtherUserInfo'

type Member = {
  id: string
  nickname?: string
  username?: string
}

type Props = {
  setCurrPingedMember: any
}

const MessagePings: FC<Props> = ({ setCurrPingedMember }) => {
  const server = useSelector(selectServer)
  const [members, setMembers] = useState<Member[]>([])

  const getMembers = async () => {
    fireDb.collection('servers').doc(server.id).collection('members').onSnapshot(({ docs }) => {
      setMembers(docs.map(doc => ({
        id: doc.id, 
        nickname: doc.data()!.nickname,
        username: doc.data()!.username
      } as Member)))
    })
  }

  useEffect(() => {
    if (server.id) {
      getMembers()
    }

  }, [server.id])

  return (
    <StyledMessagePings>
      <h3 className="header">Members</h3>
      <div className="memberList">
        {members.map((member, idx) => (
          <div className="memberItem" key={idx} onClick={() => setCurrPingedMember(member.nickname || member.username)}>
            <OtherUserInfo 
              userId={member.id} 
              nickname={member.nickname}
              avatarSize={24} 
            />
          </div>        
        ))}
      </div>
    </StyledMessagePings>
  )
}

export default MessagePings
