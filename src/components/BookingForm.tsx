
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FormInput } from './FormInput';
import { SectionWrapper } from './SectionWrapper';
import type { BookingFormData } from '../types/booking';

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    sender: { fullName: '', mobileNumber: '', email: '' },
    receiver: { fullName: '', fullAddress: '' },
    package: { weight: 0, ratePerKg: 0, totalCost: 0 }
  });
const [submit,setSubmit] = useState(false)
const [errors, setErrors] = useState({})
const resetForm = () => {
    setFormData({
      sender: { fullName: '', mobileNumber: '', email: '' },
      receiver: { fullName: '', fullAddress: '' },
      package: { weight: 0, ratePerKg: 0, totalCost: 0 }
    });
    setErrors({});
    setSubmit(false);
  };
  const updateField = (name: string, value: any) => {
    const keys = name.split('.');
    
    setFormData(prev => {
      return {
        ...prev,
        sender: keys[0] === 'sender' ? {
          ...prev.sender,
          [keys[1]]: value
        } : prev.sender,
        receiver: keys[0] === 'receiver' ? {
          ...prev.receiver,
          [keys[1]]: value
        } : prev.receiver,
        package: keys[0] === 'package' ? {
          ...prev.package,
          [keys[1]]: value
        } : prev.package
      };
    });

    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  useEffect(() => {
    const total = (formData.package.weight || 0) * (formData.package.ratePerKg || 0);
    setFormData(prev => ({
      ...prev,
      package: { ...prev.package, totalCost: total }
    }));
  }, [formData.package.weight, formData.package.ratePerKg]);
useEffect(()=>{
  if(submit){
    const timer = setTimeout(()=>{
      resetForm()
      toast.dismiss()
    },3000)
    return ()=>clearTimeout(timer)
  }
},[submit])
  const validateField = (name: string) => {
    const value = name.split('.').reduce((obj, key) => obj[key], formData as any);
    
  if (name.includes('fullName')) {
  return !value ? 'Name is required' : '';
  }
  if (name === 'receiver.fullAddress') {
  return !value ? 'Address is required' : '';
  }

    if (name === 'sender.mobileNumber') {
      return !value || !/^[6-9]\d{9}$/.test(value) ? 'Enter valid 10-digit mobile' : '';
    }
    if (name === 'package.weight' && value < 0.1) {
      return 'Weight must be > 0 kg';
    }
    if (name === 'package.ratePerKg' && value < 0.01) {
      return 'Rate must be > ₹0.0';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = [
      'sender.fullName', 'sender.mobileNumber', 
      'receiver.fullName', 'receiver.fullAddress',
      'package.weight', 'package.ratePerKg'
    ];
    
    const newErrors:any = {};
    requiredFields.forEach(field => {
      const error = validateField(field);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log(' Booking Data:', formData);
      toast.success('Booking created successfully!',{duration:3000});
      setSubmit(true)
    } else {
      toast.error('Please fix the errors shown');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-4 md:p-12">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 text-center">
            New Booking Entry
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sender Details */}
            <SectionWrapper title="Sender Details">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput 
                  name="sender.fullName" 
                  label="Full Name" 
                  value={formData.sender.fullName}
                  onChange={updateField}
                  required 
                  placeholder="Enter name"
                  error={(errors as any)['sender.fullName'] || ''}
                />
                <FormInput 
                  name="sender.mobileNumber" 
                  label="Mobile Number" 
                  value={formData.sender.mobileNumber}
                  onChange={updateField}
                  required 
                  type="tel"
                  placeholder="Enter 10 digit mobile number"
                  error={(errors as any)['sender.mobileNumber'] || ''}
                />
                <FormInput 
                  name="sender.email" 
                  label={
                  <span>
                   Email 
               <span className="text-gray-500 font-normal"> (Optional)</span>
                </span>} 
                  value={formData.sender.email || ''}
                  onChange={updateField}
                  type="email"
                  placeholder="sender@example.com"
                  error={(errors as any)['sender.email'] || ''}
                />
              </div>
            </SectionWrapper>

            {/* Receiver Details  */}
            <SectionWrapper title="Receiver Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  name="receiver.fullName" 
                  label="Full Name" 
                  value={formData.receiver.fullName}
                  onChange={updateField}
                  required 
                  placeholder="Enter name"
                  error={(errors as any)['receiver.fullName'] || ''}
                />
                <FormInput 
                  name="receiver.fullAddress" 
                  label="Full Address" 
                  value={formData.receiver.fullAddress}
                  onChange={updateField}
                  required 
                  placeholder="Enter address"
                  error={(errors as any)['receiver.fullAddress'] || ''}
                />
              </div>
            </SectionWrapper>

            {/* Package Details  */}
            <SectionWrapper title="Package Details">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput 
                  name="package.weight" 
                  label="Weight (kg)" 
                  value={formData.package.weight}
                  onChange={updateField}
                  required 
                  type="number" 
                  placeholder="0.0"
                  error={(errors as any)['package.weight'] || ''}
                />
                <FormInput 
                  name="package.ratePerKg" 
                  label="Rate per kg (₹)" 
                  value={formData.package.ratePerKg}
                  onChange={updateField}
                  required 
                  type="number" 
                  placeholder="0.0"
                  error={(errors as any)['package.ratePerKg'] || ''}
                />
                <div className="md:col-span-1 flex flex-col justify-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost
                  </label>
                  <div className="w-full px-2 py-2 bg-green-50 border-2 border-green-200 rounded-xl font-bold text-xl text-center shadow-sm">
                    ₹{formData.package.totalCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </SectionWrapper>

            <div className="text-center">
              <button
                type="submit"
                className="w-max bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-2xl text-xl font-semibold shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.00] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Create Booking
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right"
      toastOptions={{
        style:{
          fontWeight:'600',
          border:'12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0,0,0.1)'

        }
      }}
      />
    </div>
  );
}


