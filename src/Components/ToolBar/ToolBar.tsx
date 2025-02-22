import React from "react";
import "./ToolBar.scss";
import Tool from "../Tool/Tool";
import { FaPen, FaEraser } from "react-icons/fa";
import { ToolContext } from "../Grid/Grid";

const ToolBar = () => {
    const [isHoveringTools, setIsHoveringTools] = React.useState(false);
    const toolContext = React.useContext(ToolContext);
    if (!toolContext) {
        return null;
    }
    const { isPenSelected, setIsPenSelected, isEraserSelected, setIsEraserSelected } = toolContext;

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
                icon={FaPen}
                isHoveringTools={isHoveringTools}
                isSelected={isPenSelected}
                label={"Pen"}
            />
            <Tool
                onClick={() => {
                    setIsEraserSelected(true);
                    setIsPenSelected(false);
                }}
                icon={FaEraser}
                isHoveringTools={isHoveringTools}
                isSelected={isEraserSelected}
                label={"Eraser"}
            />
        </aside>
    );
};

export default ToolBar;
