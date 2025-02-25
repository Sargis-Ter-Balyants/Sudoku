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
    setCurrentActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
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
    setCurrentActiveItemIndex,
}: Props) => {
    const penClicked = item?.isClickedWithPen;
    const guessedNumber = item?.guessedNumber;
    const lost = win && guessedNumber && guessedNumber !== value;
    const guidingItem = item?.guidingItem;

    const clickOnGridItem = (index: number) => {
        if (!item?.isCovered || win) return;

        if (isPenSelected) {
            setGridDiv((prev) =>
                prev.map((item, i) => {
                    const row = Math.floor(index / 9);
                    const col = index % 9;
                    const boxRow = Math.floor(row / 3) * 3;
                    const boxCol = Math.floor(col / 3) * 3;

                    const itemRow = Math.floor(i / 9);
                    const itemCol = i % 9;

                    item.isClickedWithPen = false;
                    item.guidingItem = false;

                    if (i === index) {
                        item.isClickedWithPen = !penClicked;
                        if (!penClicked) setCurrentActiveItemIndex(i);
                        else setCurrentActiveItemIndex(0);
                    }

                    if (
                        !penClicked &&
                        (itemRow === row ||
                            itemCol === col ||
                            (itemRow >= boxRow && itemRow < boxRow + 3 && itemCol >= boxCol && itemCol < boxCol + 3))
                    ) {
                        item.guidingItem = true;
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
            } ${win ? "win" : ""} ${lost ? "wrong-guess" : ""} ${guidingItem ? "guiding-bg" : ""}`}
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
