import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useMember from "../../../hooks/useMember";
import useAgreement from "../../../hooks/useAgreement";
import { BsCalendarDate } from "react-icons/bs";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const [isMember] = useMember();
    const [agreement] = useAgreement();
    const userAgreements = agreement.filter((a) => a.email === user.email);
    console.log(userAgreements);

    return (
        <div>
            {isMember ? (
                <>
                    <div>
                        <div className="flex flex-col justify-center items-center ">
                            <h3 className="text-4xl font-bold my-5">
                                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">Your Profile</span>
                            </h3>
                            <div className="w-[90%] md:w-1/2 mb-12">
                                <div className="my-10 md:my-14 px-6 py-6 text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10">


                                    <div className="space-y-4 xl:space-y-6">
                                        <img className="mx-auto rounded-full h-36 w-36" src={user.photoURL} alt="author avatar" />
                                        <div className="space-y-2">
                                            <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                                                <h3 className="text-white">{user.displayName}</h3>
                                                <p className="text-indigo-300">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="text-gray-700 body-font overflow-hidden bg-white">
                            <div className="container px-5 py-24 mx-auto">

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead style={{ border: '1px solid #EF5350' }}>
                                            <TableRow style={{ backgroundColor: '#394251'}}>
                                                <TableCell style={{ color: 'white' }}>Floor No</TableCell>
                                                <TableCell style={{ color: 'white' }}>Block Name</TableCell>
                                                <TableCell style={{ color: 'white' }}>Apartment No</TableCell>
                                                <TableCell style={{ color: 'white' }}>Rent</TableCell>
                                                <TableCell style={{ color: 'white' }}>Accept Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userAgreements.map((userAgreement) => (
                                                <TableRow style={{ border: '1px solid #EF5350' }} key={userAgreement._id}>
                                                    <TableCell>{userAgreement.floorNo}</TableCell>
                                                    <TableCell>{userAgreement.blockName}</TableCell>
                                                    <TableCell>{userAgreement.apartmentNo}</TableCell>
                                                    <TableCell>{userAgreement.rent}</TableCell>
                                                    <TableCell>{userAgreement.acceptDate}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </div>
                        </section>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <section className="text-gray-700 body-font overflow-hidden bg-white">
                            <div className="container px-5 py-24 mx-auto">
                                <div
                                    className="lg:w-4/5 mx-auto flex flex-wrap"
                                >
                                    <img
                                        alt="ecommerce"
                                        className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                        src={user.photoURL}
                                    ></img>
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                            {user.displayName}
                                        </h2>
                                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                            {user.email}
                                        </h1>
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                            BlockNo : None
                                        </h2>
                                        <h1 className="text-gray-900 text-xl title-font  mb-1">
                                            FloorNo : None
                                        </h1>
                                        <span className="flex items-center">
                                            <span className="text-gray-600 ml-3 font-medium flex items-center gap-3">
                                                RoomNo : None
                                            </span>
                                        </span>
                                        <div className="flex">

                                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                                <span className="title-font font-medium text-2xl text-gray-900 flex items-center gap-2">
                                                    <BsCalendarDate />
                                                    Date:{' '}None
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserHome;
