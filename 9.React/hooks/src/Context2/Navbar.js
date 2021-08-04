import React,{useState,useContext} from 'react'
import ThemeContext from './ThemeContext'

function Navbar() {

    let value = useContext(ThemeContext) ;
    let navStyle = {
        height: '30vh',
        width: '90vw',
        backgroundColor: 'black',
        margin: '0 auto' ,
        marginTop : '5%' 
    }

    let pStyle = {
        color:'white'
    }
    console.log("Navbar rendering");
    return (
        <div className='navbar' style={navStyle}>
            <h2 style={pStyle}>Navbar</h2>
        </div>
    )
}

export default Navbar
