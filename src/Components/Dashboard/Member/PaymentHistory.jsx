import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Home/SectionTitle";
import useMember from "../../../hooks/useMember";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useEffect } from "react";

const PaymentHistory = () => {
    const [isMember] = useMember();
    const axiosSecure = useAxiosSecure();
   
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     axiosSecure.get('/payments')
    //         .then((res) => {
    //             setPayments(res.data);
    //             setLoading(false);
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching announcement:", error);
    //             setLoading(false);
    //         });
    // }, []);

    const myHistory = payments.filter(a => a.userEmail === user.email);
    return (
        <div>
            <Helmet>
                <title>Serenity Heaven | Payments</title>
            </Helmet>
            <SectionTitle heading="Payment History"></SectionTitle>
            {isMember && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Floor</TableCell>
                                <TableCell>Block Name</TableCell>
                                <TableCell>paymentNo</TableCell>
                                <TableCell>Rent</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Pay Now</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myHistory.map((book) => (
                                <TableRow key={book._id}>
                                    <TableCell>{book.userEmail}</TableCell>
                                    <TableCell>{book.floorNo}</TableCell>
                                    <TableCell>{book.blockName}</TableCell>
                                    <TableCell>{book.apartmentNo}</TableCell>
                                    <TableCell>{book.rent}</TableCell>
                                    <TableCell> add a month picker here</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default PaymentHistory;