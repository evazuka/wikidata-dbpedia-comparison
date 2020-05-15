import ReactDOM from 'react-dom'
import App from './components/App'
import React from 'react';
import Routing from './components/Routing';
import Footer from './components/Footer';

ReactDOM.render(
    <>
        <div className="main">
            <Routing />
        </div>
        <Footer />
    </>,
    document.getElementById('root')
);