import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ label, value, onChange, isVisible, onToggle }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#2A2A2A]">{label}</label>
      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm"
        />
        <button
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1A9C9C] transition-colors"
        >
          {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
