const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./database/db')
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

const port = process.env.port || 8000

app.listen(port, () => {
    console.log('app is listen to port ' + port )
})

app.get('/*', async (req, res) => {
    res.send('BeeZone server')
})