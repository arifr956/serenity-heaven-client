import { useContext } from "react";
import useMember from "../../../hooks/useMember";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../Home/SectionTitle";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { FaCcStripe } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MakePayment = () => {
    const [isMember] = useMember();
    const axiosPublic = useAxiosPublic();
    //const [apartments] = useApartments();
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

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
                                <TableRow  style={{ border: '1px solid #EF5350' }} key={book._id }>
                                    <TableCell>{book.userEmail}</TableCell>
                                    <TableCell>{book.floorNo}</TableCell>
                                    <TableCell>{book.blockName}</TableCell>
                                    <TableCell>{book.apartmentNo}</TableCell>
                                    <TableCell>{book.rent}</TableCell>
                                    <TableCell> add a month picker here</TableCell>
                                    <TableCell>
                                        <Link to={`payNow/${book._id}`}>
                                            <FaCcStripe className="text-red-400 text-2xl text-center" />
                                        </Link>
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