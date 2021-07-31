import React, { FC, useEffect, useState } from 'react'
import { MemberSidebarStyled } from '.'
import { fireDb } from '../../utils/firebase'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../UserInfo'
import { UserType } from '../../types'
import { UserModifyPopout } from '../UserModifyPopout'
import { Modal, Kick, Ban } from '../Modals'
import { Popout } from '../Popouts/Popout'
import useWindowDimensions from '../../utils/customHooks/useWindowDimensions'
import { useSelector } from 'react-redux'
import { selectServer } from '../../reducers/server'
import { OtherUserInfo } from '../OtherUserInfo'

const MemberSidebar: FC = () => {
  const { serverToken }: any = useParams()
  const [members, setMembers] = useState<UserType[]>([])
  const [popoutOpen, setPopoutOpen] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const { height, width } = useWindowDimensions()
  const POPOUTWIDTH = 220
  const POPOUTHEIGHT = 204

  const [kickModalOpen, setKickModalOpen] = useState(false)
  const [banModalOpen, setBankModalOpen] = useState(false)

  const [memberIds, setMemberIds] = useState<string[]>([])

  const closeModal = () => {
    setKickModalOpen(false)
    setBankModalOpen(false)
  }

  const getServerMembers = async () => {
    const server = await fireDb.collection('servers').doc(serverToken).get()
    setMemberIds(server.data()!.members)
  }

  const handleUserClick = (e: any) => {
    // right click
    if (e.which === 3) {
      setPopoutOpen(true)
    }
  }

  const closePopout = () => {
    setPopoutOpen(false)
  }

  const handleContextMenu = (e: any) => {
    e.preventDefault()     
    setXpos(e.pageX - POPOUTWIDTH)
    if (e.pageY > height - POPOUTHEIGHT) {
      setYpos(height - POPOUTHEIGHT - 10)
    }
    else {
      setYpos(e.pageY)
    } 
    setPopoutOpen(true)
  }
  

  useEffect(() => {
    getServerMembers()
  }, [serverToken])

  return (
    <MemberSidebarStyled >
      <div className="member-list-center">
        <h2>Members</h2>
        <div className="members-grid">
          { memberIds.map((memberId, idx) => (
            <div className="memberItem" onMouseDown={(e) => handleUserClick(e)} onContextMenu={(e) => handleContextMenu(e)} key={idx}>
              <OtherUserInfo userId={memberId}/>
            </div>
          )) }
        </div>
      </div>
      {popoutOpen && 
        <Popout closePopout={closePopout}>
          <UserModifyPopout userId="13" cursorX={xpos} cursorY={ypos} closePopout={closePopout} setKickModalOpen={setKickModalOpen} setBanModalOpen={setBankModalOpen}/>
        </Popout>
      }
      {
        kickModalOpen &&
        <Modal closeModal={closeModal}>
          <Kick closeModal={closeModal} userId="13"/>
        </Modal>
      }
      {
        banModalOpen &&
        <Modal closeModal={closeModal}>
          <Ban closeModal={closeModal} userId="maY5O1I4zDf4L1qRn6sObKp6NfP2"/>
        </Modal>
      }
     
    </MemberSidebarStyled>
  )
}

export default MemberSidebar