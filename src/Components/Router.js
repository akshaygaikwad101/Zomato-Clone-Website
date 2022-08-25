/*import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Header from './Header';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/details" component={Details} />
        </BrowserRouter>
    )
}

export default Router; */
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Filter from "./Filter";
import Home from "./Home";
import Details from "./Details";
import Header from "./Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/details" component={Details} />
    </BrowserRouter>
  );
}

export default Router;
