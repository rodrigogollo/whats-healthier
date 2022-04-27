const Info = ({image, description, gtin}) =>{
    return (
        <div>
            <h1>{description}</h1>
            <img src={image} alt={description} />
        </div>   
    )
}

export default Info