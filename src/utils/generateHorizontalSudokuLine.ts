import { generateHorizontalSudokuLine } from "./generateRandomNumbersArray";

export const generateRandomSudokuNumbers = () => {
    let sudokuNumbers: number[][] = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < 9; i++) {
        const row: number[] = generateHorizontalSudokuLine(sudokuNumbers, i);
        sudokuNumbers[i] = row;
    }
    return sudokuNumbers;
};
