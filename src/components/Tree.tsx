import React from "react";
import * as d3 from "d3";

const width = 800;

const tree = (data: TreeData[]) => {
    const root = d3.stratify<TreeData>()
        .id(d => d.id)
        .parentId(d => d.parent)
        (data);

    const dx = 10;
    const dy = width / (root.height + 1);

    return [d3.tree<TreeData>().nodeSize([50, 150])(root), dx, dy] as const;
}

const getDatesSubtitle = (d: d3.HierarchyPointNode<TreeData>) => {
    let subtitle = ''
    if (d.data.birth !== '')
        subtitle += `b. ${d.data.birth}`;

    if (d.data.death !== '') {
        if (d.data.birth)
            subtitle += ' - ';
        subtitle += `d. ${d.data.death}`;
    }

    return subtitle;
}

export type TreeData = {
    id: string,
    name: string,
    birth: string,
    death: string,
    picture: string,
    parent: string
}

type Props = {
    data: TreeData[]
}

class Tree extends React.Component<Props> {
    ref!: Element

    componentDidMount() {
        this.renderD3();
    }

    renderD3 = () => {
        const [root, dx, dy] = tree(this.props.data);

        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const uniqueId = Math.random();

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
            .attr("id", "circleClip" + uniqueId)
            .append("circle")
            .attr("r", 20);

        node.append("circle")
            .attr("r", 20)
            .attr("fill", "grey");

        node.append("svg:image")
            .attr("xlink:href", d => d.data.picture)
            .attr("clip-path", "url(#circleClip" + uniqueId + ")")
            .attr("x", -20)
            .attr("y", -20)
            .attr("height", 40)
            .attr("width", 40)
            .attr('preserveAspectRatio', 'xMidYMid slice');

        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -22 : 22)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .attr("x", d => d.children ? -22 : 22)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(getDatesSubtitle)
            .clone(true).lower()
            .attr("stroke", "white");

        function zoomed() {
            g.attr("transform", d3.event.transform);
        }

        svg.attr("viewBox", [0, 0, width, x1 - x0 + dx * 2] as any)
            .call(d3.zoom()
                .extent([[0, 0], [width, x1 - x0 + dx * 2]])
                .scaleExtent([1, 8])
                .on("zoom", zoomed))
    }

    render() {
        return (
            <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width={800} height={window.innerHeight}>
            </svg>
        )
    }
}

export default Tree