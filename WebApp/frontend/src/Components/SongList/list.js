import React from "react";
import ListItem from "./listItem";

const List = (props) => {
    let currentList = props.currentList.sort((a, b) => {
        return b.count - a.count
    })
    currentList = currentList.filter((item, idx) => idx < 10)
    return (
        <div style={props.style}>
            {currentList.map((list) => <ListItem key={list['songId']} song={list} HoverItem={props.HoverItem}/>)}
        </div>
    )
}
export default List