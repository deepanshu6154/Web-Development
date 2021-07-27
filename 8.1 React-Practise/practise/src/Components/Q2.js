import React,{useState,useEffect} from 'react'

function Q2() {

    let [count,setCount] = useState(0);
    return (
        <div>
            <button onClick={()=>{setCount(count+1)}} >Count:{count}</button>
        </div>
    )
}

export default Q2
