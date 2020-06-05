import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { base_url, access_key } from "./constants";
import "./App.css";
const Images = React.lazy(() => import("./images"));

const App = () => {
   const [images, setImages] = useState([]);
   const [error, setError] = useState("");
   const [page, setPage] = useState(1);
   const [query, setQuery] = useState("");
   const [loading, setLoading] = useState(false);

   const handlePageChange = ({ selected }) => {
      setPage(selected + 1);
   };

   const fetchImages = () => {
      setLoading(true);
      axios({
         method: "get",
         url: `${base_url}/photos`,
         params: {
            page,
            per_page: 9,
            order_by: "latest",
            query,
         },
         headers: { authorization: `Client-ID ${access_key}` },
      })
         .then((response) => {
            setLoading(false);
            if (response?.status === 200 && (response?.data ?? []).length > 0) {
               setImages(response?.data);
            }
         })
         .catch((error) => {
            setLoading(false);
            setError(error?.response?.data?.message ?? "Something Went Wrong!");
         });
   };

   useEffect(() => {
      fetchImages();
   }, [page]);

   const handleSearch = () => {
      fetchImages();
   };

   return (
      <div className="container">
         <div className="row">
            <div className="col-md-12 searchBoxContainer">
               <input
                  className="searchBox"
                  type="search"
                  name="query"
                  onChange={(e) => setQuery(e.target.value)}
               />
               <button className="searchBtn" onClick={handleSearch}>
                  Search
               </button>
            </div>
         </div>
         <div className="row">
            <div className="col-md-12">
               <React.Suspense fallback={<div className="loading">Loading...</div>}>
                  <Images loading={loading} images={images} error={error} />
               </React.Suspense>
            </div>
         </div>
         <div className="row">
            <div
               className={loading ? "col-md-12 hiddenPagination" : "col-md-12 paginationContainer"}
            >
               <ReactPaginate
                  pageCount={10}
                  pageRangeDisplayed={10}
                  marginPagesDisplayed={1}
                  initialPage={0}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  pageClassName={"listItem"}
                  nextClassName={"listItem"}
                  previousClassName={"listItem"}
                  pageLinkClassName={"listLink"}
                  nextLinkClassName={"listLink"}
                  previousLinkClassName={"listLink"}
                  activeLinkClassName={"selectedPage"}
                  disabledClassName={"disabledButtons"}
                  disableInitialCallback={true}
               />
            </div>
         </div>
      </div>
   );
};

export default App;
