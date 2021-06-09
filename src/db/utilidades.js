export const utilidades = {
    settingsProducts,
}

function settingsProducts(products) {
    var data = [];
    try {

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            let image = null;
            if (product.image) {
                image = 'data:image/png;base64,' + Buffer.from(product.image, 'binary').toString('base64');
            }

            let dato = {
                'id': product.id,
                'name': product.name,
                'category': product.category,
                'detail': product.detail,
                'price': product.price,
                'isPromotion': product.isPromotion,
                'sale': product.sale,
                'image': image,
            };
            data.push(dato);
        }


    } catch (error) {
        console.log(error);
    }

    return data;
}