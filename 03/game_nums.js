window.onload = function() {
    var end_game = false;
    var rnd_num, n, count;

    function generate_number(count) {
        var n = [], rnd_n;
        for(i = 0; i < count; i++) {
            rnd_n = Math.floor(Math.random() * 10);
            if( n.indexOf(rnd_n) < 0) n.push(rnd_n); else i--;
        }
        return n.join("");
    }
    console.log(generate_number(4));

    //for(i = 0; i < 10; i++) console.log(generate_number(4));

    // while (!end_game) {
    //     rnd_num = Math.floor(Math.random() * 8999 + 1000);
    //     count = 0;
    //     console.log(rnd_num);
    //     n = prompt("Четырехзначное число загаданно! Ваш ход:");
        
    //     while (!end_game) {
    //         count++;
    //         switch (true) {
    //             case n === null:
    //                 alert("Игра прекращена.");
    //                 end_game = true;
    //                 break;
    //             case n == rnd_num:
    //                 alert("Молодцом! Вы угадали! Этот число " + rnd_num + ". Количество ходов " + count + ".");
    //                 end_game = true;
    //                 break;
    //             case rnd_num < n:
    //                 n = prompt("Загаданное число меньше " + n + "! Ваш ход:");
    //                 break;
    //             case rnd_num > n: 
    //                 n = prompt("Загаданное число больше " + n + "! Ваш ход:");
    //                 break;
    //             default: break;
    //         }
    //         //if(end_game) break;
    //     }

    //     if(confirm("Сыграем еще?")) end_game = false;
    // }
};