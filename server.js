const express = require('express')

const app = express()

const PORT = 3001

app.get("/", (req, res) => {
    res.send({
        data: 'Hola mundo'
    })
})

app.listen(PORT, () => {
    console.log('La aplicacion esta en linea');
})
