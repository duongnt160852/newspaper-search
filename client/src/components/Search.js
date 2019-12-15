import React, { Component } from "react"
import Newspaper from "../components/Newspaper"
import axios from "axios"
import "./Search.css"
import Spinner from 'react-bootstrap/Spinner'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            pager: {
                currentPage: 1
            },
            pageOfItems: [],
            currentPage: 1,
            isLoading: false
        };
        this.loadPage = this.loadPage.bind(this)
    }

    componentDidMount() {
        this.loadPage(this.state.currentPage);
    }

    loadPage = async (page, query = "") => {
        this.setState({ isLoading: true })
        const res = (await axios.post(`http://localhost:4000/search`,
            {
                page,
                query,
                category: this.props.category
            }
        )).data
        const { pager, pageOfItems } = res
        this.setState({ pager, pageOfItems, isLoading: false }, () => console.log(this.state))
    }

    render() {
        const { content, pager, pageOfItems, isLoading } = this.state;
        return (
            <div className="col-md-9">
                <form autocomplete="off" style={{ marginBottom: 10 }}>
                    <div className="autocomplete" style={{ width: 800 }}>
                        <input type="text" placeholder="Tìm kiếm" value={content} onChange={(e) => this.setState({ content: e.target.value })} />
                    </div>
                    <p className="btn btn-primary" onClick={() => this.loadPage(1, content)} style={{ marginTop: 10 }}>Tìm kiếm</p>
                </form>
                <div style={{ width: 500, textAlign: "left", margin: "auto" }}>
                    {isLoading
                        ? <Spinner animation="border" variant="primary" />
                        : pageOfItems.map(item =>
                            <Newspaper
                                title={item._source.title}
                                description={item._source.description}
                                id={item._id}
                            />
                        )}
                    <div>
                        {!isLoading && pager.pages && pager.pages.length &&
                            <ul className="pagination">
                                <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`} onClick={() => this.loadPage(1, content)}>
                                    <a>First</a>
                                </li>
                                <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`} onClick={() => this.loadPage(pager.currentPage - 1, content)}>
                                    <a>Previous</a>
                                </li>
                                {pager.pages.map(page =>
                                    <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`} onClick={() => this.loadPage(page, content)}>
                                        <a>{page}</a>
                                    </li>
                                )}
                                <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} onClick={() => this.loadPage(pager.currentPage + 1, content)}>
                                    <a>Next</a>
                                </li>
                                <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} onClick={() => this.loadPage(pager.totalPages, content)}>
                                    <a>Last</a>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Search