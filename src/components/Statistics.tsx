import React from "react"
import { RouteComponentProps } from "react-router-dom"

export enum QueryStatus {
    NotStarted,
    Running,
    Finished,
    Failed
}

export type QueryOverview = {
    status: QueryStatus,
    time: number | null,
    nodeCount: number | null,
    error: string | null,
}

type Props = {
    wikidataQueryOverview: QueryOverview
    dbpediaQueryOverview: QueryOverview
}

const OverviewComponent: React.FC<{ overview: QueryOverview }> = ({ overview }) => (
    <>
        <p><strong>Status:</strong> {QueryStatus[overview.status]}</p>
        {overview.time !== null
            ? <p><strong>Time:</strong> {overview.time} ms</p>
            : null}
        {overview.nodeCount !== null
            ? <p><strong>Node count:</strong> {overview.nodeCount}</p>
            : null}

        {overview.error !== null
            ? <p><strong>Error:</strong> {overview.error}</p>
            : null}
    </>)

class Statistics extends React.Component<Props> {
    render() {
        const { wikidataQueryOverview, dbpediaQueryOverview } = this.props
        return (
            <div>
                <h3>Wikidata Query Overview</h3>
                <OverviewComponent overview={wikidataQueryOverview} />

                <hr />

                <h3>DBpedia Query Overview</h3>
                <OverviewComponent overview={dbpediaQueryOverview} />

            </div>
        )
    }
}

export default Statistics