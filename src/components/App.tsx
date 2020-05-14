import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "../index.css";

type State = {
    value: string,
    comparisonType: 'tree' | 'filmography'
    error: string | null
}

class App extends React.Component<RouteComponentProps<any>, State> {

    constructor(props) {
        super(props);
        this.state = { value: "", error: null, comparisonType: 'tree' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value, error: null })
    }

    async handleSubmit() {
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

            return this.props.history.push(`/${this.getCurrentUrl()}/${wikiDataId}/${wikiId}`);
        } catch (e) {
            return this.setState({ error: 'Error happend while retrieval of this item' })
        }
    }

    handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ comparisonType: event.target.value as any })
    }

    getCurrentUrl = () => {
        switch (this.state.comparisonType) {
            case 'tree':
                return 'tree-comparison'
            case 'filmography':
                return 'filmography-comparison'
            default: throw Error('Wrong comparison type')
        }
    }

    render() {
        return (
            <div className="container">
                <h2>The comparison of Wikidata and DBpedia knowledge bases</h2> <br />
                <p>Enter the link to the person's page on Wikipedia to build a family tree of his descendants or check his filmography</p> <br />
                <div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={(event) => {
                        if (event.keyCode === 13) return this.handleSubmit()
                    }} style={{ width: "500px" }} />
                    <button onClick={this.handleSubmit}>View</button>
                </div>
                {this.state.error !== undefined
                    ? <p className="error">{this.state.error}</p>
                    : null
                }
                <div className="checkbox-group">
                    <label>
                        <input
                            type="radio"
                            name="comparison-type"
                            value="tree"
                            checked={this.state.comparisonType === 'tree'}
                            onChange={this.handleTypeChange}
                        />
                        Compare family trees
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="comparison-type"
                            value="filmography"
                            checked={this.state.comparisonType === 'filmography'}
                            onChange={this.handleTypeChange}
                        />
                        Compare filmography
                    </label>
                </div>
                <p style={{ marginBottom: 0 }}>Or try this examples:</p>
                <ul>
                    <li><Link to={`/${this.getCurrentUrl()}/Q318263/Michael_Redgrave`}>Michael Redgrave</Link> (https://en.wikipedia.org/wiki/Michael_Redgrave)</li>
                    <li><Link to={`/${this.getCurrentUrl()}/Q882/Charlie_Chaplin`}>Charlie Chaplin</Link> (https://en.wikipedia.org/wiki/Charlie_Chaplin)</li>
                    <li><Link to={`/${this.getCurrentUrl()}/Q9960/Ronald_Reagan`}>Ronald Reagan</Link> (https://en.wikipedia.org/wiki/Ronald_Reagan)</li>
                </ul>
            </div>
        )
    }
}

export default App