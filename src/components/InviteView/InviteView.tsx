import React, { FC, useState, useEffect } from 'react'
import { InviteViewStyled } from '.'
import splashImage from './splash.png'
import { useHistory, useParams } from 'react-router-dom'
import { config } from '../../utils/firebase'
import firebase from 'firebase'

interface ParamTypes {
  serverToken: string
}

const InviteView: FC = () => {
  (!firebase.apps.length) ? firebase.initializeApp(config) : firebase.app()
  const db = firebase.firestore()
  const [userId, setUserId] = useState("")
  const history = useHistory()
  const { serverToken } = useParams<ParamTypes>()

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUserId(user.uid)
    } else {
      history.push("/login")
    }
  })

  const addUserToServer = () => {
    if (userId) {
      db.collection("serverTracker")
      .where('servertoken', '==', serverToken)
      .where('usertoken', '==', userId)
      .onSnapshot(({ docs }) => {
        const server = docs[0]
        if (!server) {
          db.collection("serverTracker").add({
            servertoken: serverToken,
            usertoken: userId
          })
        }
        getGeneralId(serverToken)
      })
    }
  }

  const getGeneralId = (serverId: string) => {
    db.collection('channels')
    .where("serverToken", "==", serverId)
    .onSnapshot(({docs}) => {
      const generalChannelId = docs[0].id
      history.push(`/server/${serverId}/${generalChannelId}`)
    })
  }

  useEffect(() => {
    addUserToServer()
  }, [userId])

  return (
    <InviteViewStyled >
      <img src={ splashImage } className="splash-image" alt="" />
    </InviteViewStyled>
  )
}

export default InviteView
