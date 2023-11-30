import {  FaBahai, FaCalendar, FaHome, FaList, FaMicrophone, FaRegUserCircle, FaSignature, FaWarehouse, FaHistory } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useMember from "../../hooks/useMember";


const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isMember] = useMember();

  return (

    <div className="flex flex-col md:flex-row">
      {/* dashboard side bar */}
      <div className="w-full md:w-64 md:min-h-screen bg-red-400 text-white">
        <ul className="menu p-4">
         {/* admin email: arif@gmail.com password: Arif12@ */}
          {isAdmin ? (
            <>
              <li>
                <NavLink exact to="/dashboard/adminHome">
                  <FaRegUserCircle />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageMember">
                  <FaList></FaList>
                  Manage Member
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcements">
                  <FaMicrophone />
                  Make Announcement
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/agreements">
                  <FaSignature />
                  Agreement Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/coupons">
                  <FaBahai />
                  Manage Coupon
                </NavLink>
              </li>
            </>
          ) : isMember ? (
            <>
              <li>
                <NavLink exact to="/dashboard/memberHome">
                  <FaRegUserCircle />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makePayment">
                  <FaCalendar></FaCalendar>
                  Make Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaHistory />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/dashboardAnnouncement">
                  <FaCalendar></FaCalendar>
                  Announcements
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink exact to="/dashboard/userHome">
                  <FaRegUserCircle />
                  User Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/dashboardAnnouncement">
                  <FaCalendar></FaCalendar>
                  Announcements
                </NavLink>
              </li>
             
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/apartments">
              <FaWarehouse />
              Apartments
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
