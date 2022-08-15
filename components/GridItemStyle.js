import React from "react";
import {Global} from "@emotion/react";

function GridItemStyle() {
    return <Global styles={`
        .grid-item-thumbnail {
           border-radius: 12px; 
        }
    `}/>;
}

export default GridItemStyle;
