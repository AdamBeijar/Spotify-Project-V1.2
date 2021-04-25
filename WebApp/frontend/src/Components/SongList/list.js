import React from "react";
import ListItem from "./listItem";

const List = (props) => {
    return (
        <div style={props.style}>
            {props.currentList.map((list) => <ListItem key={list['title']} song={list} HoverItem={props.HoverItem}/>)}
        </div>
    )
}
export default List