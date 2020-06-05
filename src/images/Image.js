import React from "react";
import "./style.css";

const Image = ({ image }) => {
   return (
      <div className="col-md-4 mb-4">
         <div className="image">
            <img loading="lazy" src={image?.urls?.small} height="250px" width="250px" alt="" />
         </div>
      </div>
   );
};

export default Image;
