const Total = ({ parts }) => {
    return(
        <b>
            There are a total of {parts.reduce((sum, part)=> {
                return sum += part.exercises}, 0)} exercises
        </b>
        
    )
}

export default Total