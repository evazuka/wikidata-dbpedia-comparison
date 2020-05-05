class SPARQLQueryDispatcher {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    query(sparqlQuery: string) {
        const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };
        return fetch(fullUrl, { headers }).then(body => body.json());
    }
}

export default SPARQLQueryDispatcher