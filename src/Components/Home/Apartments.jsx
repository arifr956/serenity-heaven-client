import { Helmet } from "react-helmet-async";
import useApartments from "../../hooks/useApartment";
import SectionTitle from "./SectionTitle";
import SingleApartment from "./SingleApartment";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";



const Apartments = () => {
    const [apartments] = useApartments();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAgreement =(_id) =>{
        console.log(_id);
        if (!user) {
            return navigate("/login");
        }

    }
    return (
        <><Helmet>
            <title>Serenity Heaven | Apartments</title>
        </Helmet>
        <div className="mx-auto">
  <SectionTitle heading="Our Apartments"></SectionTitle>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-3 gap-5">
    {apartments.map((apartment) => (
      <div key={apartment._id} className="mx-auto"> {/* Add mx-auto class here */}
        <SingleApartment handleAgreement={handleAgreement} apartment={apartment}></SingleApartment>
      </div>
    ))}
  </div>
</div>

        </>

    );
};

export default Apartments;