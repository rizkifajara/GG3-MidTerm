const express = require('express')

const router = express.Router()

const productController = require('../controllers/productController')

router.get("/products/:_id", productController.readAllProduct)

router.get("/products/get/:_id", productController.readOneProduct)

router.post("/products/:_id", productController.addProduct)

router.put("/products/:product_id", productController.updateProduct)

router.delete("/products/:id_videos/:id_product", productController.deleteProduct)

module.exports = router