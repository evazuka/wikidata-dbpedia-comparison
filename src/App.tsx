import React from 'react'
import './index.css'
import * as d3 from "d3"
import SPARQLQueryDispatcher from './query-dispatcher'
//import { data } from "./data"

type Props = {
    endpoint: string
    sparqlQuery: string
}


const tree = data => {
    const root = d3.stratify()
        .id(function (d: any) { return d.id; })
        .parentId(function (d: any) { return d.parent; })
        (data);
    return d3.tree().nodeSize([50, 150])(root);
}

class Index extends React.Component {
    endpointUrl = 'https://query.wikidata.org/sparql';
    sparqlQuery = `SELECT DISTINCT ?person ?personLabel ?birth ?death ?descendant ?descendantLabel ?pic WHERE {
        wd:Q9682 wdt:P40* ?person .
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
      }`;
    queryDispatcher = new SPARQLQueryDispatcher(this.endpointUrl);
    state: any;

    constructor(props: any) {
        super(props);
        this.state = null;
        this.queryDispatcher.query(this.sparqlQuery).then(this.renderD3.bind(this));
    }

    ref!: SVGSVGElement

    renderD3 = (result) => {
        console.log(result.results.bindings);
        const data = result.results.bindings
            .map((x: any) => ({ id: x.descendant.value, name: x.descendantLabel.value, birth: x.birth.value, death: x.death.value, picture: x.pic.value, parent: x.person.value }));
        data.unshift({ id: "http://www.wikidata.org/entity/Q9682", name: "Elizabeth II", parent: "", picture: "" })
        console.log(data);
        const root = tree(data);

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
            .attr("transform", `translate(${100 / 3},${100 - x0})`);

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

        if ((d: any) => (d.data.birth && d.data.death) !== "") {
            if ((d: any) => ((d.data.birth !== "") && (d.data.death == ""))) {
                node.append("text")
                    .attr("dy", "1.3em")
                    .attr("x", d => d.children ? -22 : 22)
                    .attr("text-anchor", d => d.children ? "end" : "start")
                    .text((d: any) => 'b. ' + d.data.birth)
                    .clone(true).lower()
                    .attr("stroke", "white");
            } else if ((d: any) => ((d.data.birth == "") && (d.data.death !== ""))) {
                node.append("text")
                    .attr("dy", "1.3em")
                    .attr("x", d => d.children ? -22 : 22)
                    .attr("text-anchor", d => d.children ? "end" : "start")
                    .text((d: any) => 'd. ' + d.data.death)
                    .clone(true).lower()
                    .attr("stroke", "white");
            } else {
                node.append("text")
                    .attr("dy", "1.3em")
                    .attr("x", d => d.children ? -22 : 22)
                    .attr("text-anchor", d => d.children ? "end" : "start")
                    .text((d: any) => 'b. ' + d.data.birth + ' - d. ' + d.data.death)
                    .clone(true).lower()
                    .attr("stroke", "white");
            }
        }
    }

    render() {
        return (
            <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width={800} height={1000}>
            </svg>
        )
    }
}

export default Index