import React from "react";

const ListItem = (props) => {
    const ListItemBorder = {
        borderTop:"1px black solid",
        padding:"1% 1%"
    }
    const text = `${props.song['name']} | ${props.song['artist']}`
    let itemText = ""
    if(text.length > 50) {
        itemText = `${text.substring(0, 50)}...`
    } else {
        itemText = text
    }
    return (
        <div style={ListItemBorder}>
            <p onMouseEnter={() => props.HoverItem(props.song, true)}
                 onMouseLeave={() => props.HoverItem("none", false)}>
                {itemText} | count: {props.song['count']}
            </p>
        </div>
    )
}
export default ListItem