import SPARQLQueryDispatcher from '../query-dispatcher'
import { FilmographyData } from '../components/Filmography';

const mapQuery = (data): FilmographyData[] => {
    return data
        .map((x: any) => ({
            film: x.film.value,
            filmLabel: x.filmLabel.value,
            description: x.filmDescription.value,
            year: x.year.value,
            image: x.pic1?.value ?? x.pic2?.value
        }));
}

class WikidataFilmQuery {
    private endpointUrl = 'https://query.wikidata.org/sparql';
    private sparqlQuery = (wikidataId: string) => `SELECT DISTINCT ?film ?filmLabel ?filmDescription (SAMPLE(?image) AS ?pic1) (SAMPLE(?logo) AS ?pic2) (SAMPLE(?pubYear) AS ?year) WHERE {
        BIND(wd:${wikidataId}  as ?person) .
        ?film wdt:P31 wd:Q11424 .
        ?film wdt:P577 ?pubDate .
        ?film wdt:P161 ?person .
        OPTIONAL{?film wdt:P18 ?image} .
        OPTIONAL{?film wdt:P154 ?logo} .
        BIND(YEAR(?pubDate) as ?pubYear) .
       SERVICE wikibase:label {
         bd:serviceParam wikibase:language "en" .
       }
      } GROUP BY ?film ?filmLabel ?filmDescription`;

    private queryDispatcher = new SPARQLQueryDispatcher(this.endpointUrl);

    query = async (wikidataId: string) => {
        const query = await this.queryDispatcher.query(this.sparqlQuery(wikidataId))

        const queryData = mapQuery(query.results.bindings)
        queryData.sort((a, b) => parseInt(b.year) - parseInt(a.year))
        return queryData
    }
}

export default WikidataFilmQuery