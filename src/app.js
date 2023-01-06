const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ShortUrl = require('../models/shortUrl');
const shortId = require('shortid');

var cors = require('cors')
const PORT = process.env.PORT || 3001
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://mongodb:0OWmJv2rsNPrEMdH@cluster0.6x4ncuy.mongodb.net/?retryWrites=true&w=majority'
    , {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(function(){
        console.log("connect mongoDB successfully");
    }).catch(function(){
        console.log("connect mongoDB Fail");
    })

app.get('/echo', (req, res) => {
    res.json({
        'message': 'hello'
    })
})

app.post("/shortUrl", async (req, res) => {
    const urlFull = req.body.urlFull;
    console.log(urlFull);
    var searchFullUrl = await ShortUrl.findOne({
        fullUrl: urlFull,
        shortUrl: urlFull
    })

    if (searchFullUrl == null) {
        var shortGenerate = shortId.generate();
        var shortUrl = req.protocol + "://" + req.headers.host + '/' + shortGenerate;
        const rs = await ShortUrl.create({ fullUrl: urlFull, shortUrl: shortUrl, shortId: shortGenerate })
        console.log(rs);
        if (rs != null) {
            searchFullUrl = await ShortUrl.findOne({
                fullUrl: urlFull
            })
        }else{
            return res.sendStatus(404)
        }
    }
    res.send(searchFullUrl);



})

app.get('/:shortUrl', async (req, res) => {
    console.log(req.params.shortUrl);
    const shortUrl = await ShortUrl.findOne({
        shortId: req.params.shortUrl
    })

    if (shortUrl == null) {
        return res.sendStatus(404)
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.fullUrl);
})

app.get('/updateCount/:shortUrl', async (req, res) => {
    console.log(req.params.shortUrl);
    const shortUrl = await ShortUrl.findOne({
        shortId: req.params.shortUrl
    })

    if (shortUrl == null) {
        return res.sendStatus(404)
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.send(shortUrl)
})


app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is running on port : ${PORT}`);
})
module.exports = app;
