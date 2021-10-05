class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    costAllGoods(){
        let sum = 0;
        this.goods.forEach (good => {
            sum += good.price
        });
        return sum
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        listHtml += `<div class="goods-item_coast"><p>Итоговая цена товаров = ${this.costAllGoods()}</p</div>`
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

}

class Basket extends GoodsList {

    addBasketItem() {null}
    deleteBasketItem(){null}

}

class  GoodsBasket extends GoodsItem {
    constructor() {
        super();
    }
}

const list = new GoodsList();
list.fetchGoods();
