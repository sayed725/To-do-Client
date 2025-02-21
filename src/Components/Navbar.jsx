import { useContext } from "react";
import { IoHome, IoNotifications } from "react-icons/io5";
import { MdCardMembership, MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";




import { CgLogOut } from "react-icons/cg";

import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  
  

  

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " active text-lg text-white underline"
              : " text-lg text-white"
          }
          to="/"
        >
         Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-[#0f2d3c]  shadow-lg">
      <div className="navbar mx-auto px-5"> 
        <div className="navbar-start">
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-7" src="/todo-logo-removebg-preview.png" alt="logo" />
            <p className="font-bold text-2xl text-white">To-Do</p>
          </Link>
        </div>

        <div className="navbar-end gap-2 sm:gap-5 mx-auto w-full">
          <ul className="flex gap-2 sm:gap-5 mx-auto lg:mx-0  text-sm ">
            <div className="flex">
              <ul className="flex gap-2 sm:gap-5">{links}</ul>
            </div>
          </ul>

          {user && (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[1] rounded-box  font-bold"
              >
                <div className="w-64 bg-white  shadow-lg rounded-lg p-5">
                  <div className=" mb-4">
                    <h2 className="text-xl font-bold">
                      {user && user?.displayName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {user && user?.email}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4">
                   
                    <Link
                      onClick={logOut}
                      className="flex items-center space-x-2 rounded-md border-2   bg-[#005694] text-white px-3 py-3 hover:bg-[#005694] hover:text-white text-center"
                    >
                      <CgLogOut className="hover:text-black" />
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;