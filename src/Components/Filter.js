import React, { Component } from "react";
import "../Styles/Filter.css";
import FilterContent from "./FilterContent";
import FilterHeader from "./FilterHeader";
import querystring from "query-string";
import axios from "axios";
import Loader from "./Loader";

export class Filter extends Component {
  constructor() {
    super();

    this.state = {
      restaurants: [],
      width: 0,
      isExpanded: true,
      isSelected: "",
      locations: [],
      location: undefined,
      mealtype: undefined,
      lcost: undefined,
      hcost: undefined,
      sort: undefined,
      cuisine: [],
      totalPage: undefined,
      page: undefined,
      totalRestaurants: undefined,
      loader: false,
    };
  }
  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    this.state.width > 762
      ? this.setState({ isExpanded: true })
      : this.setState({ isExpanded: false });
  };

  componentDidMount() {
    const qs = querystring.parse(this.props.location.search);
    const { mealtype, locationId } = qs;
    const filterObj = {
      mealtype: Number(mealtype),
      location: locationId,
    };
    this.setState({
      location: locationId,
      loader: true,
    });
    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          mealtype,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
    window.addEventListener("resize", this.updateDimensions);

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
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  handleChangeLocations = (e) => {
    let filterObj = {};
    const location = Number(e.target.value);
    this.setState({
      location,
      isSelected: e.target.value,
      loader: true,
    });
    this.state.cuisine.length === 0
      ? (filterObj = {
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort: this.state.sort,
          page: 1,
          totalRestaurants: this.state.restaurants,
          location,
        })
      : (filterObj = {
          cuisine: this.state.cuisine,
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort: this.state.sort,
          page: 1,
          totalRestaurants: this.state.restaurants,
          location,
        });
    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          loader: false,
        });
        this.props.history.replace(
          `/filter?mealtype=${this.state.mealtype}&locationId=${this.state.location}`
        );
      })
      .catch((err) => console.log(err));
  };
  handleChangeSort = (sort) => {
    let filterObj = {};
    this.setState({
      sort,
      loader: true,
    });
    this.state.cuisine.length === 0
      ? (filterObj = {
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort,
          location: this.state.location,
          page: this.state.page,
          totalRestaurants: this.state.restaurants,
        })
      : (filterObj = {
          cuisine: this.state.cuisine,
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort,
          location: this.state.location,
          page: this.state.page,
          totalRestaurants: this.state.restaurants,
        });

    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChangeCost = (lcost, hcost) => {
    let filterObj = {};
    this.setState({
      lcost,
      hcost,
      loader: true,
    });
    this.state.cuisine.length === 0
      ? (filterObj = {
          mealtype: Number(this.state.mealtype),
          lcost,
          hcost,
          sort: this.state.sort,
          location: this.state.location,
          page: this.state.page,
          totalRestaurants: this.state.restaurants,
        })
      : (filterObj = {
          cuisine: this.state.cuisine,
          mealtype: Number(this.state.mealtype),
          lcost,
          hcost,
          sort: this.state.sort,
          location: this.state.location,
          page: this.state.page,
          totalRestaurants: this.state.restaurants,
        });

    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChangeCuisine = async (e) => {
    const arr = Number(e.target.value);
    let filterObj = {};
    (await e.target.checked)
      ? this.setState({
          cuisine: [...this.state.cuisine, arr],
          loader: true,
        })
      : this.setState({
          cuisine: [...this.state.cuisine.filter((item) => item !== arr)],
          loader: true,
        });

    this.state.cuisine.length === 0
      ? (filterObj = {
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort: this.state.sort,
          location: this.state.location,
          page: this.state.page,
          totalRestaurants: this.state.restaurants,
        })
      : (filterObj = {
          cuisine: this.state.cuisine,
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort: this.state.sort,
          location: this.state.location,
          page: this.state.page,
          totalRestaurants: this.state.restaurants,
        });
    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleClickPage = (e) => {
    const page = Number(e.target.value);
    let filterObj = {};
    this.setState({
      page,
      loader: true,
    });
    this.state.cuisine.length === 0
      ? (filterObj = {
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort: this.state.sort,
          location: this.state.location,
          totalRestaurants: this.state.restaurants,
          page,
        })
      : (filterObj = {
          cuisine: this.state.cuisine,
          mealtype: Number(this.state.mealtype),
          lcost: this.state.lcost,
          hcost: this.state.hcost,
          sort: this.state.sort,
          location: this.state.location,
          totalRestaurants: this.state.restaurants,
          page,
        });

    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleClickClear = () => {
    this.setState({
      locations: [],
      location: undefined,
      lcost: undefined,
      hcost: undefined,
      sort: undefined,
      cuisine: [],
      isSelected: "",
      page: undefined,
      loader: true,
    });

    const filterObj = {
      mealtype: Number(this.state.mealtype),
    };
    axios({
      method: "GET",
      url: "https://guarded-dusk-22777.herokuapp.com/locations",
      headers: { "Content-Type": "Application/json" },
    })
      .then((response) => {
        this.setState({
          locations: response.data.Locations,
        });
        this.props.history.replace(`/filter?mealtype=${this.state.mealtype}`);
      })
      .catch((err) => console.log(err));
    axios({
      method: "POST",
      url: "https://guarded-dusk-22777.herokuapp.com/filter",
      headers: { "Content-Type": "Application/json" },
      data: filterObj,
    })
      .then((response) => {
        this.setState({
          restaurants: response.data.PaginationResponse,
          totalPage: response.data.TotalPage,
          totalRestaurants: response.data.TotalRestaurants,
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };
  slideRight = () => {
    const right = document.querySelector(".page");
    right.scrollLeft += 210;
  };
  slideLeft = () => {
    const right = document.querySelector(".page");
    right.scrollLeft += -210;
  };
  render() {
    const {
      restaurants,
      locations,
      lcost,
      hcost,
      sort,
      cuisine,
      isSelected,
      totalPage,
      isExpanded,
      totalRestaurants,
      loader,
    } = this.state;
    return (
      <div>
        <FilterHeader
          totalPage={totalPage}
          totalRestaurants={totalRestaurants}
        />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="wrapper">
                <div className="coll">
                  <div className="left-block-heading">Filters</div>

                  <div className="toggle">
                    <i
                      className="fas fa-chevron-down arrow"
                      data-bs-toggle="collapse"
                      data-bs-target=".filter"
                      aria-expanded="true"
                    ></i>
                  </div>
                </div>
                <div
                  className={isExpanded ? "filter collapsed show" : "filter"}
                >
                  <div className="left-block">
                    <div className="sub-heading">Select Location</div>
                    <select
                      className="select"
                      onChange={this.handleChangeLocations}
                    >
                      <option value={0}>Select Location</option>
                      {locations.map((item) => {
                        return (
                          <option
                            key={item._id}
                            value={item.location_id}
                            style={{
                              fontweight: "bold",
                              color: "lightslategrey",
                            }}
                          >
                            {`${item.name}, ${item.city}`}
                          </option>
                        );
                      })}
                    </select>
                    <div className="sub-heading" style={{ marginTop: "15px" }}>
                      Cuisine
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <div>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={1}
                          checked={
                            cuisine.find((item) => item === 1) ? true : false
                          }
                          onChange={this.handleChangeCuisine}
                        />
                        <span className="cuisine-content">South Indian</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={2}
                          checked={
                            cuisine.find((item) => item === 2) ? true : false
                          }
                          onChange={this.handleChangeCuisine}
                        />
                        <span className="cuisine-content">North Indian</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={3}
                          checked={
                            cuisine.find((item) => item === 3) ? true : false
                          }
                          onChange={this.handleChangeCuisine}
                        />
                        <span className="cuisine-content">Chineese</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={4}
                          checked={
                            cuisine.find((item) => item === 4) ? true : false
                          }
                          onChange={this.handleChangeCuisine}
                        />
                        <span className="cuisine-content">Fast Food</span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={5}
                          checked={
                            cuisine.find((item) => item === 5) ? true : false
                          }
                          onChange={this.handleChangeCuisine}
                        />
                        <span className="cuisine-content">Street Food</span>
                      </div>
                    </div>
                    <div className="sub-heading" style={{ margintop: "15px" }}>
                      Costs For Two
                    </div>
                    <div style={{ margintop: "15px" }}>
                      <div>
                        <input
                          type="radio"
                          name="cost"
                          className="radio"
                          checked={lcost === 1 && hcost === 500 ? true : false}
                          onChange={() => this.handleChangeCost(1, 500)}
                        />
                        <span className="cost-content">
                          Less than &#8377;&nbsp;500
                        </span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="cost"
                          className="radio"
                          checked={
                            lcost === 500 && hcost === 1000 ? true : false
                          }
                          onChange={() => this.handleChangeCost(500, 1000)}
                        />
                        <span className="cost-content">
                          &#8377;&nbsp;500 to &#8377;&nbsp;1000
                        </span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="cost"
                          className="radio"
                          checked={
                            lcost === 1000 && hcost === 1500 ? true : false
                          }
                          onChange={() => this.handleChangeCost(1000, 1500)}
                        />
                        <span className="cost-content">
                          &#8377;&nbsp;1000 to &#8377;&nbsp;1500
                        </span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="cost"
                          className="radio"
                          checked={
                            lcost === 1500 && hcost === 2000 ? true : false
                          }
                          onChange={() => this.handleChangeCost(1500, 2000)}
                        />
                        <span className="cost-content">
                          &#8377;&nbsp;1500 to &#8377;&nbsp;2000
                        </span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="cost"
                          className="radio"
                          checked={lcost === 2000 ? true : false}
                          onChange={() => this.handleChangeCost(2000, 100000)}
                        />
                        <span className="cost-content">
                          More than &#8377;&nbsp;2000
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="sub-heading" style={{ margintop: "5px" }}>
                        Sort
                      </div>
                    </div>
                    <div style={{ margintop: "5px" }}>
                      <div>
                        <input
                          type="radio"
                          name="price"
                          className="radio"
                          checked={this.state.sort === 1 ? true : false}
                          onChange={() => this.handleChangeSort(1)}
                        />
                        <span className="cost-content">Price low to high</span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="price"
                          className="radio"
                          checked={this.state.sort === -1 ? true : false}
                          onChange={() => this.handleChangeSort(-1)}
                        />
                        <span className="cost-content">Price high to low</span>
                      </div>
                    </div>
                    <div className="sub-heading">
                      {(cuisine.length !== 0 ||
                        sort ||
                        hcost ||
                        isSelected) && (
                        <input
                          type="button"
                          className="clearFilter"
                          value="Clear Filters"
                          onClick={this.handleClickClear}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loader ? (
              <Loader />
            ) : (
              <div className="col-lg-9 col-md-8 col-sm-12">
                {restaurants.length === 0 ? (
                  <h4 className="no-options">No options available</h4>
                ) : (
                  <div className="right-block">
                    {restaurants.map((item) => {
                      return (
                        <FilterContent key={item._id} restaurants={item} />
                      );
                    })}
                  </div>
                )}
                {totalPage > 1 && (
                  <div className="Footer">
                    <div className="footer-flex">
                      <input
                        type="button"
                        value="<"
                        style={{ display: totalPage < 6 && "none" }}
                        onClick={this.slideLeft}
                      />
                      <div className="page" onClick={this.handleClickPage}>
                        {Array(totalPage)
                          .fill()
                          .map((_, i) => {
                            return (
                              <input key={i} type="button" value={i + 1} />
                            );
                          })}
                      </div>
                      <input
                        type="button"
                        value=">"
                        style={{ display: totalPage < 6 && "none" }}
                        onClick={this.slideRight}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
