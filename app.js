const express = require('express')
const https = require('https')
const config = require('./config.json')

const port = '443'

const app = express()

const request = (options) => {
    return new Promise((resolve, reject) => {
    https.request(options, async res => {
        console.log(`Status: ${res.statusCode}`)
        res.on('data', d => {
            if(data.startsWith('{')){
                resolve(JSON.parse(d))
            }
        })
    }).on('error', err => {
        console.error(err)
    }).end()
})}

app.get('/', async (req, res) => {
    res.send('Running...');
})

app.get('/roomData/:room', async (req, res) => {
    room = req.params.room
    console.log(`[ roomData ] req from [ ${req.ip} ]\nRoom [ ${req.params.room} ]`)

    let options = {
        hostname:'api.socrative.com',
        path: `/rooms/api/current-activity/${room}`,
        headers: config.headers,
        method: 'GET',
    }

    res.send(await request(options))
})

app.get('/quizData/:room', async (req, res) => {
    room = req.params.room
    console.log(`[ quizData ] req from [ ${req.ip} ]\nRoom [ ${req.params.room} ]`)

    let data = await request(options1), id = data.activity_id, options1 = {
        hostname:'api.socrative.com',
        path: `/rooms/api/current-activity/${room}`,
        headers: config.headers,
        method: 'GET',
    }

    const options2 = {
        hostname:'teacher.socrative.com',
        path: `/quizzes/${id}/student?room=${room}`,
        headers: config.headers,
        method: 'GET',
    }

    res.header(config.resHead)
    res.send(await request(options2))
})

app.listen(port, () => {
    console.log(`API is running on port ${port}...`)
})