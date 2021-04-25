import React from "react";
const ListItem = (props) => {
    const ListItemBorder = {
        borderTop:"1px black solid",
        padding:"1% 1%"
    }
    return (
        <div style={ListItemBorder}>
            <p onMouseEnter={() => props.HoverItem(props.song, true)}
                 onMouseLeave={() => props.HoverItem("none", false)}>
                {props.song['title']} | {props.song['artist']}
            </p>
        </div>
    )
}
export default ListItem