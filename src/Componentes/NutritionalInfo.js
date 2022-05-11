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
                                        let res
                                        let unit = '';
                                        if (typeof key[1] !== 'string'){
                                            res = Math.round(key[1] * 100) / 100;
                                        } else if (key[1] == 'percents') {
                                            res = '%';
                                        } else {
                                            res = key[1]
                                        }
                                        if (key[0] !== 'unit' && key[0] !== 'qty'){
                                            unit = key[0] + ': ';
                                        }
                                        return unit + res + ' ';
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