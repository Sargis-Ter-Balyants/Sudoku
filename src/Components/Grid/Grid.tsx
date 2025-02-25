import React, { JSX, useEffect, useState } from "react";
import "./Grid.scss";
import { generateRandomSudokuNumbers } from "../../utils/generateHorizontalSudokuLine";
import GridItem from "../GridItem/GridItem";
import ToolBar from "../ToolBar/ToolBar";
import NumberBar from "../NumberBar/NumberBar";

interface ToolContextType {
    isPenSelected: boolean;
    isEraserSelected: boolean;
    setIsPenSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEraserSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export type GridItemType = {
    element: JSX.Element;
    isClickedWithPen: boolean;
    guessedNumber: number | undefined;
    isCovered: boolean;
    guidingItem: boolean;
};

interface Props {
    difficulty: number;
    generate: boolean;
    untilWinCounter: number;
    setUntilWinCounter: React.Dispatch<React.SetStateAction<number>>;
    win: boolean;
    setWin: React.Dispatch<React.SetStateAction<boolean>>;
    setLost: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToolContext = React.createContext<ToolContextType | undefined>(undefined);

const Grid = ({ difficulty, generate, untilWinCounter, setUntilWinCounter, win, setWin, setLost }: Props) => {
    const [gridDiv, setGridDiv] = React.useState<GridItemType[]>([]);
    const [isPenSelected, setIsPenSelected] = useState<boolean>(true);
    const [isEraserSelected, setIsEraserSelected] = useState<boolean>(false);

    useEffect(() => {
        const numbers: number[][] = generateRandomSudokuNumbers();
        const flatNumbers: number[] = numbers.flat();
        setUntilWinCounter(0);

        const grid: GridItemType[] = flatNumbers.map((num, i) => {
            const isCovered = Math.random() > difficulty;

            if (isCovered) setUntilWinCounter((prev) => prev + 1);

            return {
                element: (
                    <GridItem
                        value={num}
                        isCovered={isCovered}
                        index={i}
                        setGridDiv={() => {}}
                        isPenSelected={true}
                        isEraserSelected={false}
                        item={undefined}
                        win={false}
                        setLost={() => {}}
                        setUntilWinCounter={() => {}}
                    />
                ),
                isClickedWithPen: false,
                guessedNumber: undefined,
                isCovered,
                guidingItem: false,
            };
        });

        setGridDiv(grid);
    }, [difficulty, generate, setUntilWinCounter]);

    useEffect(() => {
        if (untilWinCounter === 0) setWin(true);
        else setWin(false);
    }, [setWin, untilWinCounter]);

    return (
        <div className="grid-container">
            <ToolContext.Provider
                value={{
                    isPenSelected,
                    isEraserSelected,
                    setIsPenSelected,
                    setIsEraserSelected,
                }}
            >
                <NumberBar setGridDiv={setGridDiv} />
                <div className="grid">
                    {gridDiv.map((item: GridItemType, index: number) => {
                        const props = {
                            isCovered: item.isCovered,
                            value: item.element.props.value,
                            index,
                            setGridDiv,
                            isPenSelected,
                            isEraserSelected,
                            item,
                            win,
                            setUntilWinCounter,
                            setLost,
                        };

                        return (
                            <GridItem
                                {...props}
                                key={index}
                            />
                        );
                    })}
                </div>
                <ToolBar
                    setUntilWinCounter={setUntilWinCounter}
                    setGridDiv={setGridDiv}
                />
            </ToolContext.Provider>
        </div>
    );
};

export default Grid;
