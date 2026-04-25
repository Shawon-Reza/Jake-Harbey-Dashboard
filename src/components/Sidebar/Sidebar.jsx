import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { LuSettings } from "react-icons/lu";
import {
  BriefcaseBusiness,
  CreditCard,
  House,
  LogOut,
  X,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import logo from "../../assets/images/logo.svg";
import { toast } from "sonner";

export default function Sidebar({ onNavigate, onClose }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.removeItem("auth");
      dispatch(logout());
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Error occurred while logging out.");
    }
  };

  const handleNavigate = () => {
    if (typeof onNavigate === "function") {
      onNavigate();
    }
  };

  return (
    <div className="sticky left-0 z-20 flex h-screen w-full flex-col justify-between bg-primary text-[#FFFCFC] md:w-64 xl:w-72">
      <button
        type="button"
        onClick={onClose}
        className="absolute left-4 top-4 z-30 rounded-lg p-2 text-white transition hover:bg-[#0ACCFF] md:hidden"
        aria-label="Close sidebar"
      >
        <X className="h-7 w-7" />
      </button>

      <div className="mx-auto p-10 md:mx-0 md:p-10">
        <img src={logo} alt="" />
      </div>

      <nav className="mt-6 flex-1 font-poppins md:mt-10">
        <ul className="flex w-full flex-col items-stretch space-y-3 px-4 md:block md:px-0">
          <h1 className="w-full px-0 text-center md:px-12 md:text-left">GENERAL</h1>
          <li className="w-full px-0 md:px-8">
            <NavLink
              to="/"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <House className="shrink-0 text-2xl md:mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4 w-full px-0 md:px-8">
            <NavLink
              to="/users"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <Users className="shrink-0 text-2xl md:mr-3" />
              User Management
            </NavLink>
          </li>
          <li className="w-full px-0 md:px-8">
            <NavLink
              to="/inbox"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <BriefcaseBusiness className="shrink-0 text-2xl md:mr-3" />
              Inbox
            </NavLink>
          </li>
          <li className="w-full px-0 md:px-8">
            <NavLink
              to="/jobs"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <BriefcaseBusiness className="shrink-0 text-2xl md:mr-3" />
              Jobs
            </NavLink>
          </li>
          <li className="w-full px-0 md:px-8">
            <NavLink
              to="/technicians"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <Users className="shrink-0 text-2xl md:mr-3" />
              Technicians
            </NavLink>
          </li>
          <li className="mb-4 w-full px-0 md:px-8">
            <NavLink
              to="/customers"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <Users className="shrink-0 text-2xl md:mr-3" />
              Customers
            </NavLink>
          </li>
          <li className="mb-4 w-full px-0 md:px-8">
            <NavLink
              to="/subscription"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <CreditCard className="shrink-0 text-2xl md:mr-3" />
              Subscription Plans
            </NavLink>
          </li>
          <h1 className="w-full px-0 pt-4 text-center md:px-12 md:text-left">TOOLS</h1>
          <li className="w-full px-0 md:px-8">
            <NavLink
              to="/settings"
              onClick={handleNavigate}
              className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-[#FFFCFC] hover:bg-[#0ACCFF] md:justify-start md:gap-0 md:text-left"
            >
              <LuSettings className="shrink-0 text-2xl md:mr-3" />
              Account & Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <Link to="/login">
        <button
          onClick={handleLogout}
          className="mx-auto flex w-full items-center px-8 py-8 text-xl text-[#FFFCFC]"
        >
          <LogOut className="mr-3" />
          Logout
        </button>
      </Link>
    </div>
  );
}
