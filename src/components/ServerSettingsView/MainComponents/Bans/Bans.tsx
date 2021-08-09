import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyledBans } from '.'
import { selectServer } from '../../../../reducers/server'
import { BannedUserType } from '../../../../types'
import { fireDb } from '../../../../utils/firebase'
import { Modal } from '../../../Modals'
import { BannedMember } from '../../../Modals/BannedMember'
import { OtherUserInfo } from '../../../OtherUserInfo'
import { Header } from '../Header'

const Bans: FC = () => {
  const [bannedMembers, setBannedMembers] = useState<BannedUserType[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [currBannedMember, setCurrBannedMember] = useState<BannedUserType>({id: '', reason: ''})
  
  const server = useSelector(selectServer)

  const closeModal = () => {
    setModalOpen(false)
    getBannedMembers()
  }

  const getBannedMembers = async () => {
    const thisServer = await fireDb.collection('servers').doc(server.id).get()
    const banList: BannedUserType[] = thisServer.data()!.banList
    setBannedMembers(banList.map(ban => ban))
  }

  const handleMemberClick = (bannedMember: BannedUserType) => {
    setCurrBannedMember(bannedMember)
    setModalOpen(true)
  }

  useEffect(() => {
    if (server.id) {
      getBannedMembers()
    }
  }, [server.id])

  return (
    <StyledBans>
      <Header title={`${bannedMembers.length} ${bannedMembers.length === 1 ? 'Ban' : 'Bans'}`}/>
      <div className="banList">
        {
          bannedMembers.map((bannedMember, idx) => (
            <div className="banItem" key={idx} onClick={() => handleMemberClick(bannedMember)}>
              <OtherUserInfo userId={bannedMember.id} avatarSize={40} noStatus/>
            </div>
          ))
        }       
      </div>

      {modalOpen && 
        <Modal closeModal={closeModal}>
          <BannedMember closeModal={closeModal} bannedUser={currBannedMember}/>
        </Modal>
      }

    </StyledBans>
  )
}

export default Bans
