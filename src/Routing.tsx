import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import App from "./App";
import TreeComparison from "./TreeComparison";

export default function Routing() {
    return (
        <Router>
            <div>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/tree-comparison/:wikidataId/:wikiId"
                        render={props => <TreeComparison {...props} />}>
                    </Route>
                    <Route path="/"
                        render={props => <App {...props} />}>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}