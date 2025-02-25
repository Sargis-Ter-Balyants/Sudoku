type SudokuGrid = number[][];

export const generateRandomSudokuNumbers = (): SudokuGrid => {
    const grid: SudokuGrid = Array(9)
        .fill(null)
        .map(() => Array(9).fill(0));
    fillGrid(grid);
    return grid;
};

const fillGrid = (grid: SudokuGrid, row: number = 0, col: number = 0): boolean => {
    if (col === 9) {
        row++;
        col = 0;
    }

    if (row === 9) {
        return true;
    }

    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (const num of numbers) {
        if (isValid(grid, row, col, num)) {
            const gridRow = grid[row] as number[];
            gridRow[col] = num;

            if (fillGrid(grid, row, col + 1)) {
                return true;
            }

            gridRow[col] = 0;
        }
    }

    return false;
};

const isValid = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
    for (let x = 0; x < 9; x++) {
        const gridRow = grid[row] as number[];
        if (gridRow[x] === num) return false;
    }

    for (let x = 0; x < 9; x++) {
        const gridX = grid[x] as number[];
        if (gridX[col] === num) return false;
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const gridRow = grid[boxRow + i] as number[];
            if (gridRow[boxCol + j] === num) return false;
        }
    }

    return true;
};

const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
