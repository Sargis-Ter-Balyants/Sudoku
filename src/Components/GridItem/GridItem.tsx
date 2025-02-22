import React from "react";
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
}

const GridItem = ({ isPenSelected, isEraserSelected, isCovered, value, index, item, setGridDiv }: Props) => {
    if (!item) return null;

    const penClicked = item.isClickedWithPen;
    const guessedNumber = item.guessedNumber;

    const clickOnGridItem = (index: number) => {
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
    };

    return (
        <div
            className={`grid-item ${penClicked ? "pen-clicked" : ""}  ${isCovered ? "covered" : ""} ${
                guessedNumber ? "guessed" : ""
            }`}
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
            {isCovered ? (guessedNumber ? guessedNumber : "") : value}
        </div>
    );
};

export default GridItem;
