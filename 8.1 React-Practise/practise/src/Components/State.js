import React, { Component } from 'react'

class State extends Component {
    constructor(props)
    {
        super(props);
        this.state = {time: new Date()} ;
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.localTime(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }

    localTime(){
        this.setState({time: new Date()})
    }

    render() {
        return (
            <React.Fragment>
                <h1>Date: {this.state.time.toLocaleDateString()}</h1>
                <h2>Time: {this.state.time.toLocaleTimeString()}</h2>
            </React.Fragment>
        )
    }
}

export default State