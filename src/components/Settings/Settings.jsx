import React, { useState } from 'react';
import { Eye, EyeOff, Edit2, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountData, setAccountData] = useState({
    firstName: 'Cameron',
    lastName: 'Williamson',
    email: 'Cameron@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  });

  const [securityData, setSecurityData] = useState({
    oldPassword: 'password123',
    newPassword: 'password123',
    confirmPassword: '@uyad))11n'
  });

  const passwordRequirements = [
    { text: 'Minimum 8 characters.', met: true },
    { text: 'Use combination of uppercase and lowercase letters.', met: true },
    { text: 'Use of special characters (e.g. !, @, #, $, %).', met: true }
  ];

  const handleAccountChange = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] p-12">
      <h1 className="text-6xl font-bold text-[#2A2A2A] mb-12">Setting</h1>

      {/* Tabs Switcher */}
      <div className="max-w-[1240px] bg-white rounded-2xl p-2 mb-12 flex border border-[#E0E0E0] shadow-sm">
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-4 text-xl font-bold rounded-xl transition-all ${activeTab === 'account'
              ? 'bg-[#1A9C9C]/10 text-[#1A9C9C]'
              : 'text-[#999999] hover:text-[#454545]'
            }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-4 text-xl font-bold rounded-xl transition-all ${activeTab === 'security'
              ? 'bg-[#1A9C9C]/10 text-[#1A9C9C]'
              : 'text-[#999999] hover:text-[#454545]'
            }`}
        >
          Security
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1240px] bg-white rounded-[40px] p-12 border border-[#E0E0E0] shadow-sm">

        {/* Account Tab Content */}
        {activeTab === 'account' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-[#2A2A2A] mb-10">Profile Information</h2>

            <div className="flex items-center gap-6 mb-12">
              <div className="relative group">
                <img
                  src={accountData.profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-2xl object-cover shadow-md border-4 border-white"
                />
              </div>
              <button
                className="flex items-center gap-3 px-6 py-3 border-2 border-[#E0E0E0] rounded-2xl text-lg font-bold text-[#454545] hover:bg-gray-50 transition-all group"
              >
                Change Pictures
                <Edit2 className="w-6 h-6 text-[#999999] group-hover:text-[#1A9C9C]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-3">
                <label className="block text-lg font-bold text-[#2A2A2A]">First Name</label>
                <input
                  type="text"
                  value={accountData.firstName}
                  onChange={(e) => handleAccountChange('firstName', e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-[#F0F0F0] rounded-2xl text-xl font-bold text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-lg font-bold text-[#2A2A2A]">Last Name</label>
                <input
                  type="text"
                  value={accountData.lastName}
                  onChange={(e) => handleAccountChange('lastName', e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-[#F0F0F0] rounded-2xl text-xl font-bold text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-lg font-bold text-[#2A2A2A]">Email</label>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => handleAccountChange('email', e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-[#F0F0F0] rounded-2xl text-xl font-bold text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <button className="px-10 py-4 bg-[#1A9C9C] text-white text-xl font-bold rounded-2xl hover:bg-[#158080] transition-all shadow-lg shadow-[#1A9C9C]/20">
                Update
              </button>
              <button className="text-xl font-bold text-[#1A9C9C] hover:opacity-80 transition-opacity">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Security Tab Content */}
        {activeTab === 'security' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-[#2A2A2A] mb-10">Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="space-y-3">
                <label className="block text-lg font-bold text-[#2A2A2A]">Old Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={securityData.oldPassword}
                    readOnly
                    className="w-full px-6 py-4 bg-white border-2 border-[#F0F0F0] rounded-2xl text-xl font-bold text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
                  />
                  <button
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1A9C9C] transition-colors"
                  >
                    {showOldPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-bold text-[#2A2A2A]">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={securityData.newPassword}
                    readOnly
                    className="w-full px-6 py-4 bg-white border-2 border-[#F0F0F0] rounded-2xl text-xl font-bold text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1A9C9C] transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-lg font-bold text-[#2A2A2A]">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={securityData.confirmPassword}
                    readOnly
                    className="w-full px-6 py-4 bg-white border-2 border-[#F0F0F0] rounded-2xl text-xl font-bold text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1A9C9C] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-4 mb-12">
              {passwordRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className={`p-1 rounded-full transition-all ${req.met ? 'bg-[#1A9C9C]/10' : 'bg-gray-100'}`}>
                    <CheckCircle2 className={`w-6 h-6 ${req.met ? 'text-[#1A9C9C]' : 'text-gray-300'}`} />
                  </div>
                  <span className={`text-lg transition-colors ${req.met ? 'text-[#454545] font-bold' : 'text-gray-400 font-medium'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <button className="px-10 py-4 bg-[#1A9C9C] text-white text-xl font-bold rounded-2xl hover:bg-[#158080] transition-all shadow-lg shadow-[#1A9C9C]/20">
                Update Password
              </button>
              <button className="text-xl font-bold text-[#1A9C9C] hover:opacity-80 transition-opacity">
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
