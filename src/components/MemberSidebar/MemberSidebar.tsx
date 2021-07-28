import React, { FC, useEffect, useState } from 'react'
import { MemberSidebarStyled } from '.'
import { config, fireDb } from '../../utils/firebase'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../UserInfo'
import { UserType } from '../../types'
import { UserModifyPopout } from '../UserModifyPopout'
import { Modal } from '../Modals'
import { Popout } from '../Popouts/Popout'
import useWindowDimensions from '../../utils/customHooks/useWindowDimensions'
import { Kick } from '../Modals/Kick'
import { Ban } from '../Modals/Ban'

interface ParamTypes {
  serverToken: string
}

const MemberSidebar: FC = () => {
  const { serverToken } = useParams<ParamTypes>()
  const [members, setMembers] = useState<UserType[]>([])
  const [popoutOpen, setPopoutOpen] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const { height, width } = useWindowDimensions()
  const POPOUTWIDTH = 220
  const POPOUTHEIGHT = 204

  const [kickModalOpen, setKickModalOpen] = useState(false)
  const [banModalOpen, setBankModalOpen] = useState(false)

  const closeModal = () => {
    setKickModalOpen(false)
    setBankModalOpen(false)
  }

  const getServer = () => {
    fireDb.collection('servers').doc(serverToken).get()
    .then((server) => {
      const members: string[] = server.data()!.members
      getMembers(members)
    })
  }

  const getMembers = (userIds: string[]) => {
    let usersList: UserType[] = []
    userIds.map((userId) => {
      fireDb.collection('users').doc(userId).get() 
      .then((user) => {
        let newUser = {
          name: user.data()!.username,
          avatar: user.data()!.avatarUrl
        }    
        usersList.push(newUser)
      })
    })
    setMembers(usersList)
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
    getServer()
  }, [serverToken])

  return (
    <MemberSidebarStyled >
      <div className="member-list-center">
        <h2>Members</h2>
        <div className="members-grid">
          { members.map((member, idx) => (
            <div className="memberItem" onMouseDown={(e) => handleUserClick(e)} onContextMenu={(e) => handleContextMenu(e)}>
              <UserInfo key={idx} avatar={member.avatar} userName={member.name}/>
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