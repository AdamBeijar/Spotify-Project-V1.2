import React from "react";

const Artist = (props) => {
    const text = props.name
    let itemText = ""
    if(text.length > 30) {
        itemText = `${text.substring(0, 30)}...`
    } else {
        itemText = text
    }
    return (
        <div style={props.style}>
            {itemText}
        </div>
    )
}
export default Artist