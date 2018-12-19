import React,{ useState, useEffect, Fragment } from 'react'
import styled, {keyframes, css} from 'styled-components'
import {Switch, Route } from 'react-router'
import {FloorB, FloorGL, Floor2, Floor3, Floor4, Floor5} from './floors'
import history from '../history'




 class ElevatorPanelClass {

  constructor(panelArray){ 
   this.panelArray = panelArray  // Current list of floors being rendered
   this.travelTime = 1000 // How long it takes to get in-between floors
   this.queue = [] // Holds onto buttons that have been pressed
   this.btnObj = {} // Keeps track of when and which lights to light up on panel
   this.buildBtnObj(this.panelArray) // Builds panel
   this.currentFloor = this.panelArray[1] // Sets current floor from the current panel 
   this.inMotion = false; // Keeps track whether or not elevator is in motion
 }
  
 // handles when button is pressed
 press = (buttonPressed, displayFlr, closeDrs) =>{
      
     this.queue.push(buttonPressed)
     if(!this.inMotion){
     setTimeout(() => {
       this.startMotion( displayFlr, closeDrs)
     }, 2000);
    }
     this.btnObj[buttonPressed] = true
     
 }

 // starts the evelvators motion 
  startMotion = (displayFlr, closeDrs) => {
    this.inMotion = true;
    if(this.queue[0]){
    let currentIndex = this.panelArray.indexOf(this.currentFloor)
    let destinationIndex = this.panelArray.indexOf(this.queue.pop())
    let directionOfTravel = currentIndex > destinationIndex ? - 1 : 1
    
    // function to stop when arrived at destination floor 
    const stopMotion = ()=>{
      clearInterval(inMotion)
    } 

    let x = currentIndex; 
    const inMotion = setInterval(() => {      
      if(this.panelArray[destinationIndex] === this.currentFloor){

        stopMotion()

        // continues elevators motion if there is still buttons active
        if(this.queue[0]){
          this.startMotion(displayFlr,closeDrs)
        } else {
          this.inMotion = false
        }

        // closes doors
        closeDrs(true)
        this.btnObj[this.currentFloor] = false
      }  else {
      this.currentFloor = this.panelArray[x] || this.currentFloor

      displayFlr(this.currentFloor)
      x = directionOfTravel > 0  ? x + 1 : x - 1  
    }
    }, this.travelTime)
  }
  }



  // builds the button object to signal which buttons are actively pressed 
  buildBtnObj = (arr) =>{
    for(let i = 0; i < arr.length; i++){
      this.btnObj[arr[i]] = false
    }
  }
}


const PanelClass = new ElevatorPanelClass(['B','GL','2','3','4','5'])



const ElevatorPanel = () => {
  const [displayFloor, setdisplayFloor] = useState(PanelClass.panelArray[1]) // using React 16.7.alpha hooks
  const [btnObj, setBtnObj] = useState({})
  let [closeDoors, setcloseDoors] = useState(false)

  //  uses new hook to perform side effects in function components
  useEffect(()=>{
    document.title = `${PanelClass.currentFloor}`
  })
  
  const onClick = (event) => {
    const target = event.target.name
    
    // Updates rendered panel to current buttons pressed
    setBtnObj(PanelClass.btnObj)
    // Updates display to have correct floor
    setdisplayFloor(PanelClass.currentFloor)
    // Closes door
    setcloseDoors(false)
    // Uses PanelClass method and sends in needed functions and target
    PanelClass.press(target, setdisplayFloor.bind(this), setcloseDoors.bind(this))

    // delays new floor being rendered before doors shut
    setTimeout(() => {
      history.push(`/floor/${target}`)
    }, 3000);
 
  }

  return (
    <Fragment>
      <Elevator>
      <PanelHouse>
      <Display>
       <FloorDisplay>{displayFloor}</FloorDisplay>
      </Display> 
      <Panel>
        {PanelClass.panelArray.map(btn =>
           <Button key={btn} name={btn} active={btnObj[btn]} onClick={onClick}>{btn}</Button>                       
            )}
      </Panel>
     </PanelHouse>
        <Doors >
          {
            (closeDoors) ?
          <LeftDoor/> : <LeftDoorClose />
          }
          <Floors>
          <Switch>             
              <Route exact path={`/floor/B`} component={FloorB} />
              <Route exact path={`/floor/GL`} component={FloorGL} />
              <Route exact path={`/floor/2`} component={Floor2} />
              <Route exact path={`/floor/3`} component={Floor3} />
              <Route exact path={`/floor/4`} component={Floor4} />
              <Route exact path={`/floor/5`} component={Floor5} />            
          </Switch>
          </Floors>
          {
            (closeDoors) ?
          <RightDoor/> : <RightDoorClose />
          }
        </Doors>
     </Elevator>
    </Fragment>
  )
}



