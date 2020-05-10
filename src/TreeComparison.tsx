import React from "react"
import { RouteComponentProps } from "react-router-dom"
import WikidataTree from "./WikidataTree"

class TreeComparison extends React.Component<RouteComponentProps<any>> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <WikidataTree wikidataId={this.props.match.params.wikidataId} />
        )
    }
}

export default TreeComparison