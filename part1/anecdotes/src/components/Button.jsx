const Button = ({ onClick, action }) => {
    return(
        <div>
            <button onClick={onClick}>{action}</button>
        </div>
    )
}

export default Button 