const $cart = document.querySelector('#cart');
const $productsList = document.querySelector('#products-list');
const $popup = document.querySelector('#popup');

const $popupCart = document.querySelector('#popupCart');
const cartSteps = ['#purchases', '#delivery', '#comment']

const cart = [];
const products = [];

function ToCart(title, price, quantity = 1) {
    this.name = title;
    this.price = price;
    this.quantity = quantity;
}

function Product(title, price, images) {
    this.name = title;
    this.price = price;
    this.images = images;
}

function getPrice(arr) {
    return arr.reduce(function (acc, good) { return  acc + (good.price * good.quantity); }, 0);
}

function getQuantity(arr) {
    return arr.reduce(function (acc, good) {
        return  acc + good.quantity;
    }, 0);
}

function renderCart() {
    $cart.textContent = '';
    if(cart.length !== 0) {
        const html = `<img class="cart-full" src="img/shopping-cart-full.svg"><p class="price" style="line-height: 50px;">${getPrice(cart).toLocaleString()} &#8381;</p>`;
        $cart.insertAdjacentHTML('beforeend', html);
    } else {
        const html = `<img class="cart-empty" src="img/shopping-cart-empty.svg">`;
        $cart.insertAdjacentHTML('beforeend', html);
    }
}

function renderProducts() {
    products.forEach(function (product, i) {
        const imagesHtml = product.images.map(function(src, index) {
            return `<img data-id="${i}" data-img="${index}" src="${src}" class="photo-product" />`
        }).join('');
        const html = `
        <div class="product">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString()} &#8381;</p>
            <div class="product-photos">${imagesHtml}</div>
            <button data-id="${i}" class="buy">Купить</button>
        </div>`;
        $productsList.insertAdjacentHTML('beforeend', html);
    })
}

$productsList.addEventListener('click', function(e) {
    if( e.target.tagName === 'BUTTON' ) {
        const id = Number(e.target.getAttribute('data-id'));
        const product = products[id];

        const uId = cart.findIndex(function(item) {
            return product.name == item.name; 
        });
        if(uId < 0) {
            cart.push(new ToCart(product.name, product.price));
        } else {
            cart[uId].quantity++;
        }
        renderCart();
    }
    if( e.target.tagName === 'IMG' ) {
        const product_id = Number(e.target.getAttribute('data-id'));
        const img_id = Number(e.target.getAttribute('data-img'));
        $popup.textContent = '';
        $popup.style.display = 'flex';
        $popup.insertAdjacentHTML('beforeend', `
            <div id="img-prev"><img id="img-prev" width="50px" src="img/previous.svg"></div>
            <div id="product-img">
                <img class="zoom-img" data-id="${product_id}" data-img="${img_id}" src="${products[product_id].images[img_id]}">
                <div id="close"><img id="close" width="30px" src="img/close.svg"></div>
            </div>
            <div id="img-next"><img id="img-next" width="50px" src="img/next.svg"> </div>
            <div id="popup-back" onClick="ClosePopup();"></div>
        `);
    }
});

$popup.addEventListener('click', function(e) {
    if( e.target.id === 'img-next' ) {
        const product_id = Number($popup.querySelector('.zoom-img').getAttribute('data-id'));
        let img_id = Number($popup.querySelector('.zoom-img').getAttribute('data-img')) + 1;
        if(img_id == products[product_id].images.length) img_id = 0;
        $popup.querySelector('.zoom-img').setAttribute('data-img', img_id);
        $popup.querySelector('.zoom-img').src = products[product_id].images[img_id];
    }
    if( e.target.id === 'img-prev' ) {
        const product_id = Number($popup.querySelector('.zoom-img').getAttribute('data-id'));
        let img_id = Number($popup.querySelector('.zoom-img').getAttribute('data-img')) - 1;
        if(img_id == -1) img_id = products[product_id].images.length - 1;
        $popup.querySelector('.zoom-img').setAttribute('data-img', img_id);
        $popup.querySelector('.zoom-img').src = products[product_id].images[img_id];
    }
    if(e.target.id === 'close') ClosePopup();
});


document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') ClosePopup();
});

function ClosePopup() {
    $popup.style.display = 'none';
    $popupCart.style.display = 'none';
};

$cart.addEventListener('click', function(e) { renderPopupCart(); });

$popupCart.addEventListener('click', function(e) {
    if(e.target.id === 'close') ClosePopup();
    if(e.target.id === 'cartNext') {
        let step = e.target.getAttribute('data-step');
        $popupCart.querySelector(cartSteps[step]).style.display = 'none';
        if(++step >= cartSteps.length) step = 0;
        $popupCart.querySelector(cartSteps[step]).style.display = 'block';
        e.target.setAttribute('data-step', step);
    }
});

function renderPopupCart() {
    $popupCart.textContent = '';
    $popupCart.style.display = 'flex';
    let html='<div id="popupCartContent"><div id="purchases">';
    cart.forEach(function(cart, i){
        html += `
        <div>            
            <h4>${cart.name} / Количество ${cart.quantity} / Цена ${cart.price.toLocaleString()} &#8381;</h4>
            <!-- <button data-id="${i}" class="remove">-</button> -->
        </div>`;
    });
    html += `
    </div>
    <div id="delivery">
        <h4>Укажите детали доставки</h4>
        <form action="">
            <p><label for="name">Ваше имя </label><input type="text" name="name" placeholder="Ваше имя"></p>
            <p><label for="addreds">Улица, дом, квартира </label><input type="text" name="address" placeholder="Адрес"></p>
            <p><input type="submit" value="Отправить"> <input type="reset" value="Отмена"></p>
        </form>
    </div>`;
    html += `
    <div id="comment">
        <h4>Добавте комментарий</h4>
        <form action="">
            <textarea placeholder=""></textarea>
            <p><input type="submit" value="Отправить"> <input type="reset" value="Отмена"></p>
        </form>
    </div>
    <button id="cartNext" data-step="0" class="buy">Далее</button>`;
    html += '<div id="close"><img id="close" width="30px" src="img/close.svg"></div></div><div id="popup-back" onClick="ClosePopup();"></div>';

    $popupCart.insertAdjacentHTML('beforeend', html);
    $popupCart.querySelector(cartSteps[0]).style.display = 'block';

}

products.push(new Product('6.44" Смартфон Vivo V20 128 ГБ синий', 29999, ['./img/vivoV20-1.jpg','./img/vivoV20-2.jpg']));
products.push(new Product('6.56" Смартфон Vivo X50 128 ГБ черный', 49999, ['./img/vivox50-1.jpg','./img/vivox50-2.jpg']));
products.push(new Product('6.58" Смартфон Vivo Y31 128 ГБ голубой', 16999, ['./img/vivoy31-1.jpg','./img/vivoy31-2.jpg']));

renderCart();
renderProducts();