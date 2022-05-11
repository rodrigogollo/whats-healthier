import NutritionalInfo from './NutritionalInfo';
import './Recomendados.css';

const Recomendados = ({recomendados}) => (
    <div className='recomendados'>
        <h1>Produtos Recomendados</h1>
        <div className='itens'>
            {
                recomendados.map((item, i) => <NutritionalInfo key={i} nutritionalInfo={item} /> )
            }
        </div>
    </div>
)
export default Recomendados;