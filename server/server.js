const express = require('express')
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(5000, () => {
    console.log('server running in port ', 5000);
})