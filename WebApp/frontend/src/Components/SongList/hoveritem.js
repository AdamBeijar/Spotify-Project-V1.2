import React from "react";
import Textblock from "./TextBlock/textblock";
import cover from "../../devPic/21stCenturyBreakdown.jpg"
const Hoveritem = (props) => {
    const gridPlacement = {
        gridColumn: 3,
        gridRow: 3,
        padding:0,
        margin:0,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
    }
    const Left = {
        float:"left",
    }
    const HoverBorder = {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
    }
    const ImageStyle = {
        ...Left,
        ...HoverBorder,
        width: 150
    }
    const TextBlockStyle = {
        ...Left,
        padding: 10,
        height: 130,
    }
    const HoverStyle = {
        ...HoverBorder,
        display: "flex",
        padding: "2%"
    }
    return (
        <div style={gridPlacement}>
            <div style={HoverStyle}>
                <img style={ImageStyle} src={cover} alt={"placeholder"}/>
                <Textblock style={TextBlockStyle} title={props.title} artist={props.artist} album={props.album}/>
            </div>
        </div>
    )
}
export default Hoveritem