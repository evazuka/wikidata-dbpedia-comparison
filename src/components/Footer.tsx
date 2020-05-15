import React from "react"
import '../footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <p>
                    All the data used to create family trees and filmography
                is retrieved from <a href="https://www.wikidata.org/">Wikidata</a> and <a href="https://wiki.dbpedia.org/">DBpedia</a>.
                </p>
            </div>
        )
    }
}

export default Footer