import React from "react";

export type FilmographyData = {
    film: string
    filmLabel: string
    description: string
    year: string
    image: string
}

type Props = {
    data: FilmographyData[]
    type: 'wikidata' | 'dbpedia'
}

const FilmCard: React.FC<{ data: FilmographyData, type: 'wikidata' | 'dbpedia' }> = ({ data, type }) => (<>
    <div className={`card ${type}`}>
        <div className="content">
            {data.image !== undefined
                ? <div className="image">
                    <img src={data.image}></img>
                </div> : null
            }
            <div className="text">
                <strong>{data.filmLabel}</strong>
                <p>{data.year}</p>
                <p>{data.description}</p>
            </div>
        </div>
    </div>
</>)

class Filmography extends React.Component<Props> {
    ref!: Element

    render() {
        return (
            <div className="cards">
                {this.props.data.map((filmData, index) => <FilmCard data={filmData} key={index} type={this.props.type} />)}
            </div>
        )
    }
}

export default Filmography