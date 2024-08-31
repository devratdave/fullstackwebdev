const Information = ({ arr, buttonOnClick }) =>{
    if(arr.length === 0){
        return null
    } else if(arr.length >= 10){
        return(
            <div className="warning">
                There are more than 10 countries for this search query, be more specific
            </div>
        )
    } else if(arr.length===1){
        return(
            <div>
                <h2>{arr[0].name.common}</h2>
                <p>Capital {arr[0].capital.map(cap=>cap)}</p>
                <p>Area {arr[0].area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.values(arr[0].languages).map((lang=><li key={lang}>{lang}</li>))}
                </ul>
                <h1>{arr[0].flag}</h1>
            </div>
        )
    } else {
        return(
            <div>
                {arr.map((country)=>{
                    return <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={()=>buttonOnClick(country.name.common, country.latlng[0], country.latlng[1])}>show</button>
                    </div>
                    })}
            </div>
        )
    }
}

export default Information