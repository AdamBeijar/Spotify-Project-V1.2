import React from "react";
import Titleblock from "./titleblock";
import Artist from "./artist";
import Album from "./album";

const Textblock = () => {
    return (
        <div>
            <Titleblock name={"Red Flag"}/>
            <Artist name={"Billy Talent"}/>
            <Album name={"Billy Talent II"}/>
        </div>
    )
}
export default Textblock