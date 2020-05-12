import React from 'react'
import './index.css'
import SPARQLQueryDispatcher from './query-dispatcher'
import Tree, { Data } from './Tree'
//import { data } from "./data"

const mapQuery = (data): Data[] => {
    return data
        .map((x: any) => ({
            id: x.descendant.value,
            name: x.descendantLabel.value,
            birth: x.birthYear.value,
            death: x.deathYear.value,
            picture: x.image.value,
            parent: x.personId.value
        }));
}

const mapRootQuery = (data): Data[] => {
    return data
        .map((x: any) => ({
            id: x.person.value,
            name: x.personLabel.value,
            birth: x.birth.value,
            death: x.death.value,
            picture: x.pic.value,
            parent: ""
        }));
}

type Props = {
    wikidataId: string
}

type State = {
    data: Data[] | null
}

class WikidataTree extends React.Component<Props, State> {
    endpointUrl = 'https://query.wikidata.org/sparql';
    rootSparqlQuery = `SELECT DISTINCT ?person ?personLabel ?birth ?death ?pic WHERE {
        BIND (wd:${this.props.wikidataId} as ?person) .
        OPTIONAL {?person wdt:P18 ?picture . }
        OPTIONAL {?person wdt:P569 ?dob . }
        OPTIONAL {?person wdt:P570 ?dod . }
        BIND(YEAR(?dob) as ?yob) .
        BIND(YEAR(?dod) as ?yod) .
        BIND(COALESCE(?picture, "") as ?pic) .
        BIND(COALESCE(?yob, "") as ?birth) .
        BIND(COALESCE(?yod, "") as ?death) .
              SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        } LIMIT 1`
    sparqlQuery = `SELECT ?descendant ?descendantLabel (SAMPLE(?person) AS ?personId) (SAMPLE(?birth) AS ?birthYear) (SAMPLE(?death) AS ?deathYear) (SAMPLE(?pic) AS ?image) WHERE {
        wd:${this.props.wikidataId} wdt:P40* ?person .
        ?person wdt:P40 ?descendant .
  OPTIONAL { ?descendant wdt:P18 ?picture . }
  OPTIONAL {?descendant wdt:P569 ?dob . }
  OPTIONAL {?descendant wdt:P570 ?dod . }
  BIND(YEAR(?dob) as ?yob) .
  BIND(YEAR(?dod) as ?yod) .
  BIND(COALESCE(?picture, "") as ?pic) .
  BIND(COALESCE(?yob, "") as ?birth) .
  BIND(COALESCE(?yod, "") as ?death) .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      } GROUP BY ?descendant ?descendantLabel`;
    queryDispatcher = new SPARQLQueryDispatcher(this.endpointUrl);

    constructor(props: Props) {
        super(props);
        this.state = {
            data: null
        };
        this.query()
    }

    query = async () => {
        const query1 = await this.queryDispatcher.query(this.sparqlQuery)
        const queryRoot = await this.queryDispatcher.query(this.rootSparqlQuery)
        console.log(queryRoot)

        const queryData = mapQuery(query1.results.bindings)
        const rootQueryData = mapRootQuery(queryRoot.results.bindings)

        this.setState({ data: [...queryData, ...rootQueryData] })
    }

    render() {
        if (this.state.data === null)
            return (
                <>
                    Loading...
                </>
            )

        return <Tree data={this.state.data} />
    }
}

export default WikidataTree