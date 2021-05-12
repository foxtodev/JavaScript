## Игра Крестики-нолики

### tictactoe/index.html

```javascript

'use strict'

const $info = document.querySelector('#info');
const $gameField = document.querySelector('#game-field');
const tictactoe = ['zero.svg', 'cross.svg'];
const winCombination = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]];
var playerNow;


function renderGame() {
    playerNow = 1;
    $info.textContent = `Player ${playerNow} turn`;
    $gameField.textContent = '';
    for(let i = 1; i <= 9; $gameField.insertAdjacentHTML('beforeend', `<div class="cell" id="cell${i++}"></div>`));
}

$gameField.addEventListener('click', function(e) {
    if( e.target.id.indexOf('cell') != -1 ) {
        if(e.target.innerHTML.indexOf('img') == -1) {
            const image = document.createElement('img');
            image.src = tictactoe[playerNow - 1];
            image.width = 100;
            e.target.appendChild(image);
            e.target.setAttribute('data-cell', playerNow)
            if(checkWin()) {
                $info.textContent = `PLAYER ${playerNow} WIN!`;
                //renderGame();
                return;
            }
            if(playerNow++ > 1) playerNow = 1;
            $info.textContent = `Player ${playerNow} turn`;
        }
    }
});

function checkWin() {
    const $cells = $gameField.querySelectorAll('.cell');
    let winStatus = 0, cell = [];
    $cells.forEach(function(item) { cell.push(Number(item.getAttribute('data-cell'))); });
    winCombination.forEach(function(comb, i) {
        if(cell[comb[0]-1] == playerNow && cell[comb[1]-1] == playerNow && cell[comb[2]-1] == playerNow) {
            winStatus = 1;
            comb.forEach(function(e) { $cells[e-1].className = 'win' });
        }
    });
    return winStatus ? true : false;
} 

renderGame();

```

## Реализовать модуль корзины. Создать блок товаров и блок корзины. Добавить функцию перехода к следующему изображению.

### index.html

```javascript

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
    const h = document.createElement('h4');
    if(basket.length !== 0) {
        basket.forEach(function(basket, i){
        const html = `
        <div>            
            <h4>${basket.name} / Количество ${basket.quantity} / Цена ${basket.price.toLocaleString()} &#8381;</h4>
            <!-- <button data-id="${i}" class="remove">-</button> -->
        </div>`;
        $basket.insertAdjacentHTML('beforeend', html);
        });
        h.textContent = `в корзине ${getQuantity(basket)} товаров, на сумму  ${getPrice(basket)} рублей`;
    } else {
        h.textContent = 'корзина пуста'
    }
     $basket.appendChild(h);
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
        $popup.style.display = 'flex';
        $popup.insertAdjacentHTML('beforeend', `
            <div id="img-prev"><img id="img-prev" width="50px" src="img/previous.svg"></div>
            <div id="product-img"><img class="zoom-img" data-id="${product_id}" data-img="${img_id}" src="${products[product_id].images[img_id]}"></div>
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

```