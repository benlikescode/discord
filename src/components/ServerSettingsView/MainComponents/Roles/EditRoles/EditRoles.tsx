import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/outline'
import { FC, useState, useEffect } from 'react'
import { StyledEditRoles } from '.'
import { Button, Icon } from '../../../../System'
import { useParams, useHistory } from 'react-router-dom'
import { RoleType } from '../../../../../types/'
import { config, fireDb } from '../../../../../utils/firebase'
import { RolePreview } from './RolePreview'
import { Input } from '../../../../System/Input'

interface ParamTypes {
  serverToken: string
  channelToken: string
}

const EditRoles: FC = () => {
  const { serverToken, channelToken } = useParams<ParamTypes>()
  const history = useHistory()
  const [roles, setRoles] = useState<RoleType[]>([])
  const [inputRoleName, setInputRoleName] = useState("")
  const [selectedRoleColor, setSelectedRoleColor] = useState("rgb(153,170,181)")

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = () => {
    fireDb.collection('servers').doc(serverToken)
    .get()
    .then((snapshot) => {
      const roles: RoleType[] = snapshot.data()!.roles
      setRoles(roles)
            
    })
  }

  const addRole = () => {
    const newRole: RoleType = {
      name: inputRoleName,
      color: selectedRoleColor 
    }
    const newRoles = roles.concat(newRole)
    setRoles(newRoles)
    addRoleToDb(newRoles) 
  }

  const addRoleToDb = (newRoles: RoleType[]) => {
    fireDb.collection("servers").doc(serverToken).update({roles: newRoles}).then(() => {
      console.log("Roles Updated Successfully")
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    }) 
  }

  return (
    <StyledEditRoles>
      <div className="roleList">
        <div className="roleListHeader">
          <div className="roleListHeaderLeft">
            <Icon size={18}><ArrowLeftIcon /></Icon>
            <span className="backText">Back</span>
          </div>
          <div className="newRoleButton">
            <Button type="icon" callback={addRole}>
              <Icon size={16} fill="#fff"><PlusIcon /></Icon>
            </Button>
          </div>
        </div>

        <div className="list">
          { 
          roles.map((role, idx) => (       
            <RolePreview key={idx} roleColor={role.color} roleName={role.name}/>         
          ))
          }
          <RolePreview roleColor="#99aab5" roleName="@everyone"/>     
        </div>
       
      </div>

      <div className="editRoleSection">
        <div className="editRoleHeader">
          <div className="editRoleTitleContainer">
            <span>Edit Role - </span>
            <span>Top Frag</span>
          </div>
          <div className="tabBar">
            <div className="tabBarItem">Display</div>
            <div className="tabBarItem">Permissions</div>
            <div className="tabBarItem">Manage Members (0)</div>
          </div>
        </div>

        <div className="roleNameInput">
          <Input type="text" placeholder="new role" label="ROLE NAME" callback={setInputRoleName}/>
        </div>

        <div className="colorPicker">
          <h5>Role Color</h5>
          <div className="colorPickerText">Members use the color of the highest role they have on the roles list.</div>
          <div className="colorPickerContainer">
            <div className="defaultColorContainer">
              <button></button>
            </div>
            <div className="colorSelectContainer">
              <div className="colorSelectRow">
                <button className="colorSelectItem" style={{backgroundColor: "rgb(26, 188, 156)"}} onClick={() => setSelectedRoleColor("rgb(26, 188, 156)")}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(46, 204, 113)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(52, 152, 219)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(155, 89, 182)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(233, 30, 99)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(241, 196, 15)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(230, 126, 34)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(231, 76, 60)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(149, 165, 166)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(96, 125, 139)"}}></button>
              </div>
              <div className="colorSelectRow">
                <button className="colorSelectItem" style={{backgroundColor: "rgb(17, 128, 106)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(31, 139, 76)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(32, 102, 148)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(113, 54, 138)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(173, 20, 87)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(194, 124, 14)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(168, 67, 0)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(153, 45, 34)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(151, 156, 159)"}}></button>
                <button className="colorSelectItem" style={{backgroundColor: "rgb(84, 110, 122)"}}></button>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </StyledEditRoles>
  )
}

export default EditRoles
