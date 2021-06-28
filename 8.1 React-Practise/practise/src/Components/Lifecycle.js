import React, { Component } from 'react'

export default class Lifecycle extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cycle:'A'
        }
        console.log('constructor');
    }

    static getDerivedStateFromProps(props,state){
        console.log('getDerivedStateFromProps');
        return null;
    }

    componentDidMount() {
        console.log('componentDidMount');
    }
    
    render() {
        console.log('render');
        return (
            <div>

            </div>
        )
    }
}
