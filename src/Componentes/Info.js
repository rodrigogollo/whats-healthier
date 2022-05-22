import './Info.css';

const Info = ({image, description, gtin}) =>{
    return (
        <div className='Info'>
            <h2>{description}</h2>
            <img src={image} alt={description} />
        </div>   
    )
}

export default Info