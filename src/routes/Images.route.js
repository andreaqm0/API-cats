const router = require('express').Router()
const axios = require('axios').default

router.route('/breed/:id')
    .get(async (req,res,next) => {
        const {id} = req.params
        const {limit=100} = req.query
        try {
            const response = await axios({
                method: 'get',
                url: `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${id}&api_key=live_aMKjfbThaKvcUkXTY2UKUalQQIddxcV0UKhwYPdY2uLeVzOrnhDwOyLHrMmzu6Ld`,
            })
            const images = response.data
            
            res.status(200).send(images)
        }
        catch(error) {
            res.status(500).send({code : error.code, errorName : error.name, msg : error.message})
        }
    });

module.exports = router