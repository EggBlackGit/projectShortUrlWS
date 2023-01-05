const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://mongodb:0OWmJv2rsNPrEMdH@cluster0.6x4ncuy.mongodb.net/?retryWrites=true&w=majority'
,{
    useNewUrlParser:true,useUnifiedTopology:true
})

app.get('/echo',(req,res)=>{
    res.json({
        'message':'hello'
    })
})

app.post("/shortUrl",(req, res) =>{
    const urlFull = req.body.urlFull;
    res.json({
        'urlFull':urlFull
    })
})


app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is running on port : ${PORT}`);
})
module.exports = app;