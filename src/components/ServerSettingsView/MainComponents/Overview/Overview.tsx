import { FC, useState } from 'react'
import { StyledOverview } from '.'
import { Avatar } from '../../../System/Avatar'
import { Header } from '../Header'
import { fireDb, storage } from '../../../../utils/firebase'
import { selectServer, updateServer } from '../../../../reducers/server'
import { useDispatch, useSelector } from 'react-redux'
import { getServerAcronym } from '../../../../utils/helperFunctions'
import { Input } from '../../../System/Input'
import { Button } from '../../../System'

const Overview: FC = () => {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [inputVal, setInputVal] = useState("")
  const server = useSelector(selectServer)
  const serversDB = fireDb.collection('servers')
  const dispatch = useDispatch()

  const handleImageUpload = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      
      setImage(img)
      setImageUrl(URL.createObjectURL(img))
      
      const storageRef = storage.ref(server.id + '/profilePicture')
      
      const imageUpload = await storageRef.put(img)
      const imageUrl = await imageUpload.ref.getDownloadURL()

      await serversDB.doc(server.id).update({
        avatar: imageUrl
      })
    }
  }

  const handleNameChange = () => {
    if (inputVal === "") {
      alert("Name has not been changed")
    }
    else {
      serversDB.doc(server.id).update({
        name: inputVal
      })
      dispatch(updateServer({
        name: inputVal
      }))
    }     
  }

  return (
    <StyledOverview>
      <Header title="Server Overview"/>
      <div className="overviewWrapper">
        <div className="avatar">
          {server.avatar ? <Avatar url={imageUrl ? imageUrl : server.avatar} size={100}/> : <span className="serverAcronym">{getServerAcronym(server.name)}</span>}
          <input type="file" className="avatarInput" onChange={(e) => handleImageUpload(e)}/>
          <div className="indicator"></div>
        </div>
        <Input type="text" value={server.name} placeholder="Enter a name" label="Server Name" callback={setInputVal}/>
      </div>
      <Button type="blue" callback={() => handleNameChange()}>Save Changes</Button>
      
    </StyledOverview>
  )
}

export default Overview
