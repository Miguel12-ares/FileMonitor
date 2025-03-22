const express = require('express')
const path = require('path');

const app = express()

const PORT = 3001

app.use(express.static(path.join(__dirname, 'src', 'templates')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'templates', 'index.html'));
});

app.listen(PORT, () => {
    console.log('La aplicacion esta en linea');
})
