import React, { Component } from "react";
import "../Styles/Home.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

export class Searchbar extends Component {
  constructor(props) {
    super();

    this.state = {
      restaurants: [],
      filteredData: [],
      searchData: "",
    };
  }

  fetchData(locId) {
    axios({
      method: "GET",
      url: `https://guarded-dusk-22777.herokuapp.com/restaurants/${locId}`,
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.Restaurants,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.loc !== prevProps.loc) {
      this.fetchData(this.props.loc);
      this.setState({
        searchData: "",
        filteredData: [],
      });
    }
  }

  handleChange = (e) => {
    const wordSearch = e.target.value;
    this.setState({
      searchData: wordSearch,
    });
    const { restaurants, searchData } = this.state;
    const newFilter = restaurants.filter((item) =>
      item.name.toLowerCase().includes(searchData.toLowerCase())
    );
    if (wordSearch === "") {
      this.setState({
        filteredData: [],
      });
    } else {
      this.setState({
        filteredData: newFilter,
      });
    }
  };
  handleClick = (item) => {
    this.setState({
      searchData: `${item.name}, ${item.city}`,
      filteredData: [],
    });
    this.props.history.push(`/details?restaurant=${item._id}`);
  };
  clearInput = () => {
    this.setState({
      filteredData: [],
      searchData: "",
    });
  };
  render() {
    const { filteredData, searchData } = this.state;
    return (
      <div>
        <div className="search">
          {searchData === "" ? (
            <i className="fas fa-search"></i>
          ) : (
            <i className="fas fa-times" onClick={this.clearInput}></i>
          )}

          <input
            type="text"
            placeholder="Enter the restaurant name"
            value={searchData}
            onChange={this.handleChange}
          />
        </div>

        {filteredData.length !== 0 && (
          <div className="searchResult">
            {filteredData.map((item) => {
              return (
                <div key={item._id} onClick={() => this.handleClick(item)}>
                  <p>{`${item.name}, ${item.city}`}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Searchbar);
