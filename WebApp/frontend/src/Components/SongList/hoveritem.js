import React from "react";
import Textblock from "./TextBlock/textblock";
import Button from "../addToQueue";


const Hoveritem = (props) => {
    const gridPlacement = {
        gridColumn: 3,
        gridRow: 3,
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    const Left = {
        float: "left",
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
                <img style={ImageStyle} src={props.song['imgUrl']} alt={"placeholder"}/>
                <Textblock style={TextBlockStyle} title={props.song['name']} artist={props.song['artist']} album={props.song['album']}/>
                <Button songs={[props.song]} name={"Add to Queue"}/>
            </div>
        </div>
    )
}
export default Hoveritem