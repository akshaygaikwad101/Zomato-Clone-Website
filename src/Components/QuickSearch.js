import React, { Component } from "react";
import "../Styles/Home.css";
import QuickSearchItem from "./QuickSearchItem";

export class QuickSearch extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h2>Quick Searches</h2>
          <h6>Discover restaurants by the type of meal</h6>

          <div className="row">
            {this.props.mealtypes.map((item) => (
              <QuickSearchItem mealtypesData={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default QuickSearch;
