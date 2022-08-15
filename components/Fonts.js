import {Global} from "@emotion/react";

import React from "react";

const Fonts = () => {
    return (
        <Global styles={`
            @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
        `}/>
    );
};

export default Fonts;
