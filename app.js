const express = require('express');
const app = express();
const port = 5000;
const goodsRouter = require('./routes/good.js')
const cartsRouter = require('./routes/carts.js')
const connect = require('./schemas/index.js');
connect();

app.use(express.json());

app.post("/",(req,res) => {
  console.log(req.body);
  res.send("기본 URL 정상실행")
})

app.get("/",(req,res)=>{
  console.log(req.query)

  
  res.status(400).json({
    "keykey" : "OBJ",
    "이름입니다" : "이름일까요",
  });
})

app.get("/:id",(req,res)=>{
  console.log(req.params)
  res.send("정상반환")
})
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use(express.json());
app.use("/api",[goodsRouter,cartsRouter]);


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});