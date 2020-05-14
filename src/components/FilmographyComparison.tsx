import React from "react"
import { RouteComponentProps } from "react-router-dom"
import 'react-tabs/style/react-tabs.css'
import '../filmComparison.css'
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import WikidataFilmQuery from "../queries/wikidataFilmQuery"
import DBpediaFilmQuery from "../queries/dbpediaFilmQuery"
import Filmography, { FilmographyData } from "./Filmography"
import Statistics, { QueryOverview, QueryStatus } from "./Statistics"

type State = {
    wikidataQueryOverview: QueryOverview
    dbpediaQueryOverview: QueryOverview

    wikidataFilmData: FilmographyData[] | null
    dbpediaFilmData: FilmographyData[] | null
}

class FilmographyComparison extends React.Component<RouteComponentProps<any>, State> {
    wikidataFilmQuery = new WikidataFilmQuery()
    dbpediaFilmQuery = new DBpediaFilmQuery()

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
        dbpediaFilmData: null,
        wikidataFilmData: null,
    }

    startComparison = async () => {
        await this.startWikidataQuery();
        await this.startDbPediaQuery();
    }

    startDbPediaQuery = async () => {
        this.setState(prev => ({
            dbpediaQueryOverview: {
                ...prev.dbpediaQueryOverview,
                status: QueryStatus.Running
            }
        }));

        const dbpediaUrlId = 'http://dbpedia.org/resource/' + this.props.match.params.wikiId

        try {
            const startTime = new Date().getTime();
            const dbpediaFilmData = await this.dbpediaFilmQuery.query(dbpediaUrlId);
            const endTime = new Date().getTime();

            const time = endTime - startTime;

            console.log(dbpediaFilmData)

            this.setState({
                dbpediaQueryOverview: {
                    status: QueryStatus.Finished,
                    time,
                    nodeCount: dbpediaFilmData.length,
                    error: null
                },
                dbpediaFilmData
            });
        } catch (e) {
            this.setState({
                dbpediaQueryOverview: {
                    status: QueryStatus.Failed,
                    time: null,
                    nodeCount: null,
                    error: "Error happened while querying data"
                }
            });
        }
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
            const wikidataFilmData = await this.wikidataFilmQuery.query(this.props.match.params.wikidataId);
            const endTime = new Date().getTime();

            console.log(wikidataFilmData)

            const time = endTime - startTime;

            this.setState({
                wikidataQueryOverview: {
                    status: QueryStatus.Finished,
                    time,
                    nodeCount: wikidataFilmData.length,
                    error: null
                },
                wikidataFilmData
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
                    <Tab>Wikidata Filmography</Tab>
                    <Tab>DBpedia Filmography</Tab>
                </TabList>

                <TabPanel>
                    <Statistics
                        wikidataQueryOverview={this.state.wikidataQueryOverview}
                        dbpediaQueryOverview={this.state.dbpediaQueryOverview}
                    />
                </TabPanel>
                <TabPanel>
                    {this.state.wikidataFilmData === null
                        ? <>Loading...</>
                        : <Filmography data={this.state.wikidataFilmData} type='wikidata' />}
                </TabPanel>
                <TabPanel>
                    {this.state.dbpediaFilmData === null
                        ? <>Loading...</>
                        : <Filmography data={this.state.dbpediaFilmData} type='dbpedia' />}
                </TabPanel>
            </Tabs>
        )
    }
}

export default FilmographyComparison