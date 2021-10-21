Vue.component('cart', {
    props: ['basket', 'basketSee'],
    template: `
        <div class="basket" v-show="basketSee">
            <p>Корзина</p>
            <div class="basket-item" v-for="product of basket" :key="product.id_product">
                <div class="desc">
                    <h3> {{ product.product_name }} </h3>
                    <p> {{ product.price }} </p>
                </div>
            </div>
        </div>`
});
