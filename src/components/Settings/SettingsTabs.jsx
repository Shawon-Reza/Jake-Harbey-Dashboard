import React from 'react';

export default function SettingsTabs({ activeTab, onChange }) {
  return (
    <div className="max-w-7xl bg-white rounded-xl p-1.5 mb-6 flex border border-[#E0E0E0] shadow-sm">
      <button
        onClick={() => onChange('account')}
        className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-all ${
          activeTab === 'account' ? 'bg-[#BBE2E2] text-[#1A9C9C]' : 'text-[#999999] hover:text-[#454545]'
        }`}
      >
        Account
      </button>
      <button
        onClick={() => onChange('security')}
        className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-all ${
          activeTab === 'security' ? 'bg-[#BBE2E2] text-[#1A9C9C]' : 'text-[#999999] hover:text-[#454545]'
        }`}
      >
        Security
      </button>
    </div>
  );
}
