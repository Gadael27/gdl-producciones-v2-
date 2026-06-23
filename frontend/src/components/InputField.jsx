import React from 'react';
import { AlertTriangle } from 'lucide-react';

const InputField = ({ icon: Icon, label, type = "text", placeholder, value, error, touched, onChange, onBlur, children, ...props }) => (
  <div className="mb-4">
    <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
      {Icon && <Icon size={14} className={error && touched ? "text-red-500" : "text-cyan-400"} />}
      {label} <span className="text-pink-500">*</span>
    </label>
    {children || (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base outline-none transition-all duration-300 border ${
          error && touched 
            ? 'border-red-500 shadow-[0_0_10px_rgba(255,68,68,0.2)]' 
            : 'border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)]'
        }`}
        {...props}
      />
    )}
    {error && touched && (
      <div className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <AlertTriangle size={12} /> {error}
      </div>
    )}
  </div>
);

export default InputField;
