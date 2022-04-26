const express = require('express');
const app = express();
var cors = require('cors')
const axios = require('axios')

app.use(cors());

const config = {
    headers: {
        'X-Cosmos-Token': 'D7Xa8_zfeB7TsGMbthhYGg'
    }
}

app.get('/api/:gtin', async (req, res) => {
    console.log('entrou /api/', req.params.gtin)
    const response = await axios.get(`https://api.cosmos.bluesoft.com.br/gtins/${req.params.gtin}`, config);
    const data = response.data;
    console.log(data)
    res.send(data);
});

app.listen(5000, () => {
    console.log('server running in port ', 5000);
})
