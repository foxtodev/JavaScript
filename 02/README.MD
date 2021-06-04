## Практикум. Угадай число

### index.html game_nums.js

## Практическое задание

### main.js

#### 1. Почему код дает именно такие результаты?

```javascript
var a = 1, b = 1, c, d;
c = ++a; console.log(c);           // 2 // Инкрементирует a и присваивает c -> после выполнения     a = 2 
d = b++; console.log(d);           // 1 // Присваивает b переменной d и инкремиентирует b ->        b = 2
c = (2+ ++a); console.log(c);      // 5 // К 2 прибавляем проинкрементируемую переменную а ->       a = 3
d = (2+ b++); console.log(d);      // 4 // К 2 прибавляем b и затем инкрементируем b ->             b = 3
console.log(a);                    // 3 // из-за инкрементирования в операторах присваивания выше   /\
console.log(b);                    // 3 // из-за инкрементирования в операторах присваивания выше   /\
```

#### 2. Чему будет равен x? 

```javascript
var a = 2;
var x = 1 + (a *= 2);               // x = 5 -> Сначала a умножаем на 2 затем прибавляем 1
console.log("x = " + x);
```

#### 3. Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
- если a и b положительные, вывести их разность;
- oесли а и b отрицательные, вывести их произведение;
- oесли а и b разных знаков, вывести их сумму;
Ноль можно считать положительным числом.

```javascript
var a = 2, b = 3;
if (a >= 0 && b >= 0) console.log("a - b = " + (a - b));
if (a < 0 && b < 0) console.log("a * b = " + (a * b));
if (Math.sign(a) + Math.sign(b) == 0) console.log("a + b = " + (a + b));
```

#### 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

```javascript
var a = 6;
switch (true) {
    case a <= 1: process.stdout.write("1, ");
    case a <= 2: process.stdout.write("2, ");
    case a <= 3: process.stdout.write("3, ");
    case a <= 4: process.stdout.write("4, ");
    case a <= 5: process.stdout.write("5, ");
    case a <= 6: process.stdout.write("6, ");
    case a <= 7: process.stdout.write("7, ");
    case a <= 8: process.stdout.write("8, ");
    case a <= 9: process.stdout.write("9, ");
    case a <= 10: process.stdout.write("10, ");
    case a <= 11: process.stdout.write("11, ");
    case a <= 12: process.stdout.write("12, ");
    case a <= 13: process.stdout.write("13, ");
    case a <= 14: process.stdout.write("14, ");
    case a <= 15: process.stdout.write("15\n"); break;
    default: break;
}
```

#### 5.Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

```javascript
var a = 12, b = 23;

function addition(a, b)         { return a + b; }
function subtraction(a, b)      { return a - b; }
function multiplication(a, b)   { return a * b; }
function division(a, b)         { return a / b; }

console.log("add => " + addition(a, b));
console.log("sub => " + subtraction(a, b));
console.log("mul => " + multiplication(a, b));
console.log("div => " + division(a, b).toFixed(3));
```

#### 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).

```javascript
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "add": 
            return addition(arg1, arg2); 
            break;
        case "sub": 
            return subtraction(arg1, arg2); 
            break;
        case "mul": 
            return multiplication(arg1, arg2); 
            break;
        case "div": 
            return division(arg1, arg2); 
            break;
        default: break;
    }   
}

console.log("add => " + mathOperation(a, b, "add"));
console.log("sub => " + mathOperation(a, b, "sub"));
console.log("mul => " + mathOperation(a, b, "mul"));
console.log("div => " + mathOperation(a, b, "div").toFixed(3));
```
#### 7. Сравнить null и 0. Объяснить результат.

```javascript
console.log( "0 == null\t" + (0 == null));  //false
// 0    - значение
// null - не является значением
//        Это «заполнитель» для значения данных, которое неизвестно или не указано
console.log( "0 > null\t" + (0 > null));    //false
console.log( "0 < null\t" + (0 < null));    //false
console.log( "0 >= null\t" + (0 >= null) + "\t:)))))"); // true :)))))
```

#### 8. С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.
```javascript
function power(val, pow) { 
    if(pow) return val * power(val, --pow);
    return 1;
}
console.log(power(3, 3)); //27
```

