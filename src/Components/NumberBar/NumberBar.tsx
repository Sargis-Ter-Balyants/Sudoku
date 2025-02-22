import React from "react";
import "./NumberBar.scss";

const NumberBar = ({ setGridDiv }) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const clickOnNumber = (e) => {
        setGridDiv((prev) => {
            const newGrid = [...prev];
            const index = newGrid.findIndex((item) => item.isClickedWithPen);
            if (index === -1) {
                return newGrid;
            }

            newGrid[index].guessedNumber = Number(e.target.innerText);
            newGrid[index].isClickedWithPen = false;

            return newGrid;
        });
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
