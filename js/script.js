// HTML
let boxes = document.getElementById('boxes');
// let counter = 1; // Кто ходит?
let box = document.getElementsByClassName('box');
let test = document.getElementsByClassName('test');


// Colors
const colorFirst = '#e19033';
const colorSecond = '#33e190';

// Глобальная переменная для генерации рандома
let random = 0;
let timeOut = 0;
let counter = 0;

// Start Information About Player
let infoPlayer = document.getElementById('info-player');
let infoPlayerName = document.getElementById('info-player-name');
infoPlayerName.style.background = colorFirst;

// Победное окно
const infoWinner = document.querySelector('.winner__body');
const infoWinnerName = document.querySelector('.info__winner span');

// Info Setting
const infoSettings = document.querySelector('.info__settings');
let btnEnemy = document.getElementById('btn-choose-enemy');
let infoGameMode = document.querySelector('.game-mode');
const btnPointsClear = document.getElementById('pointsClear');

// Points
let pointsNameFirstPlayer = document.querySelector('.points__first-player');
let pointsNameSecondPlayer = document.querySelector('.points__second-player');

// gameMode
let gameWithComp

// Получаем данные о режиме с local storage

if (localStorage.getItem('gameWithComp')) {
    // Если есть данные о режиме игры
    if (localStorage.getItem('gameWithComp') === 'true') {
        gameWithComp = true;
    } else {
        gameWithComp = false;
    }
} else {
    gameWithComp = false;
    console.log('Данных нет о режиме игры, включаем режим против человека')
}


if (gameWithComp === false) {
    btnEnemy.textContent = 'Играть против компьютера'
    infoGameMode.textContent = 'Игра против человека';
} else {
    btnEnemy.textContent = 'Играть против человека'
    infoGameMode.textContent = 'Игра против компьютера';
}


if (localStorage.getItem('pointsFirstPlayer') || localStorage.getItem('pointsSecondPlayer')) { //Если есть инфа об очках в localStorage
    console.log('Есть данные в хранилище');
    pointsFirst = localStorage.getItem('pointsFirstPlayer');
    pointsFirst = Number(pointsFirst)
    pointsNameFirstPlayer.textContent = `Leonard: ${pointsFirst}`;
    pointsSecond = localStorage.getItem('pointsSecondPlayer');
    pointsSecond = Number(pointsSecond)
    pointsNameSecondPlayer.textContent = `Liza: ${pointsSecond}`;
} else {
    pointsFirst = 0;
    pointsSecond = 0;
}



// -------------------------------------------- LOGIC ----------------------------------------------------------------- //



if (gameWithComp == true) { // Играем против компа
    btnEnemy.textContent = 'Играть с человеком';
    infoGameMode.textContent = 'Игра против компьютера';

    // Информация об игроках
    playerFirst = 'Комп';
    playerSecond = 'Вы';

    // Информация о ходе
    infoPlayer.innerHTML = 'Сейчас ходите ';
    infoPlayerName.textContent = playerSecond;
    // Окрашиваем имя игрока

    // Ход человека
    boxes.addEventListener('click', function (event) { // Нажатие на ячейку
        // Проверка на повторное нажатие
        if (event.target.innerHTML == 'X' || event.target.innerHTML == 'O') {
            console.log('Второе нажатие')
        } else {
            // Leonard
            event.target.innerHTML = 'X'; // Вставляем символ 'Х'
            event.target.style.zIndex = '100';
            event.target.style.background = colorFirst; // Окрашиваем нажатую ячейку
            infoPlayerName.textContent = playerFirst; // Показываем имя первого игрока
            infoPlayerName.style.background = colorSecond; // Окрашиваем имя игрока
            infoPlayer.innerHTML = 'Сейчас ходит ';
            setTimeout(compTurn, 500);
            check(); // Проверяем сложилась ли комбинация
        }
    })


} else if (gameWithComp == false) { // Играем против человека
    infoGameMode.textContent = 'Игра против человека';

    // Информация об игроках
    playerFirst = 'Leonard';
    playerSecond = 'Liza';


    boxes.addEventListener('click', function (event) { // Нажатие на ячейку
        // Проверка на повторное нажатие
        if (event.target.innerHTML == 'X' || event.target.innerHTML == 'O') {
            console.log('Второе нажатие')
        } else {
            if (counter % 2 == 0) {
                // Leonard
                event.target.innerHTML = 'X'; // Вставляем символ 'Х'
                event.target.style.background = colorFirst; // Окрашиваем нажатую ячейку
                infoPlayerName.textContent = playerFirst; // Показываем имя первого игрока
                infoPlayerName.style.background = colorSecond; // Окрашиваем имя игрока
                infoPlayer.innerHTML = 'Сейчас ходит ';
                check(); // Проверяем сложилась ли комбинация
                counter += 1;
            } else {
                // Liza
                event.target.innerHTML = 'O'; // Вставляем символ 'Х'
                event.target.style.background = colorSecond; // Окрашиваем нажатую ячейку
                infoPlayerName.textContent = playerSecond; // Показываем имя первого игрока
                infoPlayerName.style.background = colorFirst; // Окрашиваем имя игрока
                infoPlayer.innerHTML = 'Сейчас ходит ';
                check(); // Проверяем сложилась ли комбинация
                counter += 1;
            }

        }
    })

    // Информация о ходе
    infoPlayer.innerHTML = 'Сейчас ходит ';
    infoPlayerName.textContent = playerSecond;
}

