import React, { FC, useEffect } from 'react'
import { InviteViewStyled } from '.'
import splashImage from './splash.png'
import { useHistory, useParams } from 'react-router-dom'
import { config, fireDb } from '../../utils/firebase'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'

interface ParamTypes {
  serverToken: string
}

const InviteView: FC = () => {
  const history = useHistory()
  const { serverToken } = useParams<ParamTypes>()
  const user = useSelector(selectUser)

  const addUserToServer = () => {
    if (user.id) {
      fireDb.collection("serverTracker")
      .where('servertoken', '==', serverToken)
      .where('usertoken', '==', user.id)
      .onSnapshot(({ docs }) => {
        const server = docs[0]
        if (!server) {
          fireDb.collection("serverTracker").add({
            servertoken: serverToken,
            usertoken: user.id
          })
        }
        getGeneralId(serverToken)
      })
    }
  }

  const getGeneralId = (serverId: string) => {
    fireDb.collection('channels')
    .where("serverToken", "==", serverId)
    .onSnapshot(({docs}) => {
      const generalChannelId = docs[0].id
      history.push(`/server/${serverId}/${generalChannelId}`)
    })
  }

  useEffect(() => {
    addUserToServer()
  }, [user.id])

  return (
    <InviteViewStyled >
      <img src={ splashImage } className="splash-image" alt="" />
    </InviteViewStyled>
  )
}

export default InviteView
