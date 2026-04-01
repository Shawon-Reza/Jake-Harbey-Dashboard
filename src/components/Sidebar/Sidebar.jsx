import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { LuSettings } from "react-icons/lu";
import {
  BriefcaseBusiness,
  CreditCard,
  House,
  LogOut,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import logo from "../../assets/images/logo.svg";

export default function Sidebar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className=" bg-primary text-[#FFFCFC] h-screen sticky left-0 z-20 flex flex-col justify-between w-48 md:w-64 xl:w-72">
      <div className="p-10 mx-auto">
        <img src={logo} alt="" />
      </div>

      <nav className="flex-1 font-poppins mt-10">
        <ul className="space-y-3">
          <h1 className="px-12">GENERAL</h1>
          <li className="px-8">
            <NavLink
              to={"/"}
              className="flex items-center hover:bg-[#0ACCFF] text-[#FFFCFC] px-4 py-4 rounded-lg"
            >
              <House className="mr-3 text-2xl" />
              Dashboard
            </NavLink>
          </li>
          <li className="px-8 mb-4">
            <NavLink
              to={"/users"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <Users className="mr-3 text-2xl" />
              User Management
            </NavLink>
          </li>
          <li className="px-8">
            <NavLink
              to={"/inbox"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <BriefcaseBusiness className="mr-3 text-2xl" />
              Inbox
            </NavLink>
          </li>
          <li className="px-8">
            <NavLink
              to={"/jobs"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <BriefcaseBusiness className="mr-3 text-2xl" />
              Jobs
            </NavLink>
          </li>
          <li className="px-8">
            <NavLink
              to={"/technicians"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <Users className="mr-3 text-2xl" />
              Technicians
            </NavLink>
          </li>
          <li className="px-8 mb-4">
            <NavLink
              to={"/customers"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <Users className="mr-3 text-2xl" />
              Customers
            </NavLink>
          </li>
          <li className="px-8 mb-4">
            <NavLink
              to={"/subscription"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <CreditCard className="mr-3 text-2xl" />
              Subscription Plans
            </NavLink>
          </li>
          <h1 className="px-12 pt-4">TOOLS</h1>
          <li className="px-8">
            <NavLink
              to={"/settings"}
              className="flex items-center px-4 py-4 hover:bg-[#0ACCFF] text-[#FFFCFC] rounded-lg"
            >
              <LuSettings className="mr-3 text-2xl" />
              Account & Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to={"/login"}>
        <button
          onClick={handleLogout}
          className="flex items-center px-8 py-8 text-xl w-full mx-auto text-[#FFFCFC]"
        >
          <LogOut className="mr-3" />
          Logout
        </button>
      </Link>
    </div>
  );
}
