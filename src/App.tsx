import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "./index.css";

type State = {
    value: string,
    error: string | null
}

class App extends React.Component<RouteComponentProps<any>, State> {

    constructor(props) {
        super(props);
        this.state = { value: "", error: null }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value, error: null })
    }

    async handleSubmit(event) {
        const wikiIdUri = this.state.value.split('wiki/')?.[1]?.split('?')?.[0]?.split('/')?.[0];
        if (wikiIdUri === undefined)
            return this.setState({ error: 'Wrong URL entered! Try https://en.wikipedia.org/wiki/Elizabeth_II' })

        const wikiId = decodeURI(wikiIdUri);

        const url = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageprops&ppprop=wikibase_item&redirects=1&titles=";

        try {
            const body = await fetch(url + wikiId)
            const result = await body.json()

            const pages = result.query.pages
            const firstKey = Object.keys(pages)[0]

            if (firstKey === '-1')
                return this.setState({ error: `There's no data about this item in knowledge bases` })

            const wikiDataId = pages[firstKey].pageprops.wikibase_item

            this.props.history.push(`/tree-comparison/${wikiDataId}/${wikiId}`)
        } catch (e) {
            return this.setState({ error: 'Error happend while retrieval of this item' })
        }
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
                {this.state.error !== undefined
                    ? <p className="error">{this.state.error}</p>
                    : null
                }
            </div>
        )
    }
}

export default App