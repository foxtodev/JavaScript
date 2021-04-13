// 1 /////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n01 -------------------------------------------------");
var n = 0;
function is_prime(n) {
    if(n == 0 || n == 1) return false;
    for(i = 2; i < n; i++) if(!(n % i)) return false;
    return true;
}
while(n != 100) {
    if(is_prime(n)) process.stdout.write(n + " ");
    n++;
}
process.stdout.write("\n");

// 2 & 3 /////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n02 -------------------------------------------------");
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

// 4 /////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n04 -------------------------------------------------");
for(i = 0; i < 10; console.log(i++));

// 5 /////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("\n05 -------------------------------------------------");
for(i = 0; i < 20; console.log("*".repeat(++i)));