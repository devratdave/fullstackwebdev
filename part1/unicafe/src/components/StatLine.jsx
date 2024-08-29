const StatLine = ({ name, value, description}) => {
    return(
        <div>
            {name}: {value} {description}
        </div>
    )
}

export default StatLine