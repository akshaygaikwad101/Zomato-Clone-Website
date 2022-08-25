import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
export class Rating extends Component {
  render() {
    const { rating } = this.props;
    return (
      <div className="icons">
        {[1, 2, 3, 4, 5].map((item) => (
          <span key={uuidv4()}>
            {rating + 1 >= item + 0.5 && rating + 1 <= item + 0.9 ? (
              <i className="fas fa-star-half-alt"></i>
            ) : rating >= item ? (
              <i className="fas fa-star"></i>
            ) : (
              <i className="far fa-star"></i>
            )}
          </span>
        ))}
      </div>
    );
  }
}

export default Rating;
