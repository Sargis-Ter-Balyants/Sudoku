import React, { ReactNode } from "react";

interface Props {
    onClick: () => void;
    icon: (props: any) => ReactNode;
    isHoveringTools: boolean;
    isSelected: boolean;
    label: string;
}

const Tool = ({ onClick, icon, isHoveringTools, isSelected, label }: Props) => {
    return (
        <div
            onClick={onClick}
            className={isSelected ? "selected" : ""}
        >
            {icon({})}
            {isHoveringTools && <span>{label}</span>}
        </div>
    );
};

export default Tool;
