export const generateRandomNumbersArray = (sudokuNumbers: number[][], currentIndex: number): number[] => {
    let digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let horizontal: number[] = [];
    let vertical: number[] = sudokuNumbers.map((row: number[]) => row[currentIndex] || 0) as number[];
    let box: number[] = [];

    console.log("vertical", vertical);
    console.log("box", box);

    for (let i = 0; i < 9; i++) {
        const randomIndex: number = Math.floor(Math.random() * digits.length);
        const selectedNumber: number | undefined = digits[randomIndex];
        horizontal.push(selectedNumber as number);
        digits = digits.filter((digit: number) => digit !== selectedNumber);
    }

    return horizontal;
};
