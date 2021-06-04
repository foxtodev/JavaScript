window.onload = function() {
    var end_game = false;
    var rnd_num, n, count_steps;

    function generate_number(count = 4) {
        var n = [], rnd_n;
        for(var i = 0; i < count; i++) {
            rnd_n = Math.floor(Math.random() * 10);
            if(n.indexOf(rnd_n) < 0) n.push(rnd_n); else i--;
        }
        console.log(n.join(""));
        return n.join("");
    }

    function check_cows(n1, n2 = rnd_num) {
        var result = [];
        n1 += ""; n2 += "";
        for(var i = 0; i < n1.length; i++) 
            if(n2.indexOf(n1[i]) >= 0) result.push(n1[i]);
        return result;
    }

    function check_bulls(n1, n2 = rnd_num) {
        var result = [];
        n1 += ""; n2 += "";
        for(var i = 0; i < n1.length; i++) 
            if(n2.indexOf(n1[i]) == i) result.push(n1[i]);
        return result;
    }

    while (!end_game) {
        rnd_num = generate_number();
        count_steps = 0;
        n = prompt("Четырехзначное число загаданно! Ваш ход:");
        
        while (!end_game) {
            count_steps++;
            switch (true) {
                case n === null:
                    alert("Игра прекращена.");
                    end_game = true;
                    break;
                case n == rnd_num:
                    alert("Молодцом! Вы угадали! Этот число " + rnd_num + ". Количество ходов " + count_steps + ".");
                    end_game = true;
                    break;
                case rnd_num < n:
                    n = prompt("Загаданное число меньше " + n + ". Коровы > " + check_cows(n) + ". Быки > " + check_bulls(n) + ". Ваш ход:");
                    break;
                case rnd_num > n: 
                    n = prompt("Загаданное число больше " + n + ". Коровы > " + check_cows(n) + ". Быки > " + check_bulls(n) + ". Ваш ход:");
                    break;
                default: break;
            }
            //if(end_game) break;
        }

        if(confirm("Сыграем еще?")) end_game = false;
    }
};