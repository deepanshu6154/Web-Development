// If we put [] as an arguement in useEffect will behave as ComponentDidMount 

import React ,{useEffect,useState} from 'react'

function Us2() {

    let [count,setCount] = useState(0);
    console.log('render');
    useEffect(()=>{
        console.log('useEffect');
        document.title = `React ${count}` ;
    },[])
    return (
        <div>
            <p>Yout clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>Increment</button>
            <button onClick={()=>{setCount(count-1)}}>Decrement</button>

        </div>
    )
}

export default Us2
