import React, {Component} from 'react'
import styled from 'styled-components'

// need to make a stateful component 

const buttonsArray = ['B','GL','2','3','4','5']
let floor = ''; 

const click = (event) =>{
  console.log(event.target.name)
  floor = event.target.name;
}

const ElevatorPanel = (props) =>{
  return <Panel> 
    <FloorDisplay>{floor}</FloorDisplay>
    { buttonsArray.map(btn =>
        <Button key={btn} name={btn} onClick={click}>{btn}</Button>
    )}
     </Panel>
}

export default ElevatorPanel


const Button = styled.button`
 display: block;
 border-radius: 100px; 
  margin: auto;
  width: 3rem;
  height: 3rem;
  transition: transform 3s;
  &:hover {
    background-color: grey;
    color: white; 
  }
  &:active{
    background-color: limegreen;
    color: white; 
  }
`

const FloorDisplay = styled.h1`
  color: green;
  width: 3rem;
  background-color: red;
`

const Panel = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 10rem;
  background-color: #e7e7e7; 
  
  
`