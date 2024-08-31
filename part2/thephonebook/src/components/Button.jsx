const Button = ({ action, onClick }) => {
    return(
        <button onClick={onClick}>{action}</button>
    )
}

export default Button