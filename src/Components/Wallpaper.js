import React, { Component } from "react";
import "../Styles/Home.css";
import Carousel from "react-bootstrap/Carousel";
import Searchbar from "./Searchbar";

export class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      locId: "",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect = (e) => {
    this.setState({
      locId: e.target.value,
    });
    sessionStorage.setItem("locationId", e.target.value);
  };

  render() {
    const { locId } = this.state;

    return (
      <div>
        <div className="carousel_image">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 pic"
                src="Assets/slider3.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 pic"
                src="Assets/slider1.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 pic"
                src="Assets/slider.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="header">
          <div className="image-top">
            <div className="logo">
              <b>e!</b>
            </div>
            <div className="wallpaper-heading">
              Find the best restaurants, cafés, bars
            </div>
            <div className="searchContainer">
              <div className="search-select">
                <select onChange={this.handleSelect} className="select">
                  <option>Select</option>
                  {this.props.locations.map((item) => {
                    return (
                      <option
                        key={item._id}
                        value={item.location_id}
                      >{`${item.name}, ${item.city}`}</option>
                    );
                  })}
                </select>
              </div>
              <Searchbar loc={locId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wallpaper;