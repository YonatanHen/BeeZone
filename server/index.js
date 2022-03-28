const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const request= require('request')
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

const port = process.env.port || 8000

app.listen(port, () => {
    console.log('app is listen to port ' + port )
})

app.get('/get-temperature', async (req,res) => {
    request.get({
        url: `https://beezone-b24ac-default-rtdb.europe-west1.firebasedatabase.app/0.json`,
        json: {}
    }, (err, response, body) => {
        if (err) {
            return res.status(400).send(err);
        } else if (response.statusCode === 200) {
            console.log(response.body)
            return res.status(200).send()
        } else {
            console.log(response.statusCode);
        }
    })
})

app.get('/*', async (req, res) => {
    res.send('BeeZone server')
})