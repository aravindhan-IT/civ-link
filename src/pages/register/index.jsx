import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import RegistrationProgress from './components/RegistrationProgress';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressForm from './components/AddressForm';
import VerificationForm from './components/VerificationForm';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    ward: '',
    houseNumber: '',
    street: '',
    landmark: '',
    pincode: '',
    aadhaar: '',
    identityProof: null,
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, ward: value }));
    if (errors?.ward) {
      setErrors(prev => ({ ...prev, ward: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, identityProof: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, identityProof: file }));
      if (errors?.identityProof) {
        setErrors(prev => ({ ...prev, identityProof: '' }));
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    // Minimal validation - only check if required fields have some value
    if (step === 1) {
      if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!formData?.email?.trim()) newErrors.email = 'Email is required';
      if (!formData?.mobile?.trim()) newErrors.mobile = 'Mobile number is required';
      if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (step === 2) {
      if (!formData?.ward) newErrors.ward = 'Please select your ward';
      if (!formData?.houseNumber?.trim()) newErrors.houseNumber = 'House/Flat number is required';
      if (!formData?.street?.trim()) newErrors.street = 'Street/Area name is required';
      if (!formData?.pincode?.trim()) newErrors.pincode = 'PIN code is required';
    }

    if (step === 3) {
      if (!formData?.aadhaar?.trim()) newErrors.aadhaar = 'Aadhaar number is required';
      if (!formData?.password?.trim()) newErrors.password = 'Password is required';
      if (!formData?.confirmPassword?.trim()) newErrors.confirmPassword = 'Please confirm your password';
      if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateStep(3)) return;

    if (!termsAccepted) {
      alert('Please accept the terms and conditions to continue');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.email, formData.password, {
        name: formData.fullName,
        phone: formData.mobile,
        dateOfBirth: formData.dateOfBirth,
        ward: formData.ward,
        address: `${formData.houseNumber}, ${formData.street}, ${formData.landmark}`,
        pincode: formData.pincode,
        aadhaar: formData.aadhaar,
        role: 'resident' // Default role
      });

      alert('Registration successful! Please check your email for verification.');
      navigate('/home-dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = `Registration failed: ${error.message}`;

      // Firebase specific error codes
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters long.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please provide a valid email address (e.g., user@example.com).';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password registration is not enabled. Please use guest access or try again later.';
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - Civic Link | Town Panchayat Citizen Portal</title>
        <meta name="description" content="Create your Civic Link account to access panchayat services, report issues, and engage with local governance" />
      </Helmet>
      <div className="min-h-screen bg-background py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <Link to="/login" className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary/10 rounded-full mb-4 md:mb-5 lg:mb-6">
              <Icon name="Building2" size={32} color="var(--color-primary)" />
            </Link>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2 md:mb-3 lg:mb-4">
              Create Your Civic Link Account
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Join your community in transparent local governance
            </p>
          </div>

          <RegistrationProgress currentStep={currentStep} totalSteps={3} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-10">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-md p-6 md:p-8 lg:p-10">
                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-5 lg:mb-6">
                        Personal Information
                      </h2>
                      <PersonalInfoForm
                        formData={formData}
                        errors={errors}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-5 lg:mb-6">
                        Address Details
                      </h2>
                      <AddressForm
                        formData={formData}
                        errors={errors}
                        onChange={handleInputChange}
                        onSelectChange={handleSelectChange}
                      />
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-5 lg:mb-6">
                        Verification & Security
                      </h2>
                      <VerificationForm
                        formData={formData}
                        errors={errors}
                        onChange={handleInputChange}
                        onFileChange={handleFileChange}
                      />

                      <div className="mt-6 md:mt-7 lg:mt-8">
                        <Checkbox
                          label="I agree to the Terms of Service and Privacy Policy"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e?.target?.checked)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6 md:mt-8 lg:mt-10 pt-6 md:pt-7 lg:pt-8 border-t border-border">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        iconName="ChevronLeft"
                        iconPosition="left"
                      >
                        Previous
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        loading={isLoading}
                        iconName="UserPlus"
                        iconPosition="left"
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-6 md:mt-7 lg:mt-8 pt-6 md:pt-7 lg:pt-8 border-t border-border text-center">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-primary font-medium hover:underline transition-all duration-250"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <TrustSignals />

              <div className="mt-6 md:mt-8 lg:mt-10 bg-card rounded-lg shadow-sm p-4 md:p-6 lg:p-8">
                <div className="flex items-center space-x-2 mb-3 md:mb-4 lg:mb-5">
                  <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
                  <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
                    Need Help?
                  </h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground mb-3 md:mb-4 lg:mb-5">
                  Contact our support team for registration assistance
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
                    <span className="text-xs md:text-sm lg:text-base text-foreground">1800-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
                    <span className="text-xs md:text-sm lg:text-base text-foreground">support@CivicLink.gov.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;