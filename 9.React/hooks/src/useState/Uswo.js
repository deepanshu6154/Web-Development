import React, {useState} from 'react'

function Uswo() {

    const [msgObj, setMsgObj] = useState({message:'',id:1});
    let handleChange = (e)=>{
        console.log(msgObj);
        let obj = {...msgObj,message:e.target.value} ; //shallow copy
        setMsgObj(obj);
    }
    return (
        <div>
            <input value={msgObj.message}placeholder='Type here' onChange={handleChange} type='text'></input>
            <p>{msgObj.message}</p>
        </div>
    )
}

export default Uswo