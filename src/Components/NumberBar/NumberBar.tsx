import React from "react";
import "./NumberBar.scss";
import { GridItemType } from "../Grid/Grid";

const NumberBar = ({ setGridDiv, setUntilWinCounter }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const clickOnNumber = (e) => {
        setGridDiv((prev: GridItemType[]) => {
            prev.map((item) => {
                item.guidingItem = false;
                return item;
            });
            const newGrid = [...prev];
            const index = newGrid.findIndex((item) => item.isClickedWithPen);
            if (index === -1) {
                return newGrid;
            }

            const item = newGrid[index] as GridItemType;

            item.guessedNumber = Number(e.target.innerText);
            item.isClickedWithPen = false;

            return newGrid;
        });
        setUntilWinCounter((prev: number) => prev - 1);
    };

    return (
        <div className="number-bar">
            {numbers.map((number) => (
                <button
                    key={number}
                    className="number-button"
                    onClick={clickOnNumber}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default NumberBar;
