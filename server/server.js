const express = require('express');
const app = express();
var cors = require('cors')
const axios = require('axios')
const stringSimilarity = require('string-similarity');

const foodList = require('../src/TACO/foodList.json')
const categoryList = require('../src/TACO/categoryList.json')

app.use(cors());

const config = {
    headers: {
        'X-Cosmos-Token': 'D7Xa8_zfeB7TsGMbthhYGg'
    }
}

app.get('/api/:gtin', async (req, res) => {
    const response = await axios.get(`https://api.cosmos.bluesoft.com.br/gtins/${req.params.gtin}`, config);
    const data = response.data;
    res.send(data);
});

app.get('/api/info/:desc', async (req, res) => {
    
    let produto = format(req.params.desc)
    let foodListDescArray = foodList.map(it => format(it.description));
    console.log(req.params.desc)

    let arrayPalavras = produto.split(" ");
    let resultados = [];
    for(const palavra of arrayPalavras){
        //console.log('palavra', palavra)
        let retorno = foodListDescArray.filter(item => {
            if(item.indexOf(palavra) !== -1) return true
        })
        //console.log('retorno', retorno)
        resultados.push(retorno);
    }

    let resultadosUnicos = [...new Set(resultados.flat(1))]
    //console.log('res', resultadosUnicos);

    var stringMatch = await stringSimilarity.findBestMatch(produto, resultadosUnicos);
    let info = [];
    console.log(stringMatch.bestMatch)
    if(stringMatch.bestMatch.rating >= 0.51) {
        info = foodList.filter(item => format(item.description) == format(stringMatch.bestMatch.target))
    }
    res.send(info[0]);
})

app.get('/api/recomendar/:desc/:comorbidade', async (req, res) => {
    try {

        let produtoTACO = foodList.find(item => item.description == req.params.desc);
        let categoriaTACO = categoryList.find(categoria => categoria.id == produtoTACO.category_id);
        let comorbidade = req.params.comorbidade;
        let atributo;
        switch(comorbidade){
            case 'hipertensao': 
                atributo = 'sodium';
                break;
            case 'diabetes': 
                atributo = 'carbohydrate';
                break;
            case 'ambos': 
                atributo = 'ambos';
                break;
            default:   
                atributo = 'ambos';
                break;
        }
    
        console.log(comorbidade, ' - ', atributo)
        let foodListHasProperty;
        let produtosTACOCategoria;
        let recomendadosSemTR;

        if(atributo == 'ambos'){
            foodListHasProperty = foodList.filter(item => (
                item.attributes.hasOwnProperty('sodium') && 
                item.attributes.hasOwnProperty('carbohydrate')));
            if(foodListHasProperty.length > 0) {
                produtosTACOCategoria = foodListHasProperty.filter(item => 
                    item.category_id == categoriaTACO.id && 
                    item.description != req.params.desc && 
                    item.attributes['sodium'].qty < produtoTACO.attributes['sodium'].qty && 
                    item.attributes['carbohydrate'].qty < produtoTACO.attributes['carbohydrate'].qty 
                );
                let result = produtosTACOCategoria.sort((a, b) => 
                    (a.attributes['sodium'].qty - b.attributes['sodium'].qty) && 
                    (a.attributes['carbohydrate'].qty - b.attributes['carbohydrate'].qty) 
                );
    
                recomendadosSemTR = result.filter(item => item.attributes['sodium'].qty !== "Tr" && item.attributes['carbohydrate'].qty !== "Tr")
            } else {
                res.send('PRODUTO NÃO ENCONTRADO')
            }
        } else {
            console.log('entrou else')
            foodListHasProperty = foodList.filter(item => item.attributes.hasOwnProperty(atributo))
        
            produtosTACOCategoria = foodListHasProperty.filter(item => item.category_id == categoriaTACO.id && 
                item.description != req.params.desc && 
                item.attributes[atributo].qty < produtoTACO.attributes[atributo].qty
            );
            let result = produtosTACOCategoria.sort((a, b) => a.attributes[atributo].qty - b.attributes[atributo].qty);
            recomendadosSemTR = result.filter(item => item.attributes[atributo].qty !== "Tr")
        }

        const TOP3Recomendados = recomendadosSemTR.slice(0, 3)
    
        res.send(TOP3Recomendados)
    } catch (e) {
        throw new Error(e)
    }
});

app.listen(5000, () => {
    console.log('server running in port ', 5000);
})

function format(str){
    return str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}