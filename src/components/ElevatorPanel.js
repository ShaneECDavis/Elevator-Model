import React,{ useState } from 'react'
import styled from 'styled-components'



 class ElevatorPanelClass {

  constructor(panelArray){ 
   this.panelArray = panelArray  // Current list of floors 
   this.travelTime = 1000 // How long it takes to get inbetween floors
   this.queue = []
   this.directionOfTravel = 0 // -1 down, 1 up, 0 stationary 
   this.inMotion = ()=>{}
   this.btnObj = {}
   this.buildBtnObj(this.panelArray)
   this.currentFloor = ''
 }
  
 // handles when button is pressed
 press = (buttonPressd) =>{

 }

 // starts the evelvators motion 
  startMotion = () => {
  //  this.btnObj[event.target.name] = (!this.btnObj[event.target.name])
      this.inMotion = setInterval(() => {
      if (this.queue[0]) {
        console.log('stop', this.queue)
        this.stopMotion()
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



// can inline set props for styled components
const ElevatorPanel = () => {
  const PanelClass = new ElevatorPanelClass(['B','GL','1','2','3','4','5'])
  const [displayFloor, setdisplayFloor] = useState(PanelClass.panelArray[1]) // using React 16.7.alpha hooks displays current floor 
  const [btnObj, setBtnObj] = useState({})

  
  
  const click = (event) => {
    
    PanelClass.press(event.target.name)
    console.log(PanelClass.btnObj)
    setBtnObj(PanelClass.btnObj)
    PanelClass.queue.push(event.target.name)
    PanelClass.startMotion()
 
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