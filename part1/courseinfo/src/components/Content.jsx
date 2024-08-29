import Part from "./Part"

const Content = ({parts}) => {
    return(
        <div>
            {parts.map((val)=>{
                return <Part key={val.name} name={val.name} exercise={val.exercise} />
            })}  
        </div>
    )
}

export default Content