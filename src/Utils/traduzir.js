export function traduzir(obj) {
    let att = obj.attributes;
    let newObj = {};   
    newObj['vitamina C'] = obj?.vitaminC;
    for(const key in att) {
        switch(key) {
            case 'humidity': {
                newObj['umidade'] = att[key];
                break;
            }
            case 'protein': {
                newObj['proteina'] = att[key];
                break;
            }
            case 'lipid': {
                newObj['lipideos'] = att[key];
                break;
            }
            case 'cholesterol': {
                newObj['colesterol'] = att[key];
                break;
            }
            case 'carbohydrate': {
                newObj['carboidrato'] = att[key];
                break;
            }
            case 'fiber': {
                newObj['fibra'] = att[key];
                break;
            }
            case 'ashes': {
                newObj['cinzas'] = att[key];
                break;
            }
            case 'calcium': {
                newObj['calcio'] = att[key];
                break;
            }
            case 'magnesium': {
                newObj['magnesio'] = att[key];
                break;
            }
            case 'phosphorus': {
                newObj['fosforo'] = att[key];
                break;
            }
            case 'iron': {
                newObj['ferro'] = att[key];
                break;
            }
            case 'sodium': {
                newObj['sodio'] = att[key];
                break;
            }
            case 'potassium': {
                newObj['potassio'] = att[key];
                break;
            }
            case 'copper': {
                newObj['cobre'] = att[key];
                break;
            }
            case 'zinc': {
                newObj['zinco'] = att[key];
                break;
            }
            case 'thiamine': {
                newObj['tiamina'] = att[key];
                break;
            }
            case 'riboflavin': {
                newObj['riboflavina'] = att[key];
                break;
            }
            case 'pyridoxine': {
                newObj['piridoxina'] = att[key];
                break;
            }
            case 'niacin': {
                newObj['niacina'] = att[key];
                break;
            }
            case 'energy': {
                newObj['energia'] = att[key];
                break;
            }
            case 'fatty_acids': {
                newObj['acidos graxos'] = att[key];
                break;
            }
            case 'manganese': {
                newObj['magnesio'] = att[key];
                break;
            }
            default: {
                newObj[key] = att[key]
                break;
            }
        }
    }
    newObj['acidos graxos'] = traduzirFattyAcids(newObj['acidos graxos']);
    return newObj;
}

function traduzirFattyAcids(obj){
    let newObj = {};
    for(const key in obj) {
        switch(key) {
            case 'saturated': {
                newObj['saturado'] = obj[key];
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
            default: {
                newObj[key] = obj[key]
                break;
            }
        }
    }
    return newObj;
}