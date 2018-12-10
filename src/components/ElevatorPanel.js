import React,{ useState } from 'react'
import styled from 'styled-components'

// need to make a stateful component 





// can inline set props for styled components
const ElevatorPanel = (props) => {

  const buttonsArray = ['B', 'GL', '2', '3', '4', '5'] // Current list of floors 
  const travelTime = 1000; // How long it takes to get inbetween floors
  const queue = []; // Stores buttons that have been pressed
  const [floor, setFloor] = useState('GL') // using React 16.7.alpha hooks

  const click = (event) => {
    setFloor(event.target.name)
  }


  return (
    <div>
      <FloorDisplay>{floor}</FloorDisplay>
      <Panel>
        {buttonsArray.map(btn =>
          <Button key={btn} name={btn} active={false} onClick={click}>{btn}</Button>
        )}
      </Panel>
    </div>
  )


  
}

export default ElevatorPanel


const Button = styled.button`
 display: block;
 margin:  .25rem auto;
 border-radius: 100px; 
  width: 3rem;
  height: 3rem;
  transition: transform 3s;
  background-color: ${props => {
    if (props.active) {
      return "limegreen"
    }
  }};
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