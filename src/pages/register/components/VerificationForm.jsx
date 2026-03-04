import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const VerificationForm = ({ formData, errors, onChange, onFileChange }) => {
  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        label="Aadhaar Number"
        type="text"
        name="aadhaar"
        placeholder="12-digit Aadhaar number"
        description="Your Aadhaar details are encrypted and secure"
        value={formData?.aadhaar}
        onChange={onChange}
        error={errors?.aadhaar}
        required
        maxLength={12}
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Upload Identity Proof <span className="text-destructive">*</span>
        </label>
        <p className="text-xs text-muted-foreground">
          Accepted: Aadhaar Card, Voter ID, Driving License (Max 5MB, PDF/JPG/PNG)
        </p>
        <div className="relative">
          <input
            type="file"
            name="identityProof"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onFileChange}
            className="hidden"
            id="identityProof"
          />
          <label
            htmlFor="identityProof"
            className="flex items-center justify-center w-full px-4 py-8 md:py-10 lg:py-12 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors duration-250"
          >
            <div className="text-center">
              <Icon name="Upload" size={32} color="var(--color-muted-foreground)" />
              <p className="mt-2 text-sm text-muted-foreground">
                {formData?.identityProof ? formData?.identityProof?.name : 'Click to upload document'}
              </p>
            </div>
          </label>
        </div>
        {errors?.identityProof && (
          <p className="text-xs text-destructive">{errors?.identityProof}</p>
        )}
      </div>
      <Input
        label="Create Password"
        type="password"
        name="password"
        placeholder="Minimum 8 characters with letters and numbers"
        description="Use a strong password with mix of letters, numbers and symbols"
        value={formData?.password}
        onChange={onChange}
        error={errors?.password}
        required
        minLength={8}
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData?.confirmPassword}
        onChange={onChange}
        error={errors?.confirmPassword}
        required
      />
    </div>
  );
};

export default VerificationForm;