import React, { ReactElement } from "react";
import "./Grid.scss";
import { generateRandomSudokuNumbers } from "../../utils/generateHorizontalSudokuLine";
import { FaEraser, FaPen } from "react-icons/fa";

const Grid = () => {
    const renderGrid = () => {
        const grid: ReactElement[] = [];
        const numbers: number[][] = generateRandomSudokuNumbers();
        const flatNumbers: number[] = numbers.flat();

        for (let i = 0; i < 81; i++) {
            const isCovered = Math.random() > 0.5;

            grid.push(
                <div
                    className={`grid-item ${isCovered ? "covered" : ""}`}
                    key={i}
                >
                    {isCovered ? "" : flatNumbers[i]}
                </div>
            );
        }

        return grid;
    };

    return (
        <div className="grid-container">
            <div className="grid">{renderGrid()}</div>
            <aside>
                <div>
                    {FaPen({})}
                    <span>Pen</span>
                </div>
                <div>
                    {FaEraser({})}
                    <span>Eraser</span>
                </div>
            </aside>
        </div>
    );
};

export default Grid;
