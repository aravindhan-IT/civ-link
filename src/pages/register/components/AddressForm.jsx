import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddressForm = ({ formData, errors, onChange, onSelectChange }) => {
  const wardOptions = [
    { value: 'ward1', label: 'Ward 1 - Gandhi Nagar' },
    { value: 'ward2', label: 'Ward 2 - Nehru Colony' },
    { value: 'ward3', label: 'Ward 3 - Ambedkar Street' },
    { value: 'ward4', label: 'Ward 4 - Patel Road' },
    { value: 'ward5', label: 'Ward 5 - Subhash Nagar' },
    { value: 'ward6', label: 'Ward 6 - Rajiv Chowk' },
    { value: 'ward7', label: 'Ward 7 - Indira Park' },
    { value: 'ward8', label: 'Ward 8 - Sardar Patel Nagar' }
  ];

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <Select
        label="Select Your Ward"
        options={wardOptions}
        value={formData?.ward}
        onChange={onSelectChange}
        error={errors?.ward}
        required
        searchable
        placeholder="Choose your ward"
      />
      <Input
        label="House/Flat Number"
        type="text"
        name="houseNumber"
        placeholder="Enter house or flat number"
        value={formData?.houseNumber}
        onChange={onChange}
        error={errors?.houseNumber}
        required
      />
      <Input
        label="Street/Area Name"
        type="text"
        name="street"
        placeholder="Enter street or area name"
        value={formData?.street}
        onChange={onChange}
        error={errors?.street}
        required
      />
      <Input
        label="Landmark (Optional)"
        type="text"
        name="landmark"
        placeholder="Nearby landmark for easy identification"
        value={formData?.landmark}
        onChange={onChange}
      />
      <Input
        label="PIN Code"
        type="text"
        name="pincode"
        placeholder="6-digit PIN code"
        value={formData?.pincode}
        onChange={onChange}
        error={errors?.pincode}
        required
        maxLength={6}
      />
    </div>
  );
};

export default AddressForm;