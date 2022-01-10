import React from 'react'
import { CoursePart } from '../types';

const Part = ({part,key}:{part:CoursePart,key:number}) => {
    switch(part.type){
        case "normal":
            return(
                <div key={key}>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>{part.description}</p>
                </div>
            )
        case "submission":
            return(
                <div key={key}>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>{part.description}</p>
                    <p>submit to {part.exerciseSubmissionLink}</p>
                </div>
            )
        case "groupProject":
            return(
                <div key={key}>
                    <p><b>{part.name} {part.exerciseCount}</b></p>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        default: 
            return <>Not available</>
    }   
};

export default Part;