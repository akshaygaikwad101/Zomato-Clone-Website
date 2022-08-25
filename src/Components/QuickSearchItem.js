import React, { Component } from "react";
import "../Styles/Home.css";
import { withRouter } from "react-router-dom";

export class QuickSearchItem extends Component {
  handleClick = () => {
    const { mealtypesData } = this.props;
    const locationId = sessionStorage.getItem("locationId");
    sessionStorage.setItem("mealtype", mealtypesData.name);

    
      locationId
        ? this.props.history.push(
            `/filter?mealtype=${mealtypesData.meal_type}&locationId=${locationId}`
          )
        : this.props.history.push(
            `/filter?mealtype=${mealtypesData.meal_type}`
          );
    
  };
  render() {
    const { mealtypesData } = this.props;
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 " onClick={this.handleClick}>
        <div className="item">
          <div className="row">
            <div className="col-6">
              <div className="image">
                <img
                  src={mealtypesData.image}
                  alt=""
                  width="100%"
                  height="160px"
                />
              </div>
            </div>
            <div className="col-6 pd">
              <h5>{mealtypesData.name}</h5>
              <p>{mealtypesData.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuickSearchItem);
