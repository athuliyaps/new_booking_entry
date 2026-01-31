
import type { ChangeEvent } from 'react';

interface FormInputProps {
  name: string;
  label: any;
  value: any;
  onChange: (name: string, value: any) => void;
  required?: boolean;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  placeholder?: string;
  min?: number;
  step?: number;
  error?: string;
}

export function FormInput({ 
  name, label, value, onChange, required, type = 'text', 
  placeholder, min, step, error 
}: FormInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(name, newValue);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={handleChange}
          rows={4}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 resize-vertical
            ${error ? 'border-red-300 bg-red-50 focus:border-red-500 ring-2 ring-red-200' 
              : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}
          `}
        />
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          step={step}
          placeholder={placeholder}
          onChange={handleChange}
          className={`
            w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200
            ${error ? 'border-red-300 bg-red-50 focus:border-red-500 ring-2 ring-red-200' 
              : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}
          `}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
