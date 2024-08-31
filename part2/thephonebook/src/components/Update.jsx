

const Update = ({ message }) => {
    if (message==null){
        return null
    }
    return(
        <div className="notification">
            {message}
        </div>
    )
}

export default Update