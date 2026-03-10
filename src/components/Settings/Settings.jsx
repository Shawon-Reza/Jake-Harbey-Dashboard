import React, { useState } from 'react';
import { Eye, EyeOff, Edit2 } from 'lucide-react';

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
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const passwordRequirements = [
    { text: 'Minimum 8 characters.', met: securityData.newPassword.length >= 8 },
    { text: 'Use combination of uppercase and lowercase letters.', met: /[a-z]/.test(securityData.newPassword) && /[A-Z]/.test(securityData.newPassword) },
    { text: 'Use of special characters (e.g. !, @, #, $, %).', met: /[!@#$%^&*]/.test(securityData.newPassword) }
  ];

  const handleAccountChange = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureChange = () => {
    // File input logic would go here
    console.log('Change picture clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Setting</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg p-1 mb-8 flex gap-4 border border-gray-200">
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-3 px-6 rounded-lg transition-colors ${
            activeTab === 'account'
              ? 'bg-white text-gray-700 border border-gray-200'
              : 'text-gray-400'
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-3 px-6 rounded-lg transition-colors ${
            activeTab === 'security'
              ? 'bg-teal-200 text-teal-700'
              : 'text-gray-400'
          }`}
        >
          Security
        </button>
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-8">Profile Information</h2>
          
          <div className="flex items-end gap-6 mb-8">
            <img
              src={accountData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <button
              onClick={handleProfilePictureChange}
              className="border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Change Pictures
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={accountData.firstName}
                onChange={(e) => handleAccountChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={accountData.lastName}
                onChange={(e) => handleAccountChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={accountData.email}
                onChange={(e) => handleAccountChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Update
            </button>
            <button className="text-teal-600 hover:text-teal-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-8">Password</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Old Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={securityData.oldPassword}
                  onChange={(e) => handleSecurityChange('oldPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={securityData.newPassword}
                  onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={securityData.confirmPassword}
                  onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-3">
            {passwordRequirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 ${req.met ? 'text-teal-600' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={req.met ? 'text-gray-700' : 'text-gray-400'}>{req.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Update Password
            </button>
            <button className="text-teal-600 hover:text-teal-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
