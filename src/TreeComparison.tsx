import React from "react"
import { RouteComponentProps } from "react-router-dom"
import 'react-tabs/style/react-tabs.css'
import './treeComparison.css'
import WikidataTree from "./WikidataTree"
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"

class TreeComparison extends React.Component<RouteComponentProps<any>> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Statistics</Tab>
                    <Tab>Wikidata Tree</Tab>
                    <Tab>DBPedia Tree</Tab>
                </TabList>

                <TabPanel>
                    Statistics
                </TabPanel>
                <TabPanel>
                    <WikidataTree wikidataId={this.props.match.params.wikidataId} />
                </TabPanel>
                <TabPanel>
                    DBPedia Tree
                </TabPanel>
            </Tabs>
        )
    }
}

export default TreeComparison