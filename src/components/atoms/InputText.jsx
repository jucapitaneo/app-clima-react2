import React from 'react';

export default function InputText({ value, onChange, placeholder, name, ...rest }) {
  return (
    <input
      name={name}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
      {...rest}
    />
  );
}