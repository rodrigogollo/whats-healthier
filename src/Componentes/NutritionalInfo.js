import './NutritionalInfo.css';

const NutritionalInfo = ({nutritionalInfo}) => {
    return (
    <div className='NutritionalInfo'>
        <table key={nutritionalInfo.id} id={nutritionalInfo.id}>
            <thead>
                <tr>
                    <th colSpan="3">Informações Nutricionais - {nutritionalInfo.description}</th>
                </tr>
                <tr>
                    <th colSpan="3">Composição de alimentos por 100 gramas de parte comestível</th>
                </tr>
                <tr>
                    <th>Componente</th>
                    <th>Quantidade</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.entries(nutritionalInfo.attributes).map((key, value) => {
                        return <tr key={key[0]}>
                            <td key={key[0]} id={key[0]}>{key[0].charAt(0).toUpperCase() + key[0].slice(1)}</td>
                            <td>
                                {
                                    Object.entries(key[1]).map((key, value) => {
                                        let val;
                                        let unit = '';
                                        if (typeof key[1] === 'number'){
                                            val = Math.round(key[1] * 100) / 100;
                                        } else if (key[1] === 'percents') {
                                            val = '%';
                                        } else {
                                            val = key[1]
                                        } 
                                        if (key[0] !== 'unit' && key[0] !== 'qty'){
                                            if(typeof key[1] === 'object') {
                                                return <p key={value}><span>{key[0]+': '}</span>{
                                                    Object.entries(key[1]).map((chave, index) => {
                                                    return chave[1]+ ' '
                                                })}</p>
                                            } else {
                                                return <p key={value}><span>{key[0]+': '}</span>{val}</p>
                                            }
                                            //unit = key[0] + ': ';
                                        }
                                        return unit + val + ' ';
                                    })
                                }
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
    )
}

export default NutritionalInfo;