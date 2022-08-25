import React, { Component } from "react";
import "../Styles/Filter.css";
import axios from "axios";

export class FilterSidebar extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      isExpanded: true,
      locations: [],
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
    this.state.width > 762
      ? this.setState({ isExpanded: true })
      : this.setState({ isExpanded: false });
  };
  componentDidMount() {
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

  render() {
    const { locations } = this.state;
    return (
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
            className={
              this.state.isExpanded ? "filter collapsed show" : "filter"
            }
          >
            <div className="left-block">
              <div className="sub-heading">Select Location</div>
              <select className="select">
                <option value={0}>Select Location</option>
                {locations.map((item) => {
                  return (
                    <option
                      key={item._id}
                      value={item.location_id}
                      style={{ fontweight: "bold", color: "lightslategrey" }}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <div className="sub-heading" style={{ marginTop: "15px" }}>
                Cuisine
              </div>
              <div style={{ marginTop: "5px" }}>
                <div>
                  <input type="checkbox" className="checkbox" />
                  <span className="cuisine-content">South Indian</span>
                </div>
                <div>
                  <input type="checkbox" className="checkbox" />
                  <span className="cuisine-content">North Indian</span>
                </div>
                <div>
                  <input type="checkbox" className="checkbox" />
                  <span className="cuisine-content">Chineese</span>
                </div>
                <div>
                  <input type="checkbox" className="checkbox" />
                  <span className="cuisine-content">Fast Food</span>
                </div>
                <div>
                  <input type="checkbox" className="checkbox" />
                  <span className="cuisine-content">Street Food</span>
                </div>
              </div>
              <div className="sub-heading" style={{ margintop: "15px" }}>
                Costs For Two
              </div>
              <div style={{ margintop: "15px" }}>
                <div>
                  <input type="radio" name="cost" className="radio" />
                  <span className="cost-content">Less than 500</span>
                </div>
                <div>
                  <input type="radio" name="cost" className="radio" />
                  <span className="cost-content"> 500 to 1000</span>
                </div>
                <div>
                  <input type="radio" name="cost" className="radio" />
                  <span className="cost-content"> 1000 to 1500</span>
                </div>
                <div>
                  <input type="radio" name="cost" className="radio" />
                  <span className="cost-content"> 1500 to 2000</span>
                </div>
                <div>
                  <input type="radio" name="cost" className="radio" />
                  <span className="cost-content">More than 2000</span>
                </div>
              </div>
              <div>
                <div className="sub-heading" style={{ margintop: "5px" }}>
                  Sort
                </div>
              </div>
              <div style={{ margintop: "5px" }}>
                <div>
                  <input type="radio" name="price" className="radio" />
                  <span className="cost-content">Price low to high</span>
                </div>
                <div>
                  <input type="radio" name="price" className="radio" />
                  <span className="cost-content">Price high to low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterSidebar;
