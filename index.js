let myGridSize = prompt('Выберите размер поля:');
let enemyGridSize = prompt('Выберите размер поля соперника:');
let myGrid = createGrid(myGridSize);
let enemyGrid = createGrid(enemyGridSize);
let myShips = 3;
let enemyShips = 3;
let enemyLocations = {};

printGrid(enemyGrid, true);
printGrid(myGrid);

for (let i = 1; i < 4; i++) {
    let x = prompt(`Введите координату х для вашего ${i} из 3 короблей`);
    let y = prompt(`Введите координату y для вашего ${i} из 3 короблей`);

    placeCharacter(x, y, 'O', myGrid);
    placeRandomCharacter('O', enemyGrid, enemyGridSize);
    drawBreak();
    printGrid(enemyGrid, true);
    printGrid(myGrid);
}

while (enemyShips > 0 && myShips > 0) {
    let x = prompt('Введите координату х для атаки');
    let y = prompt('Введите координату y для атаки');

    if (attack(x, y, enemyGrid)) {
        enemyShips--;
    }

    x = getRandomInt(myGridSize);
    y = getRandomInt(myGridSize);
    if (enemyShips > 0 && attack(x, y, myGrid)) {
        myShips--;
    }

    drawBreak();
    printGrid(enemyGrid, true);
    printGrid(myGrid);
}

if (myShips < enemyGrid) {
    alert('Вы проиграли!');
} else {
    alert('Победа!!!');
}

function createGrid(size) {
    let grid = [];

    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = '-';
        }
    }
    return grid;
}

function printGrid(grid, isEnemy = false) {
    const headers = createHeaders(grid.length);
    console.log(headers);

    for (let i = 0; i < grid.length; i++) {
        let rowStr = i + ' ';
        for (let cell of grid[i]) {
            if (isEnemy && cell == 'O') {
                rowStr += '- ';
            } else {
                rowStr += cell + ' ';
            }
        }
        console.log(rowStr);
    }
}

function createHeaders(size) {
    let result = '  ';
    for (let i = 0; i < size; i++) {
        result += i + ' ';
    }
    return result;
}

function placeCharacter(x, y, ship, grid) {
    grid[y][x] = ship;
}

function placeRandomCharacter(ship, grid, maxLength) {
    let didPlace = false;
    while (!didPlace) {
        let x = getRandomInt(maxLength);
        let y = getRandomInt(maxLength);

        if (!enemyLocations[`${x}-${y}`]) {
            placeCharacter(x, y, ship, grid);
            didPlace = true;
            enemyLocations[`${x}-${y}`] = true;
        }
    }
}

function getRandomInt(maxLength) {
    return Math.floor(Math.random() * Math.floor(maxLength));
}

function attack(x, y, grid) {
    if (grid[y][x] == 'O') {
        grid[y][x] = 'H';
        return true;
    } else if (grid[y][x] == '-') {
        grid[y][x] = 'x';
        return false;
    } else {
        return false;
    }
}

function drawBreak() {
    console.log('-------------------------------');
}