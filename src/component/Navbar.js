import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Redirect } from 'react-router'
import axios from 'axios'

class Navbar extends Component {
    constructor()
    {
        super()
        this.state={
            redirecthome:false
        }
    }

    Turnoff=async()=>{
        console.log('turn off')
        this.setState({redirecthome:true})
        await axios.get('http://www.localhost:8080/stop')
    }
    render() {
        if(this.state.redirecthome)
        {
            return <Redirect to='/'/>
        }
        return (
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1">TwitIT</span>
                <button className='btn btn-primary' onClick={this.Turnoff}><i class="fa fa-power-off" aria-hidden="true"></i></button>
            </nav>
        )
    }
}

export default Navbar
