// ComponentDidMount ComponentDidUpdate, ComponentWillUnmount
// useEffect provides the above functionality in functional Components

// useEffect(()=>{
    //  execute your functionality whatever it is
// },optional dependency array)

//  3 variation 

// 1 variation (componentDidMount + componentDidUpdate)

import React,{ useEffect,useState} from 'react'

function Us1() {

    let [count,setCount] = useState(0);
    console.log('render');
    useEffect(()=>{
        console.log('useEffect');
        document.title = `React ${count}` ;
    })
    return (
        <div>
            <p>
                You clicked {count} times !
            </p>
            <button onClick={()=>{setCount(count+1)}}>Click</button>
        </div>
    )
}

export default Us1
