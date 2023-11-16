const express = require('express')
const app = express()

const mongoose = require ('mongoose')
const debug = require ('debug')("app:main")
const config = require('config');

const router = require('./src/routes/main')

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(express.static('public'))


//debug(process.env);


mongoose
    .connect(config.get('db.address'))
    .then(() => debug('connected to mongodb'))
    .catch(() => debug('could not connect'))

app.use('/api',router)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port} ...`))