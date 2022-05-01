const NutritionalInfo = ({nutritionalInfo}) => {
    return (
    <div className='Informações Nutricionais'>
        <h1>Informações Nutricionais - {nutritionalInfo.description}</h1>
        
         <ul key={nutritionalInfo.id} id={nutritionalInfo.id}>
             {console.log('n', nutritionalInfo)}
        {
            Object.entries(nutritionalInfo.attributes).map((key,value) => {
                console.log('key', key[0])
                return <li key={key[0]} id={key[0]}>{key[0]}
                    <ul>
                        { 
                            Object.entries(key[1]).map((item) => {
                                return <li key={item[0]} id={item[0]}>{`${item[0]}: ${item[1]}`}</li>
                            })
                        }
                    </ul>
                </li>
            })
        }
        </ul> 
    </div>
    )
}

export default NutritionalInfo;