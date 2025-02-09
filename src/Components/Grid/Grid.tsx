import React, { ReactElement } from "react";
import "./Grid.scss";
import { generateRandomSudokuNumbers } from "../../utils/generateSudokuNumbers";

const Grid = () => {
    const renderGrid = () => {
        const grid: ReactElement[] = [];
        const numbers: number[][] = generateRandomSudokuNumbers();
        console.log(numbers);
        const flatNumbers: number[] = numbers.flat();

        for (let i = 0; i < 81; i++) {
            grid.push(
                <div
                    className="grid-item"
                    key={i}
                >
                    {flatNumbers[i]}
                </div>
            );
        }

        return grid;
    };
    return <div className="grid">{renderGrid()}</div>;
};

export default Grid;
