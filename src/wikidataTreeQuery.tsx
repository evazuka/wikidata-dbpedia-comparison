import SPARQLQueryDispatcher from './query-dispatcher'
import { Data } from './Tree'

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

class WikidataTreeQuery {
    private endpointUrl = 'https://query.wikidata.org/sparql';
    private rootSparqlQuery = (wikidataId: string) => `SELECT DISTINCT ?person ?personLabel ?birth ?death ?pic WHERE {
        BIND (wd:${wikidataId} as ?person) .
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
    private sparqlQuery = (wikidataId: string) => `SELECT ?descendant ?descendantLabel (SAMPLE(?person) AS ?personId) (SAMPLE(?birth) AS ?birthYear) (SAMPLE(?death) AS ?deathYear) (SAMPLE(?pic) AS ?image) WHERE {
        wd:${wikidataId} wdt:P40* ?person .
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

    private queryDispatcher = new SPARQLQueryDispatcher(this.endpointUrl);

    query = async (wikidataId: string) => {
        const query = await this.queryDispatcher.query(this.sparqlQuery(wikidataId))
        const queryRoot = await this.queryDispatcher.query(this.rootSparqlQuery(wikidataId))

        const queryData = mapQuery(query.results.bindings)
        const rootQueryData = mapRootQuery(queryRoot.results.bindings)

        return [...queryData, ...rootQueryData]
    }
}

export default WikidataTreeQuery