export default ElevatorPanel






// Styled components 

const right = keyframes`
 0%{
   box-shadow:  -20px 0px 300px 1px rgba( 0,0,0, .3) inset;
 }
  10%{
    transform:  scaleX(1);
  }
  100% {
    transform: translateX(13rem) scaleX(0.15);
     box-shadow:  -20px 0px 20px 1px rgba( 0,0,0, .5) inset;
  }
`
// make left if empy or filled based on props......  
const left = keyframes`
 0%{
    box-shadow:  20px 0px 300px 1px rgba( 0,0,0, .3) inset;
 }
  10%{
    transform:  scaleX(1);
  }
  100% {
    transform: translateX(-13rem) scaleX(0.15);
    box-shadow:  20px 0px 20px 1px rgba( 0,0,0, .5) inset;
  }
`

const Floors = styled.div`
    position: absolute; 
    z-index: -4;
    width: 100%;
    height: 100%;
`

const Doors = styled.div`
    position: relative; 
    width: 60rem;
    height: 100%;
    z-index: 2;
    background-color: #000;
    display:flex;
   
`

const LeftDoor = styled.div`
    background-color: #b3b4bf;
    width: 50%;
    border-right: 1px solid #7f7f7f;
    animation: ${left} 3s forwards; 
   
   
`
const LeftDoorClose = styled(LeftDoor)`
    animation-direction: reverse;
`

const RightDoor = styled.div`
    background-color: #b3b4bf;
    width: 50%;
    border-left: 1px solid #7f7f7f;
    animation: ${right} 3s forwards;  
`

const RightDoorClose = styled(RightDoor)`
  animation-direction: reverse; 
`

const PanelHouse = styled.div`
  width: 10rem; 
  background-color: #e7e7e7; 
  margin: 10rem 2rem;
  border-radius: 3px;
   box-shadow: .5px .5px .5px .5px rgba( 0,0,0, .3);
`

const Display = styled.div`
  display: inline-block;
  margin: 0 auto;
`

const Elevator = styled.div`
  display: flex;
  background-color: #454e8e;
  width: 80rem;
  height: 60rem;
  z-index: 2;
`


const Button = styled.button`
 display: block;
 margin:  .25rem auto;
 border-radius: 100px; 
  width: 4rem;
  height: 4rem;
  transition: all .2s;
  box-shadow: ${props => { 
    if (props.active) return ".5px .5px .5px .5px rgba( 141,224,164, .2)" 
    else return "1px 1px (0,0,0, .2)"
    }};
  color: ${props => {
    if(props.active) return "white"
    else return "black"  
  }};
  background-color: ${props => {
    if (props.active) {
      return "rgba( 141,224,164, .7)"
    } else {
      return "rgba(80,80,80, .2)"
    }
  }};
  &:hover {
    background-color: grey;
    color: white; 
  }
  &:active{
    background-color: rgb(141,224,164);
    color: white; 
    box-shadow:  3px 2px 3px 2px rgba( 0,0,0, .2) inset;
  }
`

const FloorDisplay = styled.h1`
  color: rgb( 0,0,0,.4);
  box-shadow: 3px 3px 1px #555 inset; 
  background-color: rgb( 0,0,0, .5);
  border-radius: 3px;
  width: 8rem;
  margin: 1rem;
  padding: .2rem;
`

const Panel = styled.div`
  height: 31rem;
  display: flex;
  flex-direction: column-reverse;
`

