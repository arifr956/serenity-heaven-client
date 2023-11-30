import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Home/SectionTitle";
import useMember from "../../../hooks/useMember";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
    const [isMember] = useMember();
    const axiosSecure = useAxiosSecure();

    const [payments, setPayments] = useState([]);
    const [payFilter, setPayFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axiosSecure.get(`/payments/${user.email}`)
            .then((res) => {
                setPayments(res.data);
                setPayFilter(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error fetching announcement:", error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        const input = event.target.value;
        setSearchTerm(input);
    
        //filter by number 1-12
        if (!isNaN(input) && parseInt(input) >= 1 && parseInt(input) <= 12) {
          const monthName = new Date(new Date().getFullYear(), parseInt(input) - 1, 1)
            .toLocaleString('default', { month: 'long' })
            .toLowerCase();
    
          const filteredPayments = payFilter.filter(
            (paid) =>
              paid.month.toLowerCase().includes(monthName) ||
              paid.month.toLowerCase().includes(input)
          );
    
          setPayments(filteredPayments);
        } else {
          //filter by month
          const filteredPayments = payFilter.filter((paid) =>
            paid.month.toLowerCase().includes(input.toLowerCase())
          );
    
          setPayments(filteredPayments);
        }
      };
      
      
    return (
        <div>
            <Helmet>
                <title>Serenity Heaven | Payments</title>
            </Helmet>
            <SectionTitle heading="Payment History">
               
            </SectionTitle>
            {isMember && (
                
                <>
                 <TextField
          label="Search by Month"
          variant="outlined"
          color="secondary"
          placeholder="Enter month name or number"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            marginBottom: '16px',
            borderColor: '#FF0000',
            color: '#FFFFFF',
          }}
        />
                <TableContainer component={Paper}>
                    <Table>
                    <TableHead  style={{ border: '1px solid #EF5350' }}>
                            <TableRow style={{ backgroundColor: '#394251' }}>
                            <TableCell style={{ color: 'white' }}>Email</TableCell>
                            <TableCell style={{ color: 'white' }}>Floor</TableCell>
                            <TableCell style={{ color: 'white' }}>Block Name</TableCell>
                            <TableCell style={{ color: 'white' }}>ApartmentNo</TableCell>
                            <TableCell style={{ color: 'white' }}>status</TableCell>
                            <TableCell style={{ color: 'white' }}>Month</TableCell>
                            <TableCell style={{ color: 'white' }}>Paid Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((paid) => (
                                <TableRow style={{ border: '1px solid #EF5350' }} key={paid._id}>
                                    <TableCell>{paid.email}</TableCell>
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
                </>
            )}
        </div>
    );
};

export default PaymentHistory;
