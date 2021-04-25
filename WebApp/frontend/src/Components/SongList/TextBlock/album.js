import React from "react";

const Album = (props) => {
    return (
        <div style={props.style}>
            {props.name}
        </div>
    )
}
export default Album