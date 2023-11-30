import { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../Home/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { FaCcStripe } from "react-icons/fa";
import useMember from "../../../hooks/useMember";

const MakePayment = () => {
    const [isMember] = useMember();
    const axiosPublic = useAxiosPublic();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    console.log(loading);

    useEffect(() => {
        axiosPublic.get('/apartments')
            .then((res) => {
                setApartments(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error fetching announcement:", error);
                setLoading(false);
            });
    }, []);

    const bookedApartments = apartments.filter(a => a.userEmail === user.email);
    console.log(bookedApartments);

    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState('January');

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handlePaymentClick = (bookId) => {
        navigate(`/dashboard/makePayment/payNow/${bookId}?month=${selectedMonth}`, { replace: true });
    };

    return (
        <div>
            <SectionTitle heading="Your Booked List"></SectionTitle>
            {isMember && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{ border: '1px solid #EF5350' }}>
                            <TableRow style={{ backgroundColor: '#394251' }}>
                                <TableCell style={{ color: 'white' }}>Email</TableCell>
                                <TableCell style={{ color: 'white' }}>Floor No</TableCell>
                                <TableCell style={{ color: 'white' }}>Block Name</TableCell>
                                <TableCell style={{ color: 'white' }}>Apartment No</TableCell>
                                <TableCell style={{ color: 'white' }}>Rent</TableCell>
                                <TableCell style={{ color: 'white' }}>Month</TableCell>
                                <TableCell style={{ color: 'white' }}>Pay Now</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookedApartments.map((book) => (
                                <TableRow style={{ border: '1px solid #EF5350' }} key={book._id}>
                                    <TableCell>{book.userEmail}</TableCell>
                                    <TableCell>{book.floorNo}</TableCell>
                                    <TableCell>{book.blockName}</TableCell>
                                    <TableCell>{book.apartmentNo}</TableCell>
                                    <TableCell>{book.rent}</TableCell>
                                    <TableCell>
                                        <select onChange={handleMonthChange} value={selectedMonth}>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <button onClick={() => handlePaymentClick(book._id)}>
                                            <FaCcStripe className="text-red-400 text-2xl text-center" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default MakePayment;
