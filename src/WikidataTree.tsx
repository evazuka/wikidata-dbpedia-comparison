import React from 'react'
import './index.css'
import * as d3 from "d3"
import SPARQLQueryDispatcher from './query-dispatcher'
//import { data } from "./data"

type Props = {
    wikidataId: string
}

type Data = {
    id: string,
    name: string,
    birth: string,
    death: string,
    picture: string,
    parent: string
}

const width = 800;

const tree = data => {
    const root = d3.stratify()
        .id(function (d: any) { return d.id; })
        .parentId(function (d: any) { return d.parent; })
        (data);

    const dx = 10;
    const dy = width / (root.height + 1);

    return [d3.tree().nodeSize([50, 150])(root), dx, dy] as const;
}

class WikidataTree extends React.Component<Props> {
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
    state: any;

    constructor(props: any) {
        super(props);
        this.state = null;
        this.query()
    }

    query = async () => {
        const query1 = await this.queryDispatcher.query(this.sparqlQuery)
        const queryRoot = await this.queryDispatcher.query(this.rootSparqlQuery)
        console.log(queryRoot)

        const queryData = this.mapQuery(query1.results.bindings)
        const rootQueryData = this.mapRootQuery(queryRoot.results.bindings)

        this.renderD3([...queryData, ...rootQueryData])
    }

    mapQuery = (data): Data[] => {
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

    mapRootQuery = (data): Data[] => {
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

    ref!: Element

    datesSubtitle = (d: any) => {
        let subtitle = ''
        if (d.data.birth !== '')
            subtitle += `b. ${d.data.birth}`

        if (d.data.death !== '') {
            if (d.data.birth)
                subtitle += ' - '
            subtitle += `d. ${d.data.death}`
        }

        return subtitle
    }

    renderD3 = (data) => {
        //data.unshift({ id: "http://www.wikidata.org/entity/Q9682", name: "Elizabeth II", parent: "", picture: "" })
        console.log(data);
        const [root, dx, dy] = tree(data);

        const zoom = d3.zoom();

        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = d3.select(this.ref);

        const g = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("transform", `translate(${dy / 3},${dx - x0})`);

        const link = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x((d: any) => d.y)
                .y((d: any) => d.x) as any);

        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        svg.append("defs")
            .append("clipPath")
            .attr("id", "circleCip")
            .append("circle")
            .attr("r", 20);

        node.append("circle")
            .attr("r", 20)
            .attr("fill", "grey");

        node.append("svg:image")
            .attr("xlink:href", function (d: any) { return d.data.picture; })
            .attr("clip-path", "url(#circleCip)")
            .attr("x", -20)
            .attr("y", -20)
            .attr("height", 40)
            .attr("width", 40)
            .attr('preserveAspectRatio', 'xMidYMid slice');

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -22 : 22)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text((d: any) => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .attr("x", d => d.children ? -22 : 22)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(this.datesSubtitle)
            .clone(true).lower()
            .attr("stroke", "white");

        function zoomed() {
            g.attr("transform", d3.event.transform);
        }

        svg
            .attr("viewBox", [0, 0, width, x1 - x0 + dx * 2] as any)
            .call(d3.zoom()
                .extent([[0, 0], [width, x1 - x0 + dx * 2]])
                .scaleExtent([1, 8])
                .on("zoom", zoomed))

    }

    render() {
        return (
            <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width={800} height={1000}>
            </svg>
        )
    }
}

export default WikidataTree