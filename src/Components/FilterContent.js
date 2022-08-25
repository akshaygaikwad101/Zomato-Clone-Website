import React, { Component } from "react";
import "../Styles/Filter.css";
import Rating from "./Rating";
import { withRouter } from "react-router-dom";

export class FilterContent extends Component {
  handleClick = () => {
    const { restaurants } = this.props;
    this.props.history.push(`/details?restaurant=${restaurants._id}`);
  };
  render() {
    const { restaurants } = this.props;
    return (
      <div className="content1" onClick={this.handleClick}>
        <div className="flex">
          <div className="content-img">
            <img src={restaurants.image} alt="" />
          </div>
          <div className="hotel-details">
            <h3>{restaurants.name}</h3>
            <p>{restaurants.locality}</p>
            <small>{restaurants.city}</small>
            <div className="rating">
              <span>
                <Rating rating={restaurants.aggregate_rating} />
              </span>
              <span className="rating-aggregate">
                {`(${restaurants.aggregate_rating})`}
              </span>
              <span className="rating-text">{`- ${restaurants.rating_text}`}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex">
          <div className="left-content">
            <ul>
              <li>CUISINES:</li>
              <li>COST FOR TWO:</li>
            </ul>
          </div>
          <div className="right-content">
            <ul>
              <li>{restaurants.cuisine.map((item) => `${item.name} | `)}</li>
              <li className="price">&#8377;&nbsp;{restaurants.min_price}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FilterContent);
