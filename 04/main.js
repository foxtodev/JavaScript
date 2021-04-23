'use strict'

// 1 /////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n01 -------------------------------------------------");

function numToObj(n) {
    let o = {}, c =(n += "").length;
    if(c > 3) return "The number is too large. Must be less than or equal to 999.";
    for(let i = c; i >= 0 ; i--) {
        switch (c - i - 1) {
            case 0: o["единицы"] = Number(n[i]); break;
            case 1: o["десятки"] = Number(n[i]); break;
            case 2: o["сотни"] = Number(n[i]); break;
            default: break;
        }
    }
    return o;
}

console.log(numToObj(358));

// // 2 /////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n02 -------------------------------------------------");

let catalog = [
    { id: 1,    name: "Product 1",  description: "Good product",                price: 300 },
    { id: 2,    name: "Product 2",  description: "Just product",                price: 180 },
    { id: 3,    name: "Product 3",  description: "Best product",                price: 551 },
    { id: 4,    name: "Product 4",  description: "Best of the best product",    price: 999 },
    { id: 456,  name: "Product 5",  description: "Big product",                 price: 600 },
];

let basket = [];

function addToBasket(productId, quantity) {
    catalog.forEach((product, index) => {
        if(productId == product.id) basket.push({ id: product.id, name: product.name, price: product.price, quantity: quantity});
    });
}

function totalPriceBasket() {
    return basket.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
}

addToBasket(4, 1);
addToBasket(2, 5);
addToBasket(456, 3);

console.log(basket);
console.log(totalPriceBasket());




// // 3 /////////////////////////////////////////////////////////////////////////////////////////////////////
 console.log("\n03 -------------------------------------------------");

 class Product {
    constructor(id, name, description, price){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    addToBasket(quantity) {
        productsBasket.push(new Basket(this.id, this.price, quantity));
    }
 }

class Basket {
    constructor(id, price, quantity) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
    }

    totalPrice() {
        return basket.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
    }
}

let productsBasket = [];

Array.prototype.totalPrice = function() {
    return basket.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0);
};

let productsCatalog = [
    new Product(1, "Product 1", "Good product", 300),
    new Product(2, "Product 2", "Just product", 180),
    new Product(3, "Product 3", "Best product", 551),
    new Product(4, "Product 4", "Best of the best product", 999),
    new Product(456, "Product 5", "Big product", 600)
];

productsCatalog[1].addToBasket(5)
productsCatalog[3].addToBasket(1)
productsCatalog[4].addToBasket(3)

console.log(productsBasket);
console.log(productsBasket.totalPrice());

