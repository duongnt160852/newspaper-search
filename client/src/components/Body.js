import React, { Component } from "react"
import Category from "../components/Category"
import Search from "../components/Search"

class Body extends Component{
    constructor(props){
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

    getCategory = (category) => {
        this.setState(category)
    }

    render(){
        return(
            <div className="row" style={{marginTop:20}}>
                <Category getCategory={this.getCategory} />
                <Search category={this.state} />
            </div>
        )
    }
}

export default Body