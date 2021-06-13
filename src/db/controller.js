import db from './db'
import fs from 'fs'
import { utilidades as util } from './utilidades'

function getAllProducts(req, res) {
    try {
        db.getConnection(error => {
            if (error) throw error;
            let sql = `CALL sp_getProduct()`;
            db.query(sql, function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, msg: error });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    products: util.settingsProducts(results[0])
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
                    res.status(500).json({ code: 1, response: false, msg: error });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    products: util.settingsProducts(results[0])
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

        var image = null;
        if (req.file) {
            image = { content: fs.readFileSync(req.file.path) };
        }

        var data = {
            productName: req.body.productName,
            category: req.body.category,
            detail: req.body.detail,
            price: req.body.price,
            isPromotion: 0,
            sale: req.body.sale,
        };

        db.getConnection(error => {
            if (error) throw error;
            db.query("CALL sp_createProduct(?,?,?,?,?,?,?)", [data.productName, data.category, data.detail, data.price, data.isPromotion, data.sale, image ? image.content : image], function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, msg: error });
                }
                return res.status(200).json({
                    code: 0,
                    response: true,
                    result: results
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

        var image = null;
        if (req.file) {
            image = { content: fs.readFileSync(req.file.path) };
        }

        var data = {
            id: req.body.id,
            productName: req.body.productName,
            category: req.body.category,
            detail: req.body.detail,
            price: req.body.price,
            isPromotion: 0,
            sale: req.body.sale
        };


        db.getConnection(error => {
            if (error) throw error;
            db.query("CALL sp_updateProduct(?,?,?,?,?,?,?,?)", [data.id, data.productName, data.category, data.detail, data.price, data.isPromotion, data.sale, image ? image.content : image], function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, msg: error });
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

function deleteProduct(req, res) {
    try {
        db.getConnection(error => {
            if (error) throw error;
            let id = req.params.id;
            let sql = `CALL sp_deleteProducts(${id})`;
            db.query(sql, function (error, results) {
                if (error) {
                    res.status(500).json({ code: 1, response: false, msg: error });
                } return res.status(200).json({
                    code: 0,
                    response: true,
                    result: results
                });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ code: 1, response: false, msg: err });
    }
}

module.exports = {
    getAllProducts,
    getAllProductsById,
    createProduct,
    updateProduct,
    deleteProduct
};
