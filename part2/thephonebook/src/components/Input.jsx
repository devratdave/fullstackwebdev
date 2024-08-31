const Input = ({ onChange, title }) => {
    return(
        <div>
            {title}: <input onChange={onChange}></input>
        </div>
    )
}

export default Input