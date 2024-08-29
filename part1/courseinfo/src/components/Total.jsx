const Total = ({parts}) => {
    const total = parts.reduce((total, curr) => {
        return total += curr.exercise
    }, 0)

    return(
        <p>
            Number of exercises {total}
        </p>
    )
}

export default Total