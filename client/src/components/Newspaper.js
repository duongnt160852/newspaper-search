import React, { Component } from "react"
import { Link } from "react-router-dom"

class Newspaper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ borderTop: "1px solid #eee" }}>
                <h4>
                    <Link to={`/newspaper/${this.props.id}`}>
                        {
                            this.props.title
                        }
                    </Link>
                </h4>
                <div>
                    {
                        this.props.description
                    }
                </div>
            </div>
        )
    }
}

export default Newspaper