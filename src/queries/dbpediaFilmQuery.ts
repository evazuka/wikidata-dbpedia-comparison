import SPARQLQueryDispatcher from '../query-dispatcher'
import { FilmographyData } from '../components/Filmography';

const mapQuery = (data): FilmographyData[] => {
    return data
        .map((x: any) => ({
            film: x.film.value,
            filmLabel: x.label.value,
            description: x.description.value,
            year: x.year.value,
            image: x.thumbnail?.value
        }));
}

class DBpediaFilmQuery {
    private endpointUrl = 'https://dbpedia.org/sparql';
    private sparqlQuery = (dbpediaId: string) => `SELECT DISTINCT ?film ?label ?year ?thumbnail ?description
    WHERE {
    BIND(<${dbpediaId}> as ?person) .
    ?film rdf:type dbo:Film .
    ?film rdfs:label ?label .
    ?film dbo:starring ?person .
    ?film dbo:abstract ?description
    OPTIONAL {?film dbo:releaseDate ?date} 
    OPTIONAL {?film dbo:thumbnail?thumbnail}
    BIND(IF(bound(?date), YEAR(xsd:dateTime(?date)), "") as ?year)
    FILTER (lang(?label) = 'en')
    FILTER (lang(?description) = 'en')
    }`;

    private queryDispatcher = new SPARQLQueryDispatcher(this.endpointUrl);

    query = async (dbpediaId: string) => {
        const query = await this.queryDispatcher.query(this.sparqlQuery(dbpediaId))

        const queryData = mapQuery(query.results.bindings)
        queryData.sort((a, b) => parseInt(b.year) - parseInt(a.year))
        return queryData
    }
}

export default DBpediaFilmQuery