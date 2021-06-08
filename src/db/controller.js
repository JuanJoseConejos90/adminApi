import db from './db'
import fs from 'fs'

function getAllProducts(req, res) {
    try {
        db.getConnection(error => {
            if (error) throw error;
            let sql = `CALL sp_getProduct()`;
            db.query(sql, function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, error: err });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    products: results[0]
                });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ code: 1, response: false, error: err });
    }
}

function getAllProductsById(req, res) {
    try {
        db.getConnection(error => {
            if (error) throw error;
            let id = req.params.id;
            let sql = `CALL sp_getProductById(${id})`;
            db.query(sql, function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, error: err });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    product: results[0]
                });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ code: 1, response: false, error: err });
    }
}

function createProduct(req, res) {
    try {
        var data = {
            productName: req.body.productName,
            category: req.body.category,
            detail: req.body.detail,
            price: req.body.price,
            isPromotion: req.body.isPromotion,
            sale: req.body.sale,
            image: fs.readFileSync(req.file.path)
        };


        db.getConnection(error => {
            if (error) throw error;
            let sql = ("CALL sp_createProduct(?,?,?,?,?,?,?)", [data.productName, data.category, data.detail, data.price, data.isPromotion, data.sale, data.image]);
            db.query(sql, function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, error: err });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    product: results
                });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ code: 1, response: false, error: err });
    }
}

function updateProduct(req, res) {
    try {

        var data = {
            id: req.body.id,
            productName: req.body.productName,
            category: req.body.category,
            detail: req.body.detail,
            price: req.body.price,
            isPromotion: req.body.isPromotion,
            sale: req.body.sale,
            image: fs.readFileSync(req.file.path)
        };


        db.getConnection(error => {
            if (error) throw error;
            let sql = ("CALL sp_updateProduct(?,?,?,?,?,?,?,?)", [data.id, data.productName, data.category, data.detail, data.price, data.isPromotion, data.sale, data.image]);
            db.query(sql, function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, error: err });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    product: results
                });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ code: 1, response: false, error: err });
    }
}

module.exports = {
    getAllProducts,
    getAllProductsById,
    createProduct,
    updateProduct
};
