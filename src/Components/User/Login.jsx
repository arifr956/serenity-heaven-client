// import { useContext } from 'react';
// import { FaGithub } from 'react-icons/fa';
// import { FcGoogle } from "react-icons/fc";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from "../../providers/AuthProvider";
// import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import app from '../../firebase/firebase.config';
 import { Helmet } from 'react-helmet-async';
// import useAuth from '../../hooks/useAuth';

const Login = () => {

//     const { signIn } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();



//     const auth = useAuth();
//     // const auth = getAuth(app);
//     const googleProvider = new GoogleAuthProvider();
//     const githubProvider = new GithubAuthProvider();

//     //github login
//     const handleGithubLogin = () =>{
//       signInWithPopup(auth,githubProvider)
//       .then(result => {
//         toast.success(`Sucessfully Logged In with Github!`, {
//             position: "top-center",
//             autoClose: 3000,
//         });
//         navigate(location?.state ? location.state : '/');
//         console.log(result.user);
//     })
//     .catch()
//     }

//  //google login
//     const handleGoogleLogin = () =>{
//           signInWithPopup(auth,googleProvider)
//           .then(result => {
//             toast.success(`Sucessfully Logged In with Google!`, {
//                 position: "top-center",
//                 autoClose: 3000,
//             });
//             navigate(location?.state ? location.state : '/');
//             console.log(result.user);
//         })
//         .catch()
//     }


//     const handleLogin = e =>{
//       e.preventDefault();

//       const form = new FormData(e.currentTarget);
//       console.log(form.get('name'));
//       const email = form.get('email');
//       const password = form.get('password');

//       signIn(email,password)
//         .then(result => {
//             toast.success(`Hi ! Welcome Back !`, {
//                 position: "top-center",
//                 autoClose: 3000,
//             });
//             navigate(location?.state ? location.state : '/');
//             console.log(result.user);
//         })
//        .catch((error) => {
//       // Check if the error message contains information about email/password mismatch
//       if (
//         error.code === "auth/wrong-password" ||
//         error.code === "auth/user-not-found" ||
//         error.code === "auth/invalid-login-credentials"
//       ) {
//         toast.error("Invalid email or password. Please try again.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }

//       // toast.error("Invalid email or password. Please try again.", {
//       //     position: "top-center",
//       //     autoClose: 3000,
//       //   });
//     });
//     }

    return (
        <>
        <Helmet>
                <title>Serenity Heaven | Login</title>
            </Helmet>
            <div>login</div>
       
      </>
    );
  };
  
  export default Login;
  

