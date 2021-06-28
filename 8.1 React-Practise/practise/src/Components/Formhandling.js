import React, { Component } from 'react'

class Formhandling extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             text:''
        }
    }
    
    handleInput=(e)=>{
        this.setState({username:e.target.value})
    }
    handleText=(e)=>{
        this.setState({ text:e.target.value})
    }
    handleSubmit=(e)=>{
        alert(`${this.state.username} ${this.state.text}`);
        e.preventDefault();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input value={this.state.username} onChange={this.handleInput}></input>
                    </div>
                    <div>
                        <label>Text Area</label>
                        <textarea value={this.state.text} onChange={this.handleText}></textarea>
                    </div>
                    <div>
                        <button type='submit' >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Formhandling