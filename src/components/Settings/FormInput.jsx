import React from 'react';

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  className = '',
  readOnly = false,
  disabled = false,
}) {
  return (
    <div className={`space-y-2 ${className}`.trim()}>
      <label className="block text-sm font-medium text-[#2A2A2A]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl font-medium text-sm text-[#454545] focus:border-[#1A9C9C] focus:outline-none transition-all shadow-sm ${
          readOnly || disabled ? 'bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
}
