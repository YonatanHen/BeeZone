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

app.get('/get-temperature/:sample', async (req,res) => {
    const sampleNum = req.params.sample

    request.get({
        url: `https://beezone-b24ac-default-rtdb.europe-west1.firebasedatabase.app/${sampleNum}.json`,
        json: {}
        
    }, (err, response, body) => {
        if (err) {

            return res.status(err.statusCode).send(err)

        } else if (response.statusCode === 200) {
            
            //Organize the relevant details
            const data = {
                temperature: response.body.T85,
                humidity: response.body.RH85
            }

            return res.status(200).send(JSON.stringify(data))

        } else {
            res.status(400).send()
        }
    })
})

app.get('/*', async (req, res) => {
    res.send('BeeZone server')
})