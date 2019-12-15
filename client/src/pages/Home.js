import React, { Component, Fragment } from "react"
import Header from "../components/Header"
import Body from "../components/Body"

class Home extends Component{
    render(){
        return(
            <div className="container">
                <Header />
                <Body />
            </div>
        )
    }
}

export default Home