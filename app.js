const express = require('express')
const responseTime = require('response-time')
const axios = require('axios')
const redis = require('redis')
const port = process.env.PORT || 3000
const app = express()

// Create and connect redis client to local instance
const client = redis.createClient()


// Create an api/search route 
app.get('/api/search', (request, response) => {
    const query = (request.query.query).trim()
    const searchURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`

    return client.get(`wikipedia:${query}`, (error, result) => {
        if (result) {
            returnFromRedis(result, response)
        } else {
            return axios.get(searchURL)
                .then(result => {
                    const responseJSON = result.data
                    saveToRedis(query, responseJSON)
                    returnToClient(response, responseJSON)
                })
                .catch(error => {
                    return response.json(error)
            })
        }
    })
})

function checkRedisStore () {
    return client.get(`wikipedia:${query}`, (error, result) => {
        if (result) {

        }
    })
}

function returnToClient (response, json) {
    return response.status(200).json({ source: 'Wikipedia API', ...json, })
}


function returnFromRedis (result, response) {
    const resultJSON = JSON.parse(result)
    return response.status(200).json(resultJSON)
}

function returnFromWikipedia (url) {
    return axios.get(searchURL)
    .then(result => {
        const responseJSON = result.data
        
    })
}

function saveToRedis (query, json) {
    client.setex(`wikipedia:${query}`, 3600, JSON.stringify({ source: 'Redis Cache', ...json}))
}

app.listen(port)