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

app.get('/api/info/:desc',  async (req, res) => {
    
    let produto = format(req.params.desc)
    let foodListDescArray = foodList.map(it => format(it.description));
    console.log(req.params.desc)
    var stringMatch = stringSimilarity.findBestMatch(produto, foodListDescArray);
    let info = []
    console.log(stringMatch)
    if(stringMatch.bestMatch.rating >= 0.51) {
        info = foodListDescArray.filter(item => item.description === stringMatch.bestMatch.target)
    } 
    res.send(info[0]);
})

app.listen(5000, () => {
    console.log('server running in port ', 5000);
})

function format(str){
    return str.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}