// Hover
boxes.addEventListener('mouseover', function (event) {
    if (event.target.innerHTML == 'X' || event.target.innerHTML == 'O') {
        // Если в клетке уже есть какой-либо символ
    } else {
        // Если нет, то включаем hover
        if (counter % 2 == 0) {
            event.target.classList.add('first-player');
            event.target.style.boxShadow = '2px 3px 20px rgba(0, 0, 0, 0.5)';
        } else {
            event.target.classList.add('second-player');
            event.target.style.boxShadow = '2px 3px 20px rgba(0, 0, 0, 0.5)';
        }

    }
});
boxes.addEventListener('mouseout', function (event) {
    event.target.classList.remove('first-player');
    event.target.classList.remove('second-player');
    event.target.style.boxShadow = '';
});



// Логика хода компа
let compTurn = function () {
    getRandomInt(9);
    // Выбираем рандомную ячейку
    if (box[random].innerHTML == 'X' || box[random].innerHTML == 'O') { // Если выбранная ячейка уже чем-то занята, то перезапуск функции
        console.log('Нужно другое число');
        infoPlayerName.innerHTML = 'Компьютер думает';
        infoPlayer.innerHTML = '';
        getRandomTimeOut(2);
        setTimeout(compTurn, timeOut);
    } else {
        box[random].innerHTML = 'O'; // Вставляем символ 'О'
        box[random].style.background = colorSecond; // Окрашиваем нажатую ячейку
        infoPlayerName.textContent = playerSecond; // Показываем имя второго игрока
        infoPlayer.innerHTML = 'Сейчас ходите ';
        infoPlayerName.style.background = colorFirst; // Окрашиваем имя игрока
        box[random].style.zIndex = '100';
        check();
    }
}

// Генераторы случайного числа для игры с компом
let getRandomInt = function (max) {
    random = Math.floor(Math.random() * Math.floor(max));
}
let getRandomTimeOut = function (max) {
    timeOut = (Math.floor(Math.random() * Math.floor(max))) * 1000;
    console.log(timeOut);
}

// Проверка на комбинацию
function check() {
    let dataBingo = [ // Массив с победными комбинациями
        // Gorizont
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];
    // Проходим по массиву
    for (let i = 0; i < dataBingo.length; i++) {
        if (box[dataBingo[i][0]].innerHTML == 'X' && box[dataBingo[i][1]].innerHTML == 'X' && box[dataBingo[i][2]].innerHTML == 'X') {
            console.log(`Победил игрок ${playerSecond}`);
            infoWinner.style.display = 'grid';
            infoWinnerName.style.background = colorFirst;
            infoWinnerName.innerHTML = playerSecond;
            box[dataBingo[i][0]].style.animationName = 'win-animation';
            box[dataBingo[i][1]].style.animationName = 'win-animation';
            box[dataBingo[i][2]].style.animationName = 'win-animation';
            pointsSecond += 1;
            pointsNameSecondPlayer.textContent = `${playerSecond}: ${pointsSecond}`;
            localStorage.setItem('pointsSecondPlayer', pointsSecond);
            setTimeout(function () {
                location.reload();
            }, 3000);
        } else if (box[dataBingo[i][0]].innerHTML == 'O' && box[dataBingo[i][1]].innerHTML == 'O' && box[dataBingo[i][2]].innerHTML == 'O') {
            console.log(`Победил игрок ${playerFirst}`);
            infoWinner.style.display = 'grid';
            infoWinnerName.style.background = colorSecond;
            infoWinnerName.innerHTML = playerFirst;
            box[dataBingo[i][0]].style.animationName = 'win-animation';
            box[dataBingo[i][1]].style.animationName = 'win-animation';
            box[dataBingo[i][2]].style.animationName = 'win-animation';
            pointsFirst += 1;
            pointsNameFirstPlayer.textContent = `${playerFirst}: ${pointsFirst}`;
            localStorage.setItem('pointsFirstPlayer', pointsFirst);
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    }
}


// Settings
btnEnemy.onclick = function () {
    if (gameWithComp === true) {
        window.localStorage.clear()
        gameWithComp = false;
        localStorage.setItem('gameWithComp', false);
    } else {
        window.localStorage.clear()
        gameWithComp = true;
        localStorage.setItem('gameWithComp', true);
    }
    window.location.reload()
    console.log(`Играем против компьютера ${gameWithComp}`);
}


// Очистить очки
btnPointsClear.onclick = () => {
    window.localStorage.clear()
    window.location.reload()
}












// Future 

// Спрашивает имя игрока
// Когда собрана комбинация - анимация этих ячеек и информация о победителе
// Играть против компьютера или второго игрока?
// Если сейчас ход компьютера, то нельзя ничего нажать
// Перезапускать игру, а не страницу
// Заблокировать нажатия при победе
// Добавить счёт в localStorage

// Проверка на ничью 
// [o x x]
// [x o o]
// [x 0 x]


// Done
// Проверка на повторное нажатие
// При наведении на ячейку будет окрашиваться в цвет игрока и его символ