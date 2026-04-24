import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import PasswordInput from './PasswordInput';

export default function SecuritySettingsTab({
  showOldPassword,
  showNewPassword,
  showConfirmPassword,
  securityData,
  passwordRequirements,
  onSecurityChange,
  onToggleOldPassword,
  onToggleNewPassword,
  onToggleConfirmPassword,
  onUpdatePassword,
  onCancel,
  isUpdatingPassword,
}) {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-xl text-[#2A2A2A] mb-6">Password</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <PasswordInput
          label="Old Password"
          isVisible={showOldPassword}
          value={securityData.oldPassword}
          onChange={(e) => onSecurityChange('oldPassword', e.target.value)}
          onToggle={onToggleOldPassword}
        />
        <PasswordInput
          label="New Password"
          isVisible={showNewPassword}
          value={securityData.newPassword}
          onChange={(e) => onSecurityChange('newPassword', e.target.value)}
          onToggle={onToggleNewPassword}
        />
        <PasswordInput
          label="Confirm Password"
          isVisible={showConfirmPassword}
          value={securityData.confirmPassword}
          onChange={(e) => onSecurityChange('confirmPassword', e.target.value)}
          onToggle={onToggleConfirmPassword}
        />
      </div>

      <div className="space-y-1.5 mb-8">
        {passwordRequirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-2 group">
            <div className={`p-0.5 rounded-full transition-all ${req.met ? 'bg-[#1A9C9C]/10' : 'bg-gray-100'}`}>
              <CheckCircle2 className={`w-5 h-5 ${req.met ? 'text-[#1A9C9C]' : 'text-gray-300'}`} />
            </div>
            <span className={`text-sm transition-colors ${req.met ? 'text-[#454545]' : 'text-gray-400 font-medium'}`}>
              {req.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onUpdatePassword}
          disabled={isUpdatingPassword}
          className="px-6 py-2.5 bg-[#1A9C9C] text-white text-sm rounded-xl hover:bg-[#158080] transition-all shadow-md shadow-[#1A9C9C]/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
        </button>
        <button onClick={onCancel} className="text-sm text-[#1A9C9C] hover:opacity-80 transition-opacity">Cancel</button>
      </div>
    </div>
  );
}
