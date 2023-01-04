const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
// const router = express.Router();

app.get('/echo',(req,res)=>{
    res.json({
        'message':'hello'
    })
})


app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is running on port : ${PORT}`);
})
module.exports = app;