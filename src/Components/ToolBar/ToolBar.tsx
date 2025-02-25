import React from "react";
import "./ToolBar.scss";
import Tool from "../Tool/Tool";
import { FaLightbulb, FaPencilAlt } from "react-icons/fa";
import { LuEraser } from "react-icons/lu";
import { GrPowerReset } from "react-icons/gr";
import { GridItemType, ToolContext } from "../Grid/Grid";

const ToolBar = ({ setGridDiv, setUntilWinCounter, currentActiveItemIndex }) => {
    const [isHoveringTools, setIsHoveringTools] = React.useState(false);
    const toolContext = React.useContext(ToolContext);
    if (!toolContext) {
        return null;
    }
    const { isPenSelected, setIsPenSelected, isEraserSelected, setIsEraserSelected } = toolContext;

    const resetSudoku = () => {
        let count = 0;
        setGridDiv((prev: GridItemType[]) =>
            prev.map((item) => {
                if (item.guessedNumber) count++;
                item.guessedNumber = undefined;
                return item;
            })
        );
        setUntilWinCounter((prev: number) => prev + count);
    };

    const revealItem = () => {
        setGridDiv((prev: GridItemType[]) =>
            prev.map((item: GridItemType, i: number) => {
                if (currentActiveItemIndex === i) {
                    item.isCovered = false;
                }
                return item;
            })
        );
    };

    return (
        <aside
            onMouseOver={() => setIsHoveringTools(true)}
            onMouseOut={() => setIsHoveringTools(false)}
        >
            <Tool
                onClick={() => {
                    setIsPenSelected(true);
                    setIsEraserSelected(false);
                }}
                icon={FaPencilAlt}
                isHoveringTools={isHoveringTools}
                isSelected={isPenSelected}
                label={"Pen"}
            />
            <Tool
                onClick={() => {
                    setIsEraserSelected(true);
                    setIsPenSelected(false);
                }}
                icon={LuEraser}
                isHoveringTools={isHoveringTools}
                isSelected={isEraserSelected}
                label={"Eraser"}
            />
            <Tool
                onClick={resetSudoku}
                icon={GrPowerReset}
                isHoveringTools={isHoveringTools}
                isSelected={isEraserSelected}
                label={"Reset"}
            />

            <Tool
                onClick={revealItem}
                icon={FaLightbulb}
                isHoveringTools={isHoveringTools}
                isSelected={isEraserSelected}
                label={"Hint"}
            />
        </aside>
    );
};

export default ToolBar;
