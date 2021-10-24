const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const static_dir = '../public';
const port = 3000;
const app = express();

app.use(express.static(static_dir));
app.use(bodyParser.json());

app.get('/catalog', (req, res) => {
    fs.readFile('data/catalog.json', "utf-8", (err, data) => {
        res.send(data);
    });
});

app.get('/getBasket', (req, res) =>{
    fs.readFile('data/cart.json', "utf-8", (err, data) =>{
        res.send(data)
    })
})

app.delete('/remFromCart', (req, res) =>{
    fs.readFile('data/cart.json', "utf-8", (err, data) =>{
        let cart = JSON.parse(data);
        const item = req.body;

        for (let i = cart.length; i--; ) {
            if (cart[i].id_product === item.id_product) {
                cart.splice(i, 1);
                break
            }
        }


        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) =>{
            console.log('delete');
            res.end();
        });
    });
})

app.post('/addToCart', (req, res) =>{
    fs.readFile('data/cart.json', "utf-8", (err, data) =>{
        const cart = JSON.parse(data);
        const item = req.body;
        cart.push(item);

        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) =>{
            console.log('done');
            res.end();
        });
    });
});

app.listen(port, function () {
    console.log(`server is running on port ${port}`);
});
