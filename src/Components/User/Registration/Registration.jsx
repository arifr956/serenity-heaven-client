
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

import useAuth from '../../../hooks/useAuth';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebase/firebase.config';

const Registration = () => {
    const axiosPublic = useAxiosPublic();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const { createUser, updateUserProfile } = useAuth();
    const bgImage = 'https://i.ibb.co/q0vmBDR/video-conference-online-business-call-260nw-1793651794.jpg';
    const navigate = useNavigate();

    //github login
    const handleGithubLogin = () => {

        signInWithPopup(auth, githubProvider)
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        console.log(res.data);
                        toast.success(`Successfully Logged In with Github!`, {
                            position: 'top-center',
                            autoClose: 1500,
                        });
                        navigate(location?.state ? location.state : '/');
                    })
            })

    }

    //  //google login
    const handleGoogleLogin = () => {

        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success(`Sucessfully Logged In with Google!`, {
                            position: "top-center",
                            autoClose: 1500,
                        });
                        navigate(location?.state ? location.state : '/');
                        console.log(result.user);
                    })
            })

    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        console.log(form.get('name'));
        const name = form.get('name');
        const photoURL = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        if (password.length < 6) {
            toast.error(`Password must be at least 6 characters long.`, {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // Check if password contains a capital letter
        if (!/[A-Z]/.test(password)) {
            toast.error(`Password must contain at least one capital letter.`, {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // Check if password contains a special character
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            toast.error(`Password must contain at least one special character.`, {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(name, photoURL)
                    .then(() => {

                        console.log('user added to the database');
                        toast.success(`User created Sucessfully!`, {
                            position: "top-center",
                            autoClose: 1500,
                        });
                        navigate(location?.state ? location.state : '/');

                        const userInfo = {
                            name: name,
                            email: email,
                            photoURL: photoURL,
                            role: 'user'
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    toast.success(`User created Sucessfully!`, {
                                        position: "top-center",
                                        autoClose: 1500,
                                    });
                                    navigate(location?.state ? location.state : '/');
                                }
                            });
                    })
                    .catch(error => console.log(error));
            });
    };

    return (
        <>
            <Helmet>
                <title>Serenity Heaven | Registration</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="hero-content items-center">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-transparent">
                        <form onSubmit={handleRegister} className="card-body" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <div className="flex flex-row items-center justify-center lg:justify-around gap-3">
                                <p className="mb-0 mr-4 text-lg">Register with</p>
                                <button onClick={handleGoogleLogin}
                                    type="button"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    className="mx-1 h-9 w-9 rounded-full bg-white uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    <FcGoogle className="mx-auto h-3.5 w-3.5" />
                                </button>
                                <button onClick={handleGithubLogin}
                                    type="button"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    className="mx-1 h-9 w-9 rounded-full bg-black uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    <FaGithub className="mx-auto h-3.5 w-3.5" />
                                </button>
                            </div>

                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                                    Or
                                </p>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name='photo' placeholder="Your Photo URL" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register Now</button>
                            </div>
                            <div>
                                <h3 className='text-lg'>Already Have an Account? <Link to="/login"><span className='text-red-500'>Log In Now</span></Link></h3>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Registration;
