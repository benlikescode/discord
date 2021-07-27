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
      fireDb.collection('servers').doc(serverToken).get()
      .then(server => {
        const members: string[] = server.data()!.members
        const generalId: string = server.data()!.generalId

        if (!members.includes(user.id)) {
          fireDb.collection('servers').doc(serverToken).update({
            members: members.concat(user.id)
          })
          .then(() => {
            history.push(`/server/${serverToken}/${generalId}`)
          })
        }
      }) 
    }
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
