import React from "react"
import { RouteComponentProps } from "react-router-dom"
import 'react-tabs/style/react-tabs.css'
import './treeComparison.css'
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import WikidataTreeQuery from "./wikidataTreeQuery"
import Tree, { Data } from "./Tree"
import Statistics, { QueryOverview, QueryStatus } from "./Statistics"

type State = {
    wikidataQueryOverview: QueryOverview
    dbpediaQueryOverview: QueryOverview

    wikidataTreeData: Data[] | null
    dbpediaTreeData: Data[] | null
}

class TreeComparison extends React.Component<RouteComponentProps<any>, State> {
    wikidataTreeQuery = new WikidataTreeQuery()

    state: State = {
        wikidataQueryOverview: {
            status: QueryStatus.NotStarted,
            nodeCount: null,
            time: null,
            error: null
        },
        dbpediaQueryOverview: {
            status: QueryStatus.NotStarted,
            nodeCount: null,
            time: null,
            error: null
        },
        dbpediaTreeData: null,
        wikidataTreeData: null,
    }

    startComparison = async () => {
        await this.startWikidataQuery();
    }

    startWikidataQuery = async () => {
        this.setState(prev => ({
            wikidataQueryOverview: {
                ...prev.wikidataQueryOverview,
                status: QueryStatus.Running
            }
        }));

        try {
            const startTime = new Date().getTime();
            const wikidataTreeData = await this.wikidataTreeQuery.query(this.props.match.params.wikidataId);
            const endTime = new Date().getTime();

            const time = endTime - startTime;

            this.setState({
                wikidataQueryOverview: {
                    status: QueryStatus.Finished,
                    time,
                    nodeCount: wikidataTreeData.length,
                    error: null
                },
                wikidataTreeData
            });
        } catch (e) {
            this.setState({
                wikidataQueryOverview: {
                    status: QueryStatus.Failed,
                    time: null,
                    nodeCount: null,
                    error: "Error happened while querying data"
                }
            });
        }

    }

    componentDidMount() {
        this.startComparison();
    }

    render() {
        return (
            <Tabs forceRenderTabPanel={true}>
                <TabList>
                    <Tab>Statistics</Tab>
                    <Tab>Wikidata Tree</Tab>
                    <Tab>DBpedia Tree</Tab>
                </TabList>

                <TabPanel>
                    <Statistics
                        wikidataQueryOverview={this.state.wikidataQueryOverview}
                        dbpediaQueryOverview={this.state.dbpediaQueryOverview}
                    />
                </TabPanel>
                <TabPanel>
                    {this.state.wikidataTreeData === null
                        ? <>Loading...</>
                        : <Tree data={this.state.wikidataTreeData} />}
                </TabPanel>
                <TabPanel>
                    DBpedia Tree
                </TabPanel>
            </Tabs>
        )
    }
}

export default TreeComparison