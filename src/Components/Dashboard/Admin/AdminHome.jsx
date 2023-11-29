import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useApartment from "../../../hooks/useApartment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FcApproval, FcBusinessman, FcOk, FcRating } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [apartments] = useApartment();
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });


  const bookedApartments = apartments.filter(a => a.status === 'booked');
  const avaiable = apartments.length - bookedApartments.length;
  const percentAvaiable = Math.floor((avaiable / apartments.length) * 100);
  const percentBooked = Math.floor((bookedApartments.length / apartments.length) * 100);
  const members = users.filter(u => u.role === 'member');

  return (
    <div>
      <Helmet>
        <title>Serenity Heaven | Admin Home</title>
      </Helmet>
      {
        isAdmin && (<>
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

            </section>
          </div>
          <div className="stats shadow flex flex-col lg:flex-row lg:flex-wrap justify-between gap-5 my-5">

            <div className="stat mb-5 lg:mb-0">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="stat-title">Total Room</div>
              <div className="stat-value">{apartments.length}</div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat mb-5 lg:mb-0">
              <div className="stat-figure text-secondary">
                <FcApproval className="text-3xl" />
              </div>
              <div className="stat-title">Parcentage of Avaiable Room</div>
              <div className="stat-value">{percentAvaiable} %</div>
              {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>

            <div className="stat mb-5 lg:mb-0">
              <div className="stat-figure text-secondary">
                <FcOk className="text-3xl" />
              </div>
              <div className="stat-title">Parcentage of Booked Room</div>
              <div className="stat-value">{percentBooked}%</div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
            <div className="stat mb-5 lg:mb-0">
              <div className="stat-figure text-secondary">
                <FcBusinessman className="text-3xl" />
              </div>
              <div className="stat-title">Total User</div>
              <div className="stat-value">{users.length}</div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
            <div className="stat mb-5 lg:mb-0">
              <div className="stat-figure text-secondary">
                <FcRating className="text-3xl" />
              </div>
              <div className="stat-title">Total Member</div>
              <div className="stat-value">{members.length}</div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>

          </div>
        </>
        )
      }

    </div>
  );
};

export default AdminHome;