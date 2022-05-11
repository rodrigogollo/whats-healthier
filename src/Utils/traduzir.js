export function traduzir(obj) {
    let newObj = {};
    for(const key in obj) {
        switch(key) {
            case 'humidity': {
                newObj['umidade'] = obj[key];
                break;
            }
            case 'protein': {
                newObj['proteina'] = obj[key];
                break;
            }
            case 'lipid': {
                newObj['lipideos'] = obj[key];
                break;
            }
            case 'cholesterol': {
                newObj['colesterol'] = obj[key];
                break;
            }
            case 'carbohydrate': {
                newObj['carboidrato'] = obj[key];
                break;
            }
            case 'fiber': {
                newObj['fibra'] = obj[key];
                break;
            }
            case 'ashes': {
                newObj['cinzas'] = obj[key];
                break;
            }
            case 'calcium': {
                newObj['calcio'] = obj[key];
                break;
            }
            case 'magnesium': {
                newObj['magnesio'] = obj[key];
                break;
            }
            case 'phosphorus': {
                newObj['fosforo'] = obj[key];
                break;
            }
            case 'iron': {
                newObj['ferro'] = obj[key];
                break;
            }
            case 'sodium': {
                newObj['sodio'] = obj[key];
                break;
            }
            case 'potassium': {
                newObj['potassio'] = obj[key];
                break;
            }
            case 'copper': {
                newObj['cobre'] = obj[key];
                break;
            }
            case 'zinc': {
                newObj['zinco'] = obj[key];
                break;
            }
            case 'thiamine': {
                newObj['tiamina'] = obj[key];
                break;
            }
            case 'riboflavin': {
                newObj['riboflavina'] = obj[key];
                break;
            }
            case 'pyridoxine': {
                newObj['piridoxina'] = obj[key];
                break;
            }
            case 'niacin': {
                newObj['niacina'] = obj[key];
                break;
            }
            case 'energy': {
                newObj['energia'] = obj[key];
                break;
            }
            case 'fatty_acids': {
                newObj['acidos_graxos'] = obj[key];
                break;
            }
            case 'monounsaturated': {
                newObj['monoinsaturado'] = obj[key];
                break;
            }
            case 'polyunsaturated': {
                newObj['poliinsaturado'] = obj[key];
                break;
            }
            case 'manganese': {
                newObj['magnesio'] = obj[key];
                break;
            }    
        }

        // switch(obj[key]) {
        //     case 'percents': {
        //         newObj[key] = '%'
        //     }
        // }
    }
    return newObj;
}