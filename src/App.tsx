import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./index.css";

type State = {
    value: string
}

class App extends React.Component<RouteComponentProps<any>, State> {

    constructor(props) {
        super(props);
        this.state = { value: "" }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    async handleSubmit(event) {
        const wikiId = decodeURI(this.state.value.split('wiki/')[1].split('?')[0].split('/')[0]);

        const url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&titles=";
        const body = await fetch(url + wikiId)
        const result = await body.json()

        const pages = result.query.pages
        const firstKey = Object.keys(pages)[0]
        const wikiDataId = pages[firstKey].pageprops.wikibase_item

        this.props.history.push(`/tree-comparison/${wikiDataId}/${wikiId}`)
    }

    render() {
        return (
            <div className="container">
                <h2>The comparison of Wikidata and DBpedia knowledge bases</h2> <br />
                <p>Enter the link to the person's page on Wikipedia to build a family tree of his descendants</p> <br />
                <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} style={{ width: "500px" }} />
                <button onClick={this.handleSubmit}>View</button>
                </div>
            </div>
        )
    }
}

export default App