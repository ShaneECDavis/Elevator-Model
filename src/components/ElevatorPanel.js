import React,{ useState } from 'react'
import styled from 'styled-components'



 class ElevatorPanelClass {

  constructor(panelArray){ 
   this.panelArray = panelArray  // Current list of floors 
   this.travelTime = 1000 // How long it takes to get inbetween floors
   this.queue = []
   this.directionOfTravel = 0 // -1 down, 1 up, 0 stationary 
   this.btnObj = {}
   this.buildBtnObj(this.panelArray)
   this.currentFloor = ''
 }
  
 // handles when button is pressed
 press = (buttonPressed) =>{
    this.queue.push(buttonPressed)
  //  this.btnObj[buttonPressed] = true
    this.startMotion()
    this.btnObj[buttonPressed] = (!this.btnObj[buttonPressed])
 }

 // starts the evelvators motion 
  startMotion = () => {
   const stopMotion = ()=>{
      clearInterval(inMotion)
    }
      const inMotion = setInterval(() => {
      if (this.queue[0]) {    
        stopMotion()
      }
    }, this.travelTime)
  }
  
  // stops the elevators motion
  stopMotion = () => {
    clearInterval(this.inMotion)
  }
  
  // builds the button object to signal which buttons are actively pressed 
  buildBtnObj = (arr) =>{
    for(let i = 0; i < arr.length; i++){
         this.btnObj[arr[i]] = false
     }
  }
 }

 
 const PanelClass = new ElevatorPanelClass(['B','GL','1','2','3','4','5'])
 
// can inline set props for styled components
 const ElevatorPanel = () => {
  const [displayFloor, setdisplayFloor] = useState(PanelClass.panelArray[1]) // using React 16.7.alpha hooks
  const [btnObj, setBtnObj] = useState({})

  
  
  const click = (event) => {
    PanelClass.press(event.target.name)
    setBtnObj(PanelClass.btnObj)
   setdisplayFloor(PanelClass.queue[0])
    console.log(PanelClass.btnObj)
  }




  return (
    <div>
      <FloorDisplay>{displayFloor}</FloorDisplay>
      <Panel>
        {PanelClass.panelArray.map(btn =>
          <Button key={btn} name={btn} active={btnObj[btn]} onClick={click}>{btn}</Button>
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
  color: ${props => {
    if(props.active) return "white"
    else return "black"  
  }}
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