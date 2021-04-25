import React from "react";
import Titleblock from "./titleblock";
import Artist from "./artist";
import Album from "./album";

const Textblock = (props) => {
    const TextBlockStyle = {
        ...props.style,
        marginLeft: "2%",

    }
    const TextBlockCompStyle = {
        marginTop: "1%",
        whiteSpace: "nowrap"
    }
    return (
        <div style={TextBlockStyle}>
            <Titleblock name={props.title} style={TextBlockCompStyle}/>
            <Artist name={props.artist} style={TextBlockCompStyle}/>
            <Album name={props.album} style={TextBlockCompStyle}/>
        </div>
    )
}
export default Textblock