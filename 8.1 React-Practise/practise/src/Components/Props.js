
import React, { Component } from 'react'

//  function Props(props) {
//     return (
//         <React.Fragment>
//             <h1>Hi, I am {props.name} working in {props.company} from {props.city}</h1>
//         </React.Fragment>
//     )
// }


class Props extends Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>Hi, I am {this.props.name} working in {this.props.company} from {this.props.city}</h1>
            </div>
        )
    }
}


export default Props