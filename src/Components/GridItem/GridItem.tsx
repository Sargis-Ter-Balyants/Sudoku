import React, { useEffect } from "react";
import "./GridItem.scss";
import { GridItemType } from "../Grid/Grid";

interface Props {
    isPenSelected: boolean;
    isEraserSelected: boolean;
    isCovered: boolean;
    value: number;
    index: number;
    item: GridItemType | undefined;
    setGridDiv: React.Dispatch<React.SetStateAction<GridItemType[]>>;
    setUntilWinCounter: React.Dispatch<React.SetStateAction<number>>;
    win: boolean;
    setLost: React.Dispatch<React.SetStateAction<boolean>>;
}

const GridItem = ({
    isPenSelected,
    isEraserSelected,
    isCovered,
    value,
    index,
    item,
    setGridDiv,
    win,
    setUntilWinCounter,
    setLost,
}: Props) => {
    const penClicked = item?.isClickedWithPen;
    const guessedNumber = item?.guessedNumber;
    const lost = win && guessedNumber && guessedNumber !== value;

    const clickOnGridItem = (index: number) => {
        if (!item?.isCovered || win) return;

        if (isPenSelected) {
            setGridDiv((prev) =>
                prev.map((item, i) => {
                    item.isClickedWithPen = false;
                    if (i === index) {
                        item.isClickedWithPen = !penClicked;
                    }
                    return item;
                })
            );
        } else if (isEraserSelected) {
            setGridDiv((prev) =>
                prev.map((item, i) => {
                    if (i === index) {
                        item.isClickedWithPen = false;
                        item.guessedNumber = undefined;
                    }
                    return item;
                })
            );
            setUntilWinCounter((prev) => prev + 1);
        }
    };

    const guessNumber = (index: number, val: number) => {
        setGridDiv((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    item.isClickedWithPen = !penClicked;
                    item.guessedNumber = val;
                }
                return item;
            })
        );
        setUntilWinCounter((prev) => prev - 1);
    };

    useEffect(() => {
        if (lost) setLost(true);
    }, [lost, setLost]);

    if (!item) return null;

    return (
        <div
            className={`grid-item ${penClicked ? "pen-clicked" : ""}  ${isCovered ? "covered" : ""} ${
                guessedNumber ? "guessed" : ""
            } ${win ? "win" : ""} ${lost ? "wrong-guess" : ""}`}
            key={index}
            onClick={() => clickOnGridItem(index)}
            onKeyDown={(e) => {
                if (!penClicked) return;

                if (
                    e.key === "1" ||
                    e.key === "1" ||
                    e.key === "2" ||
                    e.key === "3" ||
                    e.key === "4" ||
                    e.key === "5" ||
                    e.key === "6" ||
                    e.key === "7" ||
                    e.key === "8" ||
                    e.key === "9"
                ) {
                    guessNumber(index, Number(e.key));
                }
            }}
            tabIndex={0}
        >
            {lost ? <s>{guessedNumber}</s> : isCovered ? guessedNumber ? guessedNumber : "" : value}
            {lost ? <span className="correct-answer">{value}</span> : null}
        </div>
    );
};

export default GridItem;
