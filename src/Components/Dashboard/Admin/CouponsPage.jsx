// CouponsPage.js

import { useState, useEffect } from 'react';
import { Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@material-ui/core';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const CouponsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [couponData, setCouponData] = useState({
    code: '',
    percentage: '',
    description: ''
  });

  // Fetch coupons from the database
  const fetchCoupons = async () => {
    try {
      const response = await axiosSecure.get('/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

 
  const handleFormSubmit = async () => {
    try {
      await axiosSecure.post('/coupons', couponData);
      setOpenModal(false);
      setCouponData({
        code: '',
        percentage: '',
        description: ''
      });
      fetchCoupons(); 
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  const handleRemoveCoupon =(_id) =>{
    console.log(_id)
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/coupons/${_id}`).then((res) => {
            if (res.data.deletedCount > 0) {
                fetchCoupons();
              Swal.fire({
                title: "Deleted!",
                text: "Your coupon has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  }

  return (
    <div>
      <Helmet>
        <title>Serenity Heaven | Coupons</title>
      </Helmet>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
        Add Coupon
      </Button>

      {/* Modal*/}
      <Modal open={openModal} onClose={() => setOpenModal(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container justify="center">
          <Grid item xs={10} sm={6} md={4}>
            <Paper>
              <div style={{ padding: '20px' }}>
                <TextField
                  label="Coupon Code"
                  name="code"
                  value={couponData.code}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Discount Percentage"
                  name="percentage"
                  value={couponData.percentage}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Coupon Description"
                  name="description"
                  value={couponData.description}
                  onChange={handleInputChange}
                  fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleFormSubmit} style={{ marginTop: '10px' }}>
                  Submit
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Modal>

     
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ border: '1px solid #EF5350' }}>
            <TableRow style={{ backgroundColor: '#394251' }}>
              <TableCell  style={{ color: 'white' }}>Coupon Code</TableCell>
              <TableCell  style={{ color: 'white' }}>Discount Percentage</TableCell>
              <TableCell  style={{ color: 'white' }}>Coupon Description</TableCell>
              <TableCell  style={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow style={{ border: '1px solid #EF5350' }} key={coupon._id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.percentage}</TableCell>
                <TableCell>{coupon.description}</TableCell>
                <TableCell onClick={()=> handleRemoveCoupon(coupon._id)}><FaTrashAlt></FaTrashAlt></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CouponsPage;
