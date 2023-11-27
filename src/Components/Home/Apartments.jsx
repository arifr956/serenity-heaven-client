import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import useApartments from "../../hooks/useApartment";
import SectionTitle from "./SectionTitle";
import SingleApartment from "./SingleApartment";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Pagination.css";


const Apartments = () => {
  const [apartments] = useApartments();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const apartmentsPerPage = 6;
  const pagesVisited = pageNumber * apartmentsPerPage;

  // Slice apartments array to show only the required ones
  const displayedApartments = apartments.slice(
    pagesVisited,
    pagesVisited + apartmentsPerPage
  );

  // Total number of pages
  const pageCount = Math.ceil(apartments.length / apartmentsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleAgreement = (_id) => {
    console.log(_id);
    if (!user) {
      return navigate("/login");
    }
  };

  useEffect(() => {
    // Reset page number when apartments change
    setPageNumber(0);
  }, [apartments]);

  return (
    <>
      <Helmet>
        <title>Serenity Heaven | Apartments</title>
      </Helmet>
      <div className="mx-auto">
        <SectionTitle heading="Our Apartments" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-3 gap-5">
          {displayedApartments.map((apartment) => (
            <div key={apartment._id} className="mx-auto">
              <SingleApartment
                handleAgreement={handleAgreement}
                apartment={apartment}
              />
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={<ArrowBackIcon />}
          nextLabel={<ArrowForwardIcon />}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          breakClassName={"pagination__break-me"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
          previousLinkStyle={{
            color: "#EF5350",
          }}
          nextLinkStyle={{
            color: "#EF5350",
          }}
          breakLinkStyle={{
            color: "#EF5350",
          }}
          pageLinkStyle={{
            color: "#EF5350",
          }}
          activeLinkStyle={{
            fontWeight: "bold",
          }}
        />
      </div>
    </>
  );
};

export default Apartments;
