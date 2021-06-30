import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <div>
                <div className="navbar-nav">
                        <ul className='list'>
                            <Link to='/'>
                                <li >Home</li>
                            </Link>
                            <Link to='/about'>
                                <li >About</li>
                            </Link>
                            <Link to='/movie'>
                                <li >Movies</li>
                            </Link>
                        </ul>
                </div>
            </div>
        )
    }
}
export default Navbar