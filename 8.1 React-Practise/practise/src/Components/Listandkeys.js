import React from 'react'

function Listandkeys(props) {

    let numbers = props.numArr;

    let liItems = numbers.map((num)=>
        <li key={num.toString()}>{num}</li>
    )
    return (
        <React.Fragment>
            <ul>{liItems}</ul>
        </React.Fragment>
    )
}

export default Listandkeys