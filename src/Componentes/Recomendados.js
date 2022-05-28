import NutritionalInfo from './NutritionalInfo';
import './Recomendados.css';
import categoryList from '../TACO/categoryList.json';

const Recomendados = ({recomendados}) => {
    var categoria = categoryList.filter(item => item.id === recomendados[0].category_id).map(item => item.category);
    console.log(categoria)
    return <div className='recomendados'>
            <h1>{`Produtos Recomendados - ${categoria}`}</h1>
            <div className='itens'>
                {
                    recomendados.map((item, i) => <NutritionalInfo key={i} nutritionalInfo={item} /> )
                }
            </div>
        </div>
}
export default Recomendados;