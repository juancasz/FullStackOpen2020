import React from "react";
import { Part } from "../types";

const Content = ({parts}:{parts:Part[]}):JSX.Element => {
    const list = parts.map((part,key) => {
        return <p key={key}> {part.name} {part.exerciseCount}</p>
        
    });

    return(
        <>
            {list}
        </> 
    )
};

export default Content;