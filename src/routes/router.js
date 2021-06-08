import express from "express";
import controller from './../db/controller';
var router = express.Router();


//user ROUTER
router.get("/products/getAllProducts", function (req, res) {
    controller.getAllProducts(req, res);
});

router.get("/products/getProductsById/:id", function (req, res) {
    controller.getAllProductsById(req, res);
});

router.post('/products/createProduct', function (req, res, next) {
    controller.createProduct(req, res);
});

router.post('/products/updateProduct', function (req, res, next) {
    controller.updateProduct(req, res);
});

module.exports = router;