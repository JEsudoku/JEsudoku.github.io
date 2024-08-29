function createEmptyGrid() {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push(new Array(9).fill(0));
    }
    return grid;
}

function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}

function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function removeElements(grid, count) {
    while (count > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            count--;
        }
    }
}

function printGrid(grid) {
    for (let i = 0; i < 9; i++) {
        console.log(grid[i].join(' '));
    }
}

function generateSudoku() {
    const grid = createEmptyGrid();
    solveSudoku(grid);
    removeElements(grid, 40); // Remove 40 elements to create a puzzle
    printGrid(grid);
}

generateSudoku();
