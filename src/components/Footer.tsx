import React from "react"
import '../footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                All the data used to create family trees and filmography
                is retrieved from <a href="https://www.wikidata.org/">Wikidata</a> and <a href="https://wiki.dbpedia.org/">DBpedia</a>.
            </div>
        )
    }
}

export default Footer