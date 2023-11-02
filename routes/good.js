const express = require('express');
const router = express.Router();

const goods =   [
    {
        goodsId : 4,
        name : "상품 4",
        category : "drink",
        price : 0.1,
    },
    {
        goodsId : 3,
        name : "상품 3",
        category : "food",
        price : 0.2,
    },
    {
        goodsId : 2,
        name : "상품 2",
        category : "drink",
        price : 2.1,
    },
    {
        goodsId : 1,
        name : "상품 1",
        category : "drink",
        price : 4.1,
    },
];

router.get("/goods",(req,res)=>{
    res.status(200).json({"goods":goods})
})

router.get("/goods/:goodsId", (req,res)=>{
    const {goodsId} = req.params;

   
    const [result] = goods.filter((good) => Number(goodsId)=== good.goodsId)

    res.status(200).json({detail : result})
})

const Cart = require("../schemas/cart.js")

router.post("/goods/:goodsId/cart", async (req,res) =>{
    const {goodsId} = req.params;
    const {quantity} = req.body;
    
    const existsCarts = await Cart.find({goodsId});
    if (existsCarts.length){
        return res.status(400).json({
        success : false,
        errorMessage : "이미 장바구니에 상품이 존재합니다"})
    }

    await Cart.create({goodsId, quantity});
    res.json({result : "success"});
})

router.put("/goods/:goodsId/cart",async (req,res)=>{
    const {goodsId} = req.params;
    const {quantity} = req.body;
    const existsCarts = await Cart.find({goodsId});
    if(existsCarts.length){
        await Cart.updateOne(
            {goodsId : goodsId},
            {$set: {quantity : quantity}})
    }
    res.status(200).json({success : true})
})
router.delete("/goods/:goodsId/cart", async (req,res)=>{
    const {goodsId} = req.params;
    const existsCarts = await Cart.find({goodsId});
    if(existsCarts.length){
        await Cart.deleteOne({goodsId})
    }

    res.json({result : "success"});
})

const Goods = require("../schemas/goods.js");
router.post("/goods/",async (req,res)=>{
    const {goodsId, name , thumbnailUrl ,category , price } = req.body;

    const goods = await Goods.find({goodsId})
    if(goods.length){
        return res.status(400).json({success : false,
        errorMessage : "이미 존재하는 ID입니다"})
    }
    const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});
    res.json({goods: createdGoods});

})

module.exports = router;

