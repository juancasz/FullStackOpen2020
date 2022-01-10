import React from "react";
import { Part } from "../types";
import PartComponent from "./Part";

const Content = ({parts}:{parts:Part[]}):JSX.Element => {
    const list = parts.map((part,key) => {
        return <PartComponent part={part} key={key} />
    });

    return(
        <>
            {list}
        </> 
    )
};

export default Content;