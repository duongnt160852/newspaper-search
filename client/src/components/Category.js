import React, { Component } from "react"

const category = [
    "đời sống",
    "du lịch",
    "giải trí",
    "giáo dục",
    "khoa học",
    "kinh doanh",
    "pháp luật",
    "số hóa",
    "sức khỏe",
    "thế giới",
    "thể thao",
    "thời sự"
]

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "đời sống": false,
            "du lịch": false,
            "giải trí": false,
            "giáo dục": false,
            "khoa học": false,
            "kinh doanh": false,
            "pháp luật": false,
            "số hóa": false,
            "sức khỏe": false,
            "thế giới": false,
            "thể thao": false,
            "thời sự": false,
        }
    }
    
    render() {
        return (
            <div className="col-md-3">
                <div className="panel-group" id="list_category">
                    {
                        category.map((item, idx) =>
                            <div className="panel panel-primary" style={{ borderColor: "#90c95a" }}>
                                <div className="panel-heading" style={{ backgroundColor: "#90c95a", borderColor: "#90c95a" }}>
                                    <h4 className="panel-title">
                                        <input type="checkbox" id={ idx } className="category" style={inputStyle} value={item} onChange={(e)=>{
                                            let temp = this.state
                                            temp[item] = e.target.checked
                                            this.setState(temp,()=>this.props.getCategory(temp))
                                        }} />
                                        <label htmlFor={ idx } style={labelStyle}>{item}</label>
                                    </h4>
                                </div>
                            </div>
                        )

                    }
                </div>
            </div>
        )
    }
}

const inputStyle = {
    float: "left",
    clear: "none",
    height: 20,
    margin: 0,
    cursor: "pointer"
}

const labelStyle = {
    clear: "none",
    display: "block",
    height: 20,
    cursor: "pointer"
}

export default Category