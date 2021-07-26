import React, { FC, useEffect, useState } from 'react'
import { MemberSidebarStyled } from '.'
import { config, fireDb } from '../../utils/firebase'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../UserInfo'

interface ParamTypes {
  serverToken: string
}

const MemberSidebar: FC = () => {
  const { serverToken } = useParams<ParamTypes>()
  const [feeder, setFeeder] = useState<JSX.Element>()
  const [usersJSX, setUsersJSX] = useState<JSX.Element[]>([])

  useEffect(() => {
    getServer()
  }, [serverToken])

  const getServer = () => {
    setUsersJSX([])
    fireDb.collection('serverTracker')
    .where('servertoken', '==', serverToken)
    .onSnapshot(({ docs }) => {
      const users = docs.map((doc) => (doc.data().usertoken)) 
      getUsers(users)
    })
  }

  const getUsers = (userIds: string[]) => {
    userIds.map((userId: string) => {
      fireDb.collection('users')
      .where('usertoken', '==', userId)
      .get()
        .then((user) => {
          const username = user.docs[0].data().username
          setFeeder(<UserInfo key={userId} userName={username}/>)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
      })
  }

  useEffect(() => {
    if (feeder && usersJSX.filter((user) => user.key === feeder.key).length === 0) {
      setUsersJSX([...usersJSX, feeder])
    }
  }, [feeder])

  return (
    <MemberSidebarStyled >
      <div className="member-list-center">
        <h2>Members</h2>
        <div className="members-grid">
          { usersJSX }
        </div>
      </div>
    </MemberSidebarStyled>
  )
}

export default MemberSidebar