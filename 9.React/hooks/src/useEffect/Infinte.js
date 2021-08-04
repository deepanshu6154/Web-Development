import React,{useState,useEffect} from 'react'


function Infinte() {

    let [num,setNum] = useState(0);
    useEffect(()=>{
        console.log('useEffect');
        let num = Math.random()*100;
        setNum(num);
    },[])
    return (
        <div>
            <button onClick={()=>{setNum(num+1)}}>Click</button>
        </div>
    )
}

export default Infinte
