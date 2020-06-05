import React from "react";
import Image from "./Image";
import "./style.css";

const Images = ({ images, loading, errors }) => {
   return (
      <div className="row images">
         {loading ? (
            <div className="loading">Loading Images ...</div>
         ) : (
            (images || []).map((image) => {
               return <Image key={image?.id} image={image} />;
            })
         )}
      </div>
   );
};

export default Images;
