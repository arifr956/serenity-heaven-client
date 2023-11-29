import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FcAcceptDatabase, FcDeleteDatabase } from "react-icons/fc";
import Swal from "sweetalert2";
import SectionTitle from "../../Home/SectionTitle";
import { Helmet } from "react-helmet-async";


const Agreements = () => {
    const axiosSecure = useAxiosSecure();

    const { data: agreements = [], refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements');
            return res.data;
        }
    })
    const pendingAgreements = agreements.filter(a => a.status === 'pending');
    console.log(pendingAgreements);

    const handleAccept = async (a) => {
        try {
            const currentDate = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');

            const update = {
                status: 'Checked',
                acceptDate: currentDate
            };

            const updateRes = await axiosSecure.patch(`/agreements/${a._id}`, update);

            if (updateRes.data.modifiedCount > 0) {
                refetch();
                // Make member
                const memberRes = await axiosSecure.patch(`/users/${a.email}`);

                if (memberRes.data.modifiedCount > 0) {
                    console.log('Memeber Created');

                    const apartmentRes = await axiosSecure.patch(`/apartments/apartment/${a.apartmentId}`);

                    if (apartmentRes.data.modifiedCount > 0) {
                        console.log('Apartment booked');
                    }
                }
                //change apartment status
                const update = {
                    status: 'booked',
                    userEmail: a.email,

                }
                const apartmentRes = await axiosSecure.patch(`/apartments/apartment/${a.apartmentId}`, update);

                if (apartmentRes.data.modifiedCount > 0) {
                    console.log('Apartment booked');
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Agreements Accepted!',
                    showConfirmButton: false,
                    timer: 1500
                });


            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('An error occurred:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
            });
        }
    };



    const handleReject = async (a) => {
        const currentDate = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');

        const update = {
            status: 'Checked',
            acceptDate: currentDate
        }
        const updateRes = await axiosSecure.patch(`/agreements/${a._id}`, update);
        console.log(updateRes.data)
        if (updateRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({

                icon: "error",
                title: `Agreements Rejected!`,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }

    return (
        <div>
            <Helmet>
                <title>Serenity Heaven | Agreements</title>
            </Helmet>
            <SectionTitle heading={`Pending Agreement ${pendingAgreements.length}`}></SectionTitle>

            <div className="flex flex-wrap gap-4">
                {pendingAgreements?.map((a) => (
                    <div key={a._id} className="flex flex-col bg-white w-72 h-auto rounded-md p-4 border shadow-md">
                        <h3 className="text-center font-bold text-xl text-gray-800 pb-2">{a.userName}</h3>
                        <h3 className="text-center font-bold text-xl text-gray-800 pb-2">{a.email}</h3>
                        <h3 className="text-base font-semibold text-gray-900">Block Name:{a.blockName}</h3>
                        <p className="text-sm text-gray-500 pb-1">Floor: {a.floorNo}</p>
                        <p className="text-sm text-gray-500 pb-1">Apartment: {a.apartmentNo}</p>
                        <p className="text-sm text-gray-500 pb-1">Date: {a.date}</p>
                        <div className="flex justify-between items-center border-b pb-2">
                            <p className="text-sm text-gray-500">Rent:</p>
                            <p className="text-sm text-gray-700 font-semibold">${a.rent}</p>
                        </div>
                        <div className="flex justify-around items-center py-3">
                            <div className="flex items-center gap-2 text-green-700 cursor-pointer" onClick={() => handleAccept(a)}>
                                <FcAcceptDatabase />
                                <span className="font-semibold text-sm">Accept</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-700 cursor-pointer" onClick={() => handleReject(a)}>
                                <FcDeleteDatabase />
                                <span className="font-semibold text-sm">Reject</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Agreements;