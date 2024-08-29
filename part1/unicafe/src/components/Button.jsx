const Button = ({ onClick, action }) => {
    return(
        <button onClick={onClick}>{action}</button>
    )
}

export default Button