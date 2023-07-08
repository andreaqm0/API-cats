const router = require('express').Router()
const axios = require('axios').default
const {saveSearch, getStats} = require('../services/stats')

router.route('/')
    .get(async (req,res,next) => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.thecatapi.com/v1/breeds',
                head: {
                    'x-api-key': 'live_aMKjfbThaKvcUkXTY2UKUalQQIddxcV0UKhwYPdY2uLeVzOrnhDwOyLHrMmzu6Ld'
                }
            })
            const breeds = response.data
            
            res.status(200).send(breeds)
        }
        catch(error) {
            res.status(500).send({code : error.code, errorName : error.name, msg : error.message})
        }
    });

router.route('/search')
    .get(async (req,res,next) => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.thecatapi.com/v1/breeds',
                head: {
                    'x-api-key': 'live_aMKjfbThaKvcUkXTY2UKUalQQIddxcV0UKhwYPdY2uLeVzOrnhDwOyLHrMmzu6Ld'
                }
            })
            const breeds = response.data
            const names = breeds.map(breed => ({ 'id' : breed.id, 'name' : breed.name }))
            res.status(200).send(names)
        }        
        catch(error) {
            res.status(500).send({code : error.code, errorName : error.name, msg : error.message})
        }        
    });

router.route('/:id')
    .get(async (req,res, next) => {
        const {id} = req.params

        try {
            const response = await axios({
                method: 'get',
                url: `https://api.thecatapi.com/v1/breeds/${id}`,
                head: {
                    'x-api-key': 'live_aMKjfbThaKvcUkXTY2UKUalQQIddxcV0UKhwYPdY2uLeVzOrnhDwOyLHrMmzu6Ld'
                }
            })
            const breed = response.data
            if (Object.keys(breed).length === 0) return res.status(404).send({code : 'NOT_FOUND', msg : 'Breed Not Found'})

            const response2 = await axios({
                method: 'get',
                url: `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=25`,
                head: {
                    'x-api-key': 'live_aMKjfbThaKvcUkXTY2UKUalQQIddxcV0UKhwYPdY2uLeVzOrnhDwOyLHrMmzu6Ld'
                }
            })
            const photos = response2.data
            saveSearch({id, name: breed.name, description: breed.description})
            res.status(200).send({breed, photos})
        }        
        catch(error) {
            res.status(500).send({code : error.code, errorName : error.name, msg : error.message})
        }
    })

router.route('/search/popular')
    .get(async (req, res, next) => {
        const stats = getStats()
        const sortedStats = stats.sort((a,b) => b.searchCount - a.searchCount)

        const popular = sortedStats.slice(0,10)
            
        res.status(200).send(popular)
    })

module.exports = router