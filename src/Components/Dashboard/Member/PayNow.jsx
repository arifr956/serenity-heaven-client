import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../Home/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Load Stripe outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PayNow = () => {
    const apartment = useLoaderData();
    const { _id, image, floorNo, blockName, apartmentNo, rent, status, userEmail } = apartment;
    const queryParams = new URLSearchParams(window.location.search);
    const selectedMonth = queryParams.get('month');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [discountedRent, setDiscountedRent] = useState(rent);
    //server coupon code
    const [coupon, setCoupons] = useState([]);
    //user apllied coupon code
    const [couponCode, setCouponCode] = useState("");

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axiosSecure.get('/coupons');
                setCoupons(response.data);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };
        fetchCoupons();
    }, []);


   

    const handleApplyCoupon = () => {
        const selectedCoupon = coupon.find((c) => c.code === couponCode);

        if (selectedCoupon) {

            const couponValue = selectedCoupon.percentage / 100;
            const discountAmount = rent * couponValue;
            const newDiscountedRent = rent - discountAmount;

            setDiscountedRent(newDiscountedRent);
            setCouponCode('');
            toast.success(`Coupon Applied Successfully!`, {
                position: "top-center",
                autoClose: 1500,
            });
        }
        else {
            // Coupon is invalid
            toast.error("Invalid coupon code. Please try again.", {
                position: "top-center",
                autoClose: 1500,
            });

        }


    };



    return (
        <div>
            <SectionTitle heading="Pay Now"></SectionTitle>
            <div className="flex flex-col justify-center text-center my-3">
                <h3 className="text-white border-2 border-red-400">Rent = {rent}</h3>
                <p className="text-white border-2 border-red-400 my-2">Have a Coupon? </p>
                <input
                    className="py-2 border-2 border-red-400"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <h3 className="text-white border-2 border-red-400 my-2">Discount = {rent - discountedRent}</h3>
                <h3 className="text-white border-2 border-red-400">Total Payable = {discountedRent}</h3>
                <button className="bg-red-400 text-white p-2 my-2" onClick={handleApplyCoupon}>Apply Coupon</button>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm apartment={apartment}
                        selectedMonth={selectedMonth}
                        discountedRent={discountedRent} ></CheckoutForm>
                </Elements>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default PayNow;
