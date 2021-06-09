import express from "express";
import controller from './../db/controller';
import multer from 'multer';
var upload = multer({ dest: 'uploads/' });
var router = express.Router();


//user ROUTER
router.get("/products/getAllProducts", function (req, res) {
    controller.getAllProducts(req, res);
});

router.get("/products/getProductsById/:id", function (req, res) {
    controller.getAllProductsById(req, res);
});

router.post('/products/createProduct', upload.single('file'), function (req, res, next) {
    controller.createProduct(req, res);
});

router.post('/products/updateProduct', upload.single('file'), function (req, res, next) {
    controller.updateProduct(req, res);
});

router.delete("/products/deleteProduct/:id", function (req, res) {
    controller.deleteProduct(req, res);
});

module.exports = router;