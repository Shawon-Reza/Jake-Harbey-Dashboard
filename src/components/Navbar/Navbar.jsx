import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from "../../assets/images/profile.png";
export default function Navbar() {
  return (
    <div className="flex h-24 px-12 py-8 items-center justify-end border-b bg-white border-[#E7E7E7] w-full sticky top-0 z-50">
      <div className="flex items-center gap-10">
        {/* Notification Bell */}
        <Link to="/notifications" className="relative p-2 text-[#1A9C9C] hover:bg-gray-50 rounded-xl transition-colors group">
          <Bell className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 bg-[#A4D747] text-[#454545] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            6
          </span>
        </Link>

        {/* User Profile */}
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative">
            <div className=" overflow-hidden ring-transparent group-hover:ring-[#1A9C9C]/10 transition-all">
              <img
                src={profile}
                alt="Christopher Miller"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#28A745] border-4 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#2A2A2A] leading-tight group-hover:text-[#1A9C9C] transition-colors">Christopher Miller</p>
            <p className="text-sm text-[#727272]">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
