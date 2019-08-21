import React from "react";
import "./App.css";

import GiphySearch from './Components/GiphySearch';


const App = () => {
    return (
        <div className="main">
            <div className="container">
                <GiphySearch />
            </div>
        </div>
    );
};

export default App;
