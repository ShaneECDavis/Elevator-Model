import React, { Fragment } from 'react'
import styled, { keyframes, css } from 'styled-components'


const FloorGL = () => {
  return ( <FloorGLdiv>Floor GL </FloorGLdiv>)
}

export default FloorGL;


const FloorGLdiv = styled.div`
  background-image: url("/img/floorGL.jpg");
  width: 100%;
  height: 100%;
  background-size: cover; 
  background-position: center; 
  
`