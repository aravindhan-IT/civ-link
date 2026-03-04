import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLanguageChange, currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = [
    { username: 'resident@wardvoice.gov.in', password: 'Resident@123', role: 'resident' },
    { username: 'councillor@wardvoice.gov.in', password: 'Council@456', role: 'councillor' },
    { username: 'representative@wardvoice.gov.in', password: 'Rep@789', role: 'representative' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = currentLanguage === 'en' ?'Username or email is required' :'उपयोगकर्ता नाम या ईमेल आवश्यक है';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.username) && !formData?.username?.includes('@')) {
      newErrors.username = currentLanguage === 'en' ?'Please enter a valid email address' :'कृपया एक मान्य ईमेल पता दर्ज करें';
    }

    if (!formData?.password) {
      newErrors.password = currentLanguage === 'en' ?'Password is required' :'पासवर्ड आवश्यक है';
    } else if (formData?.password?.length < 6) {
      newErrors.password = currentLanguage === 'en' ?'Password must be at least 6 characters' :'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const validCredential = mockCredentials?.find(
        cred => cred?.username === formData?.username && cred?.password === formData?.password
      );

      if (validCredential) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', validCredential?.role);
        localStorage.setItem('userEmail', validCredential?.username);
        navigate('/home-dashboard');
      } else {
        setErrors({
          form: currentLanguage === 'en' ?'Invalid credentials. Please check your username and password.' :'अमान्य क्रेडेंशियल। कृपया अपना उपयोगकर्ता नाम और पासवर्ड जांचें।'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGuestAccess = () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('userRole', 'guest');
    navigate('/home-dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {errors?.form && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 md:p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} color="var(--color-destructive)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{errors?.form}</p>
          </div>
        </div>
      )}
      <Input
        label={currentLanguage === 'en' ? 'Username or Email' : 'उपयोगकर्ता नाम या ईमेल'}
        type="email"
        name="username"
        placeholder={currentLanguage === 'en' ? 'Enter your email address' : 'अपना ईमेल पता दर्ज करें'}
        value={formData?.username}
        onChange={handleChange}
        error={errors?.username}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label={currentLanguage === 'en' ? 'Password' : 'पासवर्ड'}
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder={currentLanguage === 'en' ? 'Enter your password' : 'अपना पासवर्ड दर्ज करें'}
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-250 ease-out"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-250 ease-out"
        >
          {currentLanguage === 'en' ? 'Forgot Password?' : 'पासवर्ड भूल गए?'}
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        {currentLanguage === 'en' ? 'Login' : 'लॉगिन करें'}
      </Button>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">
            {currentLanguage === 'en' ? 'OR' : 'या'}
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        fullWidth
        onClick={handleGuestAccess}
        iconName="UserCircle"
        iconPosition="left"
      >
        {currentLanguage === 'en' ? 'Continue as Guest' : 'अतिथि के रूप में जारी रखें'}
      </Button>
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          {currentLanguage === 'en' ? "Don't have an account? " : 'खाता नहीं है? '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-250 ease-out"
          >
            {currentLanguage === 'en' ? 'Register as New Resident' : 'नए निवासी के रूप में पंजीकरण करें'}
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;