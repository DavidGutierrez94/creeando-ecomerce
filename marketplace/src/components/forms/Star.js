import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="15px"
      starSpacing="2px"
      starHoverColor="#FFF500"
      starEmptyColor="#80FFDB"
    />
    <br />
  </>
);

export default Star;
