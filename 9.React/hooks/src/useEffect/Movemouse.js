import React , {useState,useEffect} from 'react'

function Movemouse() {

    let [x,setX] = useState(0);
    let [y,setY] = useState(0);

    let mousePosition = (e)=>{
        setX(e.clientX);
        setY(e.clientY);
        console.log('Mouse event', e);
    }
    useEffect(()=>{
        window.addEventListener('mousemove',mousePosition) ;
    })
    return (
        <div >
            <h1>MouseX- {x}  MouseY- {y}</h1>
        </div>
    )
}

export default Movemouse
