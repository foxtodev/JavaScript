const $basket = document.querySelector('#basket');
const $productsList = document.querySelector('#products-list');
const $popup = document.querySelector('#popup');

const basket = [];
const products = [];

function ToBasket(title, price, quantity = 1) {
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

function renderBasket() {
    $basket.textContent = '';
    const p = document.createElement('p');
    if(basket.length !== 0) {
        p.textContent = `в корзине ${getQuantity(basket)} товаров, на сумму  ${getPrice(basket)} рублей`;
    } else {
        p.textContent = 'корзина пуста'
    }
     $basket.appendChild(p);
}

function renderProducts() {
    products.forEach(function (product, i) {
        const imagesHtml = product.images.map(function(src, index) {
            return `<img data-id="${i}" data-img="${index}" src="${src}" class="photo-product" />`
        }).join('');

        console.log(imagesHtml);
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

        const uId = basket.findIndex(function(item) {
            return product.name == item.name; 
        });

        if(uId < 0) {
            basket.push(new ToBasket(product.name, product.price));
        } else {
            basket[uId].quantity++;
        }
        renderBasket();
    }
});

$productsList.addEventListener('click', function(e) {
    if( e.target.tagName === 'IMG' ) {
        const product_id = Number(e.target.getAttribute('data-id'));
        const img_id = Number(e.target.getAttribute('data-img'));
        $popup.textContent = '';
        $popup.style.display = 'block';
        $popup.insertAdjacentHTML('beforeend', `
            <div class="gallery">
                <div id="img-prev" onClick="ImgPrev();"><</div>
                <div id="product-img"><img src="${products[product_id].images[img_id]}"></div>
                <div id="img-next" onClick="ImgNext();">></div>
            </div>
            <div id="popup-back" onClick="ClosePopup();"></div>
        `);
    }
});

document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') ClosePopup();
});

function ClosePopup() {
    $popup.style.display = 'none';
};

products.push(new Product('6.44" Смартфон Vivo V20 128 ГБ синий', 29999, ['./img/vivoV20-1.jpg','./img/vivoV20-2.jpg']));
products.push(new Product('6.56" Смартфон Vivo X50 128 ГБ черный', 49999, ['./img/vivox50-1.jpg','./img/vivox50-2.jpg']));
products.push(new Product('6.58" Смартфон Vivo Y31 128 ГБ голубой', 16999, ['./img/vivoy31-1.jpg','./img/vivoy31-2.jpg']));

renderBasket();
renderProducts();