import React from 'react'
import cover from "../../devPic/Billytalent2cover.jpg"


const Cover = () => {
    const imageSize = {
        width: 250,
        height: 250,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid"
    }
    return (
        <div>
            <img style={imageSize} src={cover} alt={"Billytalent2cover"}/>
        </div>
    )
}
export default Cover