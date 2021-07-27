import React , {useState} from 'react'

function Q1() {

    let [obj,setObj] = useState({name:'',age:0});

    let handleName = (e)=>{
        let newObj = {...obj,name:e.target.value};
        setObj(newObj);
    }
    let handleAge = (e)=>{
        let newObj = {...obj,age:e.target.value};
        setObj(newObj);
    }
    return (
        <div>
            <form>
                <input type='text' value={obj.name} onChange={handleName}></input>
                <input value={obj.age} type='text' onChange={handleAge}></input>
            </form>
        </div>
    )
}

export default Q1
