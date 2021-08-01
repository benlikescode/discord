import styled from 'styled-components'

const StyledDisplay = styled.div`

.colorPicker {
  margin-top: 24px;

  h5 {
    color: #8e9297;
  }
}

.colorPickerText {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 18px;
  color: #dcddde;
}

.colorPickerContainer {  
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  margin-right: -10px;
}

.defaultColorContainer {
  margin-top: 10px;
  margin-right: 10px;
  flex: 1;
  min-width: 60px;
  max-width: 70px;

  button {
    background-color: rgb(153, 170, 181);
    margin-right: 0;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
  }
}

.colorSelectRow {
  display: flex;
  height: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
  overflow: hidden;
}

.colorSelectItem {
  background-color: transparent;
  position: relative;
  box-sizing: border-box;
  width: 20px;
  border-radius: 3px;
  margin-right: 10px;   
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  height: 20px;
}
  
`

export default StyledDisplay
