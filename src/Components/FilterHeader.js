import React, { Component } from "react";
import "../Styles/Filter.css";
import { withRouter } from "react-router-dom";

export class FilterHeader extends Component {
  handleClick = () => {
    this.props.history.push(`/`);
  };
  render() {
    const { totalPage, totalRestaurants } = this.props;
    const mealtype = sessionStorage.getItem("mealtype");
    return (
      <div>
        <br />
        <div className="container">
          <div className="heading">
            <h1>{mealtype && `${mealtype} options`}</h1>
            {totalRestaurants !== 0 && (
              <span>
                {totalPage === 1
                  ? `${totalPage} page, `
                  : `${totalPage} pages, `}
                {totalRestaurants === 1
                  ? `${totalRestaurants} restaurant`
                  : `${totalRestaurants} restaurants`}
              </span>
            )}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(FilterHeader);
