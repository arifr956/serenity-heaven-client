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

    useEffect(() => {
        axiosSecure.get(`/payments/${user.email}`)
            .then((res) => {
                setPayments(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error fetching announcement:", error);
                setLoading(false);
            });
    }, []);

    const myHistory = payments;
    //const myHistory = payments.filter(a => a.userEmail === user.email);
    return (
        <div>
            <Helmet>
                <title>Serenity Heaven | Payments</title>
            </Helmet>
            <SectionTitle heading="Payment History"></SectionTitle>
            {isMember && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead  style={{ border: '1px solid #EF5350' }}>
                            <TableRow style={{ backgroundColor: '#394251' }}>
                                <TableCell  style={{ color: 'white' }}>Email</TableCell>
                                <TableCell  style={{ color: 'white' }}>Floor</TableCell>
                                <TableCell  style={{ color: 'white' }}>Block Name</TableCell>
                                <TableCell  style={{ color: 'white' }}>ApartmentNo</TableCell>
                                <TableCell  style={{ color: 'white' }}>status</TableCell>
                                <TableCell  style={{ color: 'white' }}>Month</TableCell>
                                <TableCell  style={{ color: 'white' }}>Paid Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myHistory.map((paid) => (
                                <TableRow  style={{ border: '1px solid #EF5350' }} key={paid._id}>
                                    <TableCell>{paid.userEmail}</TableCell>
                                    <TableCell>{paid.floorNo}</TableCell>
                                    <TableCell>{paid.blockName}</TableCell>
                                    <TableCell>{paid.apartmentNo}</TableCell>
                                    <TableCell>{paid.status}</TableCell>
                                    <TableCell>{paid.month}</TableCell>
                                    <TableCell>{paid.rentPaid}</TableCell>
                                    
                                    
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