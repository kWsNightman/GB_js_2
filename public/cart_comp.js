Vue.component('cart', {
    props: ['basket', 'basketSee'],
    template: `
        <div class="basket" v-show="basketSee">
            <h1>Корзина</h1>
            <div class="basket-item" v-for="product of basket" :key="product.id_product">
                <div class="desc">
                    <h3> {{ product.product_name }} </h3>
                    <p> {{ product.price }} </p>
                    <button class="buy-btn" @click="delProduct (product)">Удалить</button>
                </div>
            </div>
        </div>`,

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },

        delProduct(product) {
            fetch(API + "/remFromCart", {
                method: "DELETE",
                headers: {'Content-Type': "application/JSON"},
                body: JSON.stringify({
                    id_product: product.id_product
                })
            });
        },
    }
});
