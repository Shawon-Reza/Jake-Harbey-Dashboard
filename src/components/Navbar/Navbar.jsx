import React, { useEffect, useRef, useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import profile from "../../assets/images/profile.png";
import { useCurrentUserQuery } from '../../Api/authApi';
import { connectWebSocketForNotifications } from '../../Api/socketService';
export default function Navbar({ onMenuClick, isSidebarOpen = false }) {
  const { data: currentUser } = useCurrentUserQuery();
  const [notificationCount, setNotificationCount] = useState(0);

  const userName = currentUser?.full_name || 'User';
  const userRole = currentUser?.role || 'Admin';
  const userImage = currentUser?.profile_picture || profile;
  const notificationSocketRef = useRef(null)







  //================================ Connect the WebSocket For Notifications ======================================\\
  useEffect(() => {
    console.log("Call webSocket")
    const socketHandler = connectWebSocketForNotifications({
      
      onMessage: (data) => {
        console.log("socket data", data)
        setNotificationCount(data?.unseen_count ?? 0)

      },

      onSeen: (messageIds, seenBy) => {
      }
    })

    if (socketHandler) {
      notificationSocketRef.current = socketHandler
    }

    return () => {
      if (notificationSocketRef.current?.close) {
        notificationSocketRef.current.close()
      }
    }
  }, [])

  // Monitor WebSocket connection status
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (notificationSocketRef.current?.getReadyState) {
        const readyState = notificationSocketRef.current.getReadyState()
        const stateNames = { 0: 'CONNECTING', 1: 'OPEN', 2: 'CLOSING', 3: 'CLOSED' }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(checkInterval)
  }, [])















  return (
    <div className="sticky top-0 z-50 flex  w-screen shrink-0 items-center justify-between border-b border-[#E7E7E7] bg-white px-4 py-4 md:w-full md:px-12">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex items-center justify-center rounded-xl p-2 text-[#2A2A2A] transition hover:bg-gray-50 md:hidden"
        aria-label="Open sidebar"
      >
        {isSidebarOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
      </button>

      <div className="ml-auto flex items-center gap-4 md:gap-10">
        {/* Notification Bell */}
        <Link to="/notifications" className="relative p-2 text-[#1A9C9C] hover:bg-gray-50 rounded-xl transition-colors group">
          <Bell className="w-8 h-8" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#A4D747] text-[#454545] text-[10px] font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {notificationCount}
            </span>
          )}
        </Link>

        {/* User Profile */}
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative">
            <div className="overflow-hidden rounded-full ring-transparent group-hover:ring-[#1A9C9C]/10 transition-all">
              <img
                src={userImage}
                alt={userName}
                className="h-11 w-11 object-cover"
                onError={(event) => {
                  event.currentTarget.src = profile;
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#28A745] border-4 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#2A2A2A] leading-tight group-hover:text-[#1A9C9C] transition-colors font-semibold">{userName}</p>
            <p className="text-sm text-[#727272]">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
