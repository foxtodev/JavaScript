## Практикум. Быки и коровы

### index.html game_nums.js

## Практическое задание

### main.js

#### 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

```javascript
var n = 0;

function is_prime(n) {
    if(n == 0 || n == 1) return false;
    for(i = 2; i < n; i++) if(!(n % i)) return false;
    return true;
}

while(n != 100) {
    if(is_prime(n)) process.stdout.write(n + " ");
    n++;
} // 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
```

#### 2 & 3. Функционал интернет-магазина. Предположим, есть сущность корзины. 
#### Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. 
#### Товары в корзине хранятся в массиве. Задачи:
####    a. Организовать такой массив для хранения товаров в корзине;
####    b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

```javascript
var catalog = [[1, "Product 1", 100], [2, "Product 2", 200], [3, "Product 3", 300], [4, "Product 4", 400]]; // [id, name, price]
var basket = [[2, 3], [1, 10], [4, 2], [3, 5]]; // [id, count]

function findProductIndex(id) {
    for(product in catalog)
        if(catalog[product][0] == id) return product;
    return null;
}

function countBasketPrice() {
    var total_price = 0;
    for(item in basket)
        if(findProductIndex(basket[item][0]) != null) 
            total_price += basket[item][1] * catalog[findProductIndex(basket[item][0])][2];
    return total_price;
}

console.log("id\tname\t\tcount\tprice\ttotal"); 
for(item in basket) {
    var temp = catalog[findProductIndex(basket[item][0])];
    if(temp != null)
        console.log(temp[0] + "\t" + temp[1] + "\t" + basket[item][1] + "\t" + temp[2] + "\t" + basket[item][1] * temp[2]);
}
console.log("=============================================");
console.log("\t\t\t\t\t" + countBasketPrice())

// id      name            count   price   total
// 2       Product 2       3       200     600
// 1       Product 1       10      100     1000
// 4       Product 4       2       400     800
// 3       Product 3       5       300     1500
// =============================================
//                                         3900
```

#### 4. Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.

```javascript
for(i = 0; i < 10; console.log(i++));
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
```

### 5. Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов ...

```javascript
for(i = 0; i < 20; console.log("*".repeat(++i)));
```