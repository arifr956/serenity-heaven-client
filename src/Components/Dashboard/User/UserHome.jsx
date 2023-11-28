import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useMember from "../../../hooks/useMember";
import useAgreement from "../../../hooks/useAgreement";
import { BsCalendarDate } from "react-icons/bs";

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
                        <section className="text-gray-700 body-font overflow-hidden bg-white">
                            <div className="container px-5 py-24 mx-auto">
                                {userAgreements.map((userAgreement) => (
                                    <div
                                        key={userAgreement._id}
                                        className="lg:w-4/5 mx-auto flex flex-wrap"
                                    >
                                        <img
                                            alt="ecommerce"
                                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                            src={user.photoURL}
                                        ></img>
                                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                            <h2 className="text-lg title-font text-gray-900 font-medium tracking-widest">Name :
                                                {user.displayName}
                                            </h2>
                                            <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
                                                {user.email}
                                            </h1>
                                            <h2 className="text-xl title-font text-gray-600 text-2xl font-medium tracking-widest">
                                                BlockNo :{userAgreement.blockName}
                                            </h2>
                                            <h1 className="text-gray-900 text-xl title-font  mb-1">
                                                FloorNo :{userAgreement.floorNo}
                                            </h1>
                                            <span className="flex items-center">
                                                    <span className="text-gray-600 ml-3 font-medium flex items-center gap-3">
                                                        RoomNo :{userAgreement.apartmentNo}
                                                    </span>
                                                </span>
                                            <div className="flex mb-4">
                                                
                                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                                    <span className="title-font font-medium text-2xl text-gray-900 flex items-center gap-2">
                                                        <BsCalendarDate />
                                                        Date:{' '}
                                                        {userAgreement.accepteDate}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
