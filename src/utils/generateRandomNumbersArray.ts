export const generateRandomNumbersArray = (): number[] => {
    const numbers: number[] = [];
    let digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < 9; i++) {
        const randomIndex: number = Math.floor(Math.random() * digits.length);
        const selectedNumber: number | undefined = digits[randomIndex];
        numbers.push(selectedNumber as number);
        digits = digits.filter((digit: number) => digit !== selectedNumber);
    }

    return numbers;
};
