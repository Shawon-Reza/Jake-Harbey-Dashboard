import React from 'react';
import { Edit2 } from 'lucide-react';
import FormInput from './FormInput';

export default function AccountSettingsTab({
  accountData,
  isUserLoading,
  fallbackProfile,
  fileInputRef,
  onImageChange,
  onAccountChange,
  onCancel,
  onUpdate,
  isUpdating,
  toDisplay,
}) {
  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-xl font-medium text-[#2A2A2A] mb-6">Profile Information</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative group">
          <img
            src={accountData.profileImage || fallbackProfile}
            alt="Profile"
            className="w-20 h-20 rounded-xl object-cover shadow-sm border-2 border-white"
            onError={(event) => {
              event.currentTarget.src = fallbackProfile;
            }}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageChange}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded-xl text-sm text-[#454545] hover:bg-gray-50 transition-all group"
        >
          Change Pictures
          <Edit2 className="w-4 h-4 text-[#999999] group-hover:text-[#1A9C9C]" />
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-[#E7E7E7] bg-[#FCFEFF] p-5">
        <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#1A9C9C]">Account</div>
        <h3 className="text-2xl font-medium text-[#2A2A2A]">{isUserLoading ? 'Loading...' : toDisplay(accountData.fullName)}</h3>
        <p className="mt-2 text-sm text-[#6B7280]">Manage your main account details and contact information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <FormInput
          label="Full Name"
          value={accountData.fullName}
          onChange={(e) => onAccountChange('fullName', e.target.value)}
          className="md:col-span-2"
        />
        <FormInput
          label="Email"
          type="email"
          value={accountData.email}
          onChange={() => {}}
          readOnly
        />
        <FormInput
          label="Phone"
          value={accountData.phone}
          onChange={(e) => onAccountChange('phone', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onUpdate}
          disabled={isUpdating}
          className="px-6 py-2.5 bg-[#1A9C9C] text-white text-base rounded-xl hover:bg-[#158080] transition-all shadow-md shadow-[#1A9C9C]/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
        <button onClick={onCancel} className="text-base text-[#1A9C9C] hover:opacity-80 transition-opacity">
          Cancel
        </button>
      </div>
    </div>
  );
}
