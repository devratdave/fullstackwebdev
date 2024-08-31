import Button from "./Button"

const Persons = ({ filtered, buttonOnClick }) => {
    return(
        <div>
            {filtered.map((person)=>{
                return <div key={person.id}>
                    {person.name}: {person.number}
                    <Button key={person.id} action="delete" onClick={()=>buttonOnClick(person)}/>
                </div>
            })}
        </div>
    )
}

export default Persons