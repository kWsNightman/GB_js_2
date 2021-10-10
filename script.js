const URL_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'


function makeGETRequest(url, metod = 'GET', data = null, headers = [], timeout = 60000) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.open(method, url, true);

        headers.forEach((header) => {
            xhr.setRequestHeader(header.key, header.value);
        })

        xhr.timeout = timeout;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 400) {
                    reject(xhr.statusText)
                } else {
                    resolve(xhr.responseText)
                }
            }
        }

        xhr.send(data);
    })
}

class GoodsItem {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p>
                <a href="#" onclick = basket.addBasketItem(${this.id}) class="buy">Добавить</a></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(url) {
        fetch(URL_API + url)
            .then((response) => {
                return response.json()
            }).then((request) => {
            this.goods = request;
        }).then(() => {
            this.render()
        })
    }


    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good);
            listHtml += goodItem.render();

        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

}

class GoodsBasket extends GoodsItem {
    constructor(product) {
        super(product);
    }

    render() {
        return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p>
                <a href="#" onclick = basket.deleteBasketItem(${this.id}) class="buy">Добавить</a></div>`;
    }
}


class Basket extends GoodsList {
    constructor() {
        super();
    }

    costAllGoods() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        });
        return sum
    }

    fetchGoods() {
        fetch(URL_API + 'getBasket.json')
            .then((response) => {
                return response.json()
            }).then((request) => {
            this.goods = request.contents;
        }).then(() =>{
            this.render()
        })
    }


    addBasketItem(id) {
        console.log('Добавлено ' + id)
    }

    deleteBasketItem(id) {
        console.log('Удалено ' + id)
    }

    render() {
        let doc = document.querySelector('.basket')
        if (doc.childNodes.length > 0){
            doc.textContent = ''
        }else {
            let listHtml = '<p4>В корзине<\p4>';
            this.goods.forEach(good => {
                const goodItem = new GoodsBasket(good);
                listHtml += goodItem.render();

            });
            listHtml += `<div class="basket-item_coast"><p>Итоговая цена товаров = ${this.costAllGoods()}</p</div>`
            document.querySelector('.basket').innerHTML = listHtml;
        }

    }

}


const basket = new Basket();
const list = new GoodsList();
list.fetchGoods('catalogData.json ');
