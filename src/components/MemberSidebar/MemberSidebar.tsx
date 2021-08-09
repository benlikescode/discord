import React, { FC, useCallback, useEffect, useState } from 'react'
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
import { UserProfile } from '../Popouts/UserProfile'
import { Nickname } from '../Modals/Nickname'

type Member = {
  id: string
  nickname?: string
}

const MemberSidebar: FC = () => {
  const { serverToken }: any = useParams()
  const [modifyPopoutOpen, setModifyPopoutOpen] = useState(false)
  const [profilePopoutOpen, setProfilePopoutOpen] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const { height, width } = useWindowDimensions()
  const POPOUTWIDTH = 220
  const POPOUTHEIGHT = 204

  const [kickModalOpen, setKickModalOpen] = useState(false)
  const [banModalOpen, setBanModalOpen] = useState(false)
  const [nickModalOpen, setNickModalOpen] = useState(false)

  const [members, setMembers] = useState<Member[]>([])
  const [currMemberId, setCurrMemberId] = useState("")

  const closeModal = useCallback(
    () => {
      setKickModalOpen(false)
      setBanModalOpen(false)
      setNickModalOpen(false)
      getServerMembers()
    },
    [],
  )

  const closePopout = () => {
    setModifyPopoutOpen(false)
    setProfilePopoutOpen(false)
    setCurrMemberId('')
  }

  const getServerMembers = () => {
    fireDb.collection('servers').doc(serverToken).collection('members').onSnapshot(({ docs }) => {
      setMembers(docs.map(doc => ({
        id: doc.id, 
        nickname: doc.data()!.nickname
      } as Member)))
    })
  }

  const handleUserClick = (e: any, memberId: string) => {
    setXpos(width - 540)
    if (e.pageY > height - POPOUTHEIGHT) {
      setYpos(height - POPOUTHEIGHT - 10)
    }
    else {
      setYpos(e.pageY)
    } 
    setCurrMemberId(memberId)
    setProfilePopoutOpen(true)
  }

  const handleContextMenu = (e: any, memberId: string) => {
    e.preventDefault()     
    setXpos(e.pageX - POPOUTWIDTH)
    if (e.pageY > height - POPOUTHEIGHT) {
      setYpos(height - POPOUTHEIGHT - 10)
    }
    else {
      setYpos(e.pageY)
    } 
    setCurrMemberId(memberId)
    setModifyPopoutOpen(true)
  }
  

  useEffect(() => {
    getServerMembers()
  }, [serverToken])

  return (
    <MemberSidebarStyled >
      <div className="member-list-center">
        <h2>Members</h2>
        <div className="members-grid">
          { members.map((member, idx) => (
            <div 
              className={`memberItem ${member.id === currMemberId && 'active'}`}
              onClick={(e) => handleUserClick(e, member.id )} 
              onContextMenu={(e) => handleContextMenu(e, member.id )}
              key={idx} 
            >
              <OtherUserInfo userId={member.id} nickname={member.nickname}/>
            </div>
          )) }
        </div>
      </div>
      {modifyPopoutOpen && 
        <Popout closePopout={closePopout}>
          <UserModifyPopout 
            userId={currMemberId} 
            cursorX={xpos} 
            cursorY={ypos} 
            closePopout={closePopout} 
            setKickModalOpen={setKickModalOpen} 
            setBanModalOpen={setBanModalOpen}
            setNickModalOpen={setNickModalOpen}
          />
        </Popout>
      }
      {profilePopoutOpen && 
        <Popout closePopout={closePopout}>
          <UserProfile 
          userId={currMemberId} 
          closePopout={closePopout}
          cursorX={xpos}
          cursorY={ypos}
          />
        </Popout>
      }
      {
        kickModalOpen &&
        <Modal closeModal={closeModal}>
          <Kick closeModal={closeModal} closePopout={closePopout} userId={currMemberId}/>
        </Modal>
      }
      {
        banModalOpen &&
        <Modal closeModal={closeModal}>
          <Ban closeModal={closeModal} closePopout={closePopout} userId={currMemberId}/>
        </Modal>
      }
      {
        nickModalOpen &&
        <Modal closeModal={closeModal}>
          <Nickname closeModal={closeModal} closePopout={closePopout} userId={currMemberId}/>
        </Modal>
      }
     
    </MemberSidebarStyled>
  )
}

export default MemberSidebar