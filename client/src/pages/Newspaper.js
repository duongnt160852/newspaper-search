import React, { Component } from "react"
import Header from "../components/Header"
import axios from "axios"

class Newspaper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            content: ""
        }
    }

    async componentDidMount(){
        const id = this.props.match.params.id
        const res = (await axios.post(`http://localhost:4000/newspaper`,
            {
                id
            }
        )).data
        this.setState({
            title: res._source.title,
            description: res._source.description,
            content: res._source.content
        })
    }

    render() {
        const { title, description, content } = this.state
        return (
            <div className="container" >
                <Header />
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3" style={{ textAlign: "left", lineHeight: 2.0, fontSize: 15 }}>
                        <h2>
                            {title}
                        </h2>
                        <h3>
                            {description}
                        </h3>
                        <div>
                            { content }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newspaper