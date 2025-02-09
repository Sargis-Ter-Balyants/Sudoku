import { generateRandomNumbersArray } from "./generateRandomNumbersArray";

export const generateRandomSudokuNumbers = () => {
    let sudokuNumbers: number[][] = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < 9; i++) {
        const row: number[] = generateRandomNumbersArray(sudokuNumbers, i);
        sudokuNumbers[i] = row;
    }
    return sudokuNumbers;
};
