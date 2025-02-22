const getVerticalLine = (sudokuNumbers, currentIndex) => {
    return sudokuNumbers.map((row: number[]) => row[currentIndex] || 0);
};

const getCurrentBox = (sudokuNumbers: number[][], verticalIndex: number, horizontalIndex: number): number[] => {
    let box: number[] = [];
    let horizontalStartIndex = 0;
    let horizontalEndIndex = 0;

    let verticalBoxIndex = 0;

    if (horizontalIndex < 3) {
        horizontalStartIndex = 0;
        horizontalEndIndex = 3;
    } else if (horizontalIndex < 6) {
        horizontalStartIndex = 3;
        horizontalEndIndex = 6;
    } else if (horizontalIndex < 9) {
        horizontalStartIndex = 6;
        horizontalEndIndex = 9;
    }

    if (verticalIndex < 3) {
        verticalBoxIndex = 0;
    } else if (verticalIndex < 6) {
        verticalBoxIndex = 3;
    } else if (verticalIndex < 9) {
        verticalBoxIndex = 6;
    }

    const first = sudokuNumbers[verticalBoxIndex]?.slice(horizontalStartIndex, horizontalEndIndex) ?? [];
    const second = sudokuNumbers[verticalBoxIndex + 1]?.slice(horizontalStartIndex, horizontalEndIndex) ?? [];
    const third = sudokuNumbers[verticalBoxIndex + 2]?.slice(horizontalStartIndex, horizontalEndIndex) ?? [];
    box = [...first, ...second, ...third];

    return box;
};

export const generateHorizontalSudokuLine = (sudokuNumbers: number[][], currentIndex: number): number[] => {
    let digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let horizontal: number[] = [];

    for (let i = 0; i < 9; i++) {
        let vertical: number[] = getVerticalLine(sudokuNumbers, i);
        let box: number[] = getCurrentBox(sudokuNumbers, currentIndex, i);

        let validDigits: number[] = [...digits.filter((num: number) => !vertical.includes(num) && !box.includes(num))];

        const randomIndex = Math.floor(Math.random() * validDigits.length);
        const selectedNumber = validDigits[randomIndex] || 0;
        if (selectedNumber === 0) {
            return generateHorizontalSudokuLine(sudokuNumbers, currentIndex);
        }

        horizontal.push(selectedNumber);
        digits = digits.filter((digit) => digit !== selectedNumber);
    }

    return horizontal;
};
