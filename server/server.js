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
    let foodListDescArray = foodList.map(it => it.description.toUpperCase());
    // let foodListDescArray = ["Refrigerante, tipo água tônica", "Refrigerante, tipo cola", "Refrigerante, tipo guaraná"]
    console.log(req.params.desc)
    var stringMatch = stringSimilarity.findBestMatch(req.params.desc.toUpperCase(), foodListDescArray);
    let info = foodList.filter(item => item.description.toUpperCase() === stringMatch.bestMatch.target)

    res.send(info);
})

app.listen(5000, () => {
    console.log('server running in port ', 5000);
})
