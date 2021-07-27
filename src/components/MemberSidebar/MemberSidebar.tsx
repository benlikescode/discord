import React, { FC, useEffect, useState } from 'react'
import { MemberSidebarStyled } from '.'
import { config, fireDb } from '../../utils/firebase'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../UserInfo'
import { UserType } from '../../types'

interface ParamTypes {
  serverToken: string
}

const MemberSidebar: FC = () => {
  const { serverToken } = useParams<ParamTypes>()
  const [members, setMembers] = useState<UserType[]>([])

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

  useEffect(() => {
    getServer()
  }, [serverToken])

  return (
    <MemberSidebarStyled >
      <div className="member-list-center">
        <h2>Members</h2>
        <div className="members-grid">
          { members.map((member, idx) => (
            <UserInfo key={idx} avatar={member.avatar} userName={member.name}/>
          )) }
        </div>
      </div>
    </MemberSidebarStyled>
  )
}

export default MemberSidebar