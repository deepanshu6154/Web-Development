import React, { Component } from 'react'


class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            flag:true
        }
    }

    handleClick = ()=>{
        this.setState({flag:!this.state.flag})
    }

    render() {
        let value ;
        if(this.state.flag==true)
        {
            value = 'Hello world' ;
        }
        else
        {
            value = 'Welcome Deepu Bhai!' ;
        }
        return (
            <React.Fragment>
                <h1>{value}</h1>
                <button type='submit' onClick={this.handleClick}>Submit</button>
            </React.Fragment>
        )
    }
}

export default List;