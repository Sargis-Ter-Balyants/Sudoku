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
};

interface Props {
    difficulty: number;
    generate: boolean;
}

export const ToolContext = React.createContext<ToolContextType | undefined>(undefined);

const Grid = ({ difficulty, generate }: Props) => {
    const [gridDiv, setGridDiv] = React.useState<GridItemType[]>([]);
    const [isPenSelected, setIsPenSelected] = useState<boolean>(true);
    const [isEraserSelected, setIsEraserSelected] = useState<boolean>(false);

    useEffect(() => {
        const numbers: number[][] = generateRandomSudokuNumbers();
        const flatNumbers: number[] = numbers.flat();

        const grid: GridItemType[] = flatNumbers.map((num, i) => {
            const isCovered = Math.random() > difficulty;

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
                    />
                ),
                isClickedWithPen: false,
                guessedNumber: undefined,
                isCovered,
            };
        });

        setGridDiv(grid);
    }, [difficulty, generate]);

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
                        return (
                            <GridItem
                                isCovered={item.isCovered}
                                value={item.element.props.value}
                                index={index}
                                key={index}
                                setGridDiv={setGridDiv}
                                isPenSelected={isPenSelected}
                                isEraserSelected={isEraserSelected}
                                item={item}
                            />
                        );
                    })}
                </div>
                <ToolBar />
            </ToolContext.Provider>
        </div>
    );
};

export default Grid;
