import React from 'react'
import Cover from "./cover";
import Textblock from "./TextBlock/textblock";

const Songblock = (props) => {
    return (
        <div style={props.style}>
            <Cover />
            <Textblock />
        </div>
    )
}
export default Songblock