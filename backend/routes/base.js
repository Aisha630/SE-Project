const express = require('express')
const router = express.Router()

router.get('/', (_, res)=> {
    res.send('Helloww there, good sir');
});

module.exports = router 