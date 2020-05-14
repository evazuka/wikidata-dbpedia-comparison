import SPARQLQueryDispatcher from '../query-dispatcher'
import { TreeData } from '../components/Tree'

const mapQuery = (data): TreeData[] => {
    return data
        .map((x: any) => ({
            id: x.descendant.value,
            name: x.label.value,
            birth: x.yob.value,
            death: x.yod.value,
            picture: x.pic.value,
            parent: x.person.value
        }));
}

const mapRootQuery = (data): TreeData[] => {
    return data
        .map((x: any) => ({
            id: x.person.value,
            name: x.label.value,
            birth: x.yob.value,
            death: x.yod.value,
            picture: x.pic.value,
            parent: ""
        }));
}

class DBpediaTreeQuery {
    private endpointUrl = 'https://dbpedia.org/sparql';
    private rootSparqlQuery = (dbpediaId: string) => `PREFIX dbo: <http://dbpedia.org/ontology/> 
    SELECT DISTINCT ?person ?pic ?label ?yob ?yod 
    WHERE {
         BIND(<${dbpediaId}> as ?person)
         ?person rdfs:label ?label .
         OPTIONAL { ?person  dbo:birthDate ?dob} 
         OPTIONAL { ?person  dbo:deathDate ?dod}
         OPTIONAL { ?person dbo:thumbnail ?thumbnail} 
         BIND(IF(bound(?dob),
         YEAR(xsd:dateTime(?dob)),
         "") as ?yob)
         BIND(IF(bound(?dod),
         YEAR(xsd:dateTime(?dod)),
         "") as ?yod)
         BIND(COALESCE(?thumbnail, "") as ?pic) .
              FILTER (lang(?label) = 'en')
    } LIMIT 1`
    private sparqlQuery = (dbpediaId: string) => `PREFIX dbo: <http://dbpedia.org/ontology/> 
    SELECT DISTINCT ?person ?pic ?label ?yob ?yod ?descendant
    WHERE {
         ?person dbo:parent* <${dbpediaId}> 
         OPTIONAL { ?descendant dbo:parent ?person }
         BIND(?person as ?person)
         OPTIONAL { ?descendant rdfs:label ?label }
         OPTIONAL { ?descendant  dbo:birthDate ?dob} 
         OPTIONAL { ?descendant  dbo:deathDate ?dod}
         OPTIONAL { ?descendant dbo:thumbnail ?thumbnail} 
         BIND(IF(bound(?dob),
         YEAR(xsd:dateTime(?dob)),
         "") as ?yob)
         BIND(IF(bound(?dod),
         YEAR(xsd:dateTime(?dod)),
         "") as ?yod)
         BIND(COALESCE(?thumbnail, "") as ?pic) .
              FILTER (lang(?label) = 'en')
    }`;

    private queryDispatcher = new SPARQLQueryDispatcher(this.endpointUrl);

    query = async (dbpediaId: string) => {
        const query = await this.queryDispatcher.query(this.sparqlQuery(dbpediaId))
        const queryRoot = await this.queryDispatcher.query(this.rootSparqlQuery(dbpediaId))

        const queryData = mapQuery(query.results.bindings)
        const rootQueryData = mapRootQuery(queryRoot.results.bindings)

        return [...queryData, ...rootQueryData]
    }
}

export default DBpediaTreeQuery