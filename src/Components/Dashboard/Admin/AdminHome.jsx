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
            <section className="text-gray-700 body-font overflow-hidden bg-white">
              <div className="lg:w-4/5 mx-auto flex flex-wrap" >
                <img
                  alt="photo"
                  className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                  src={user.photoURL}
                ></img>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-lg title-font text-red-400 font-semibold tracking-widest"> Owner Info:
                  </h2>
                  <div className="divider"></div>
                  <h2 className="text-lg title-font text-gray-900 font-medium tracking-widest">Name: {' '}
                    {user.displayName}
                  </h2>
                  <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
                    Email: {' '}{user.email}
                  </h1>

                </div>
              </div>

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