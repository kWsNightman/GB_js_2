const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item card" style="width: 18rem;"><h3  class="card-title">${title}</h3><p class="card-text">${price}</p></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}

// renderGoodsList();