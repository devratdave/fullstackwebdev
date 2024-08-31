import Input from "./Input"
import Button from "./Button"

const PersonForm = ({ onChangeName, onChangeNumber, onClick }) => {
    return(
        <div>
            <h3>Add Person</h3>
            <Input onChange={onChangeName} title='Name' />
            <Input onChange={onChangeNumber} title='Number' />
            <Button action="Add" onClick={onClick} />
        </div>
    )
}

export default PersonForm