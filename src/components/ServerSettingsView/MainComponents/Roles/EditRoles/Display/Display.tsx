import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledDisplay } from '.'
import { selectRole, updateRole } from '../../../../../../reducers/role'
import { fireDb } from '../../../../../../utils/firebase'
import { Button, Input } from '../../../../../System'

type Props = {
  loadRoles: () => void
}

const Display: FC<Props> = ({ loadRoles }) => {
  const [inputRoleName, setInputRoleName] = useState("")
  const [selectedRoleColor, setSelectedRoleColor] = useState("rgb(153,170,181)")

  const role = useSelector(selectRole)
  const dispatch = useDispatch()

  const handleUpdateRole = async () => {
    if (role.id) {
      await fireDb.collection('roles').doc(role.id).update({
        name: inputRoleName, 
        color: selectedRoleColor
      })
      dispatch(updateRole({name: inputRoleName, color: selectedRoleColor}))
      loadRoles()
    }   
  }

  return (
    <StyledDisplay>
      <div className="roleNameInput">
        <Input 
          type="text" 
          placeholder={role.name}
          label="ROLE NAME" 
          callback={setInputRoleName}
          value={inputRoleName}
        />
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
              <button className="colorSelectItem" style={{backgroundColor: "rgb(46, 204, 113)"}} onClick={() => setSelectedRoleColor("rgb(46, 204, 113)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(52, 152, 219)"}} onClick={() => setSelectedRoleColor("rgb(52, 152, 219)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(155, 89, 182)"}} onClick={() => setSelectedRoleColor("rgb(155, 89, 182)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(233, 30, 99)"}} onClick={() => setSelectedRoleColor("rgb(233, 30, 99)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(241, 196, 15)"}} onClick={() => setSelectedRoleColor("rgb(241, 196, 15)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(230, 126, 34)"}} onClick={() => setSelectedRoleColor("rgb(230, 126, 34)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(231, 76, 60)"}} onClick={() => setSelectedRoleColor("rgb(231, 76, 60)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(149, 165, 166)"}} onClick={() => setSelectedRoleColor("rgb(149, 165, 166)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(96, 125, 139)"}} onClick={() => setSelectedRoleColor("rgb(96, 125, 139)")}></button>
            </div>
            <div className="colorSelectRow">
              <button className="colorSelectItem" style={{backgroundColor: "rgb(17, 128, 106)"}} onClick={() => setSelectedRoleColor("rgb(17, 128, 106)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(31, 139, 76)"}} onClick={() => setSelectedRoleColor("rgb(31, 139, 76)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(32, 102, 148)"}} onClick={() => setSelectedRoleColor("rgb(32, 102, 148)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(113, 54, 138)"}} onClick={() => setSelectedRoleColor("rgb(113, 54, 138)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(173, 20, 87)"}} onClick={() => setSelectedRoleColor("rgb(173, 20, 87)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(194, 124, 14)"}} onClick={() => setSelectedRoleColor("rgb(194, 124, 14)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(168, 67, 0)"}} onClick={() => setSelectedRoleColor("rgb(168, 67, 0)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(153, 45, 34)"}} onClick={() => setSelectedRoleColor("rgb(153, 45, 34)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(151, 156, 159)"}} onClick={() => setSelectedRoleColor("rgb(151, 156, 159)")}></button>
              <button className="colorSelectItem" style={{backgroundColor: "rgb(84, 110, 122)"}} onClick={() => setSelectedRoleColor("rgb(84, 110, 122)")}></button>
            </div>
          </div>
        </div>
      </div>

      <Button type="blue" callback={() => handleUpdateRole()}>Save Changes</Button>
    </StyledDisplay>
  )
}

export default Display
