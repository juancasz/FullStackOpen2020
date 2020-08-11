import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {

  const sum = course.parts.reduce((current,part)=>current+part.exercises,0)

  return(
    <p><b>Toal of {sum} exercises</b></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
 
  const parts = course.parts.map((part) =>{
    return <Part key={part.id} part={part}/>
  })

  return (
    <div>
      {parts}
    </div>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course