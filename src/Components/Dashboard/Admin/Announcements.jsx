import { FormControl, InputLabel, Input, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SectionTitle from '../../Home/SectionTitle';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const useStyles = makeStyles(() => ({
    form: {
        backgroundColor: '#f0f0f0',
        margin: 2,
    },
    input: {
        backgroundColor: 'white',
        margin: 2,
    },
}));

const MyForm = () => {
    const classes = useStyles();
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        // Update formData state based on input changes
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosSecure.post('/announcements', formData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Announcement Published`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setFormData({
                        title: '',
                        description: '',
                      });
                }
            });
    };

    return (
        <>
        <Helmet>
        <title>Serenity Heaven | Manage Announcement</title>
      </Helmet>
            <SectionTitle heading="Make announcement"></SectionTitle>
            <form className={classes.form}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                        id="title"
                        className={classes.input}
                        aria-describedby="title-helper-text"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input
                        id="description"
                        className={classes.input}
                        multiline
                        rows={4}
                        aria-describedby="description-helper-text"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormControl>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    style={{ backgroundColor: '#ff2c16' }}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </>
    );
};

export default MyForm;
