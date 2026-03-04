import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoForm = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name as per government ID"
        value={formData?.fullName}
        onChange={onChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        description="We'll send verification link to this email"
        value={formData?.email}
        onChange={onChange}
        error={errors?.email}
        required
      />
      <Input
        label="Mobile Number"
        type="tel"
        name="mobile"
        placeholder="10-digit mobile number"
        value={formData?.mobile}
        onChange={onChange}
        error={errors?.mobile}
        required
        maxLength={10}
      />
      <Input
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData?.dateOfBirth}
        onChange={onChange}
        error={errors?.dateOfBirth}
        required
      />
    </div>
  );
};

export default PersonalInfoForm;