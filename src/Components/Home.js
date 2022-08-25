/*import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';

import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            mealtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'http://localhost:8989/locations',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ locations: response.data.locations })
            })
            .catch(err => console.log(err));

        axios({
            method: 'GET',
            url: 'http://localhost:8989/mealTypes',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ mealtypes: response.data.mealTypes })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { locations, mealtypes } = this.state;
        return (
            <div>
                <Wallpaper locationsData={locations} />
                <QuickSearch mealtypesData={mealtypes} />
               
            </div>
        )
    }
}

export default Home;*/
import React, { Component } from "react";
import "../Styles/Home.css";
import QuickSearch from "./QuickSearch";
import Wallpaper from "./Wallpaper";
import axios from "axios";
import Loader from "./Loader";

export class Home extends Component {
  constructor() {
    super();

    this.state = {
      locations: [],
      mealtypes: [],
      loader: false,
    };
  }
  componentDidMount() {
    sessionStorage.clear();
    this.setState({ loader: true });
    axios({
      method: "GET",
      url: "https://guarded-dusk-22777.herokuapp.com/locations",
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          locations: response.data.Locations,
        });
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: "https://guarded-dusk-22777.herokuapp.com/mealtypes",
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          mealtypes: response.data.MealTypes,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { locations, mealtypes, loader } = this.state;
    return (
      <div>
        <Wallpaper locations={locations} />
        <br />
        {loader ? (
          <Loader />
        ) : (
          <QuickSearch mealtypes={mealtypes} key={mealtypes.__id} />
        )}
      </div>
    );
  }
}

export default Home;


