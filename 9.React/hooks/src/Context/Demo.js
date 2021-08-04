import React,{useContext} from 'react'
import MyContext from './Context'


function Demo() {
    console.log('Demo Render');
    let val = useContext(MyContext);
    return (
        <div>
            
        </div>
    )
}

export default Demo
