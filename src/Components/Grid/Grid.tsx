import React, { ReactElement } from "react";
import "./Grid.scss";
import { generateRandomNumbersArray } from "../../utils/generateRandomNumbersArray";

const Grid = () => {
    console.log("Here");
    const generateRandomSudokuNumbers = () => {
        const sudokuNumbers: number[] = [];
        const firstRow: number[] = generateRandomNumbersArray();
        sudokuNumbers.push(...firstRow);

        return sudokuNumbers;
    };

    const renderGrid = () => {
        const grid: ReactElement[] = [];
        const numbers: number[] = generateRandomSudokuNumbers();

        for (let i = 0; i < 81; i++) {
            grid.push(
                <div
                    className="grid-item"
                    key={i}
                >
                    {numbers[i]}
                </div>
            );
        }

        return grid;
    };
    return <div className="grid">{renderGrid()}</div>;
};

export default Grid;
