import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLanguageChange, currentLanguage }) => {
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Minimal validation - only check if fields are not empty
    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'en' ? 'Email is required' : 'ईमेल आवश्यक है';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = currentLanguage === 'en' ? 'Password is required' : 'पासवर्ड आवश्यक है';
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
    setErrors({});

    try {
      await login(formData.email, formData.password);
      navigate('/home-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = currentLanguage === 'en'
        ? `Login failed: ${error.message}`
        : `लॉगिन विफल: ${error.message}`;

      if (error.code === 'auth/user-not-found') {
        errorMessage = currentLanguage === 'en'
          ? 'No account found with this email. Please register first.'
          : 'इस ईमेल पते के साथ कोई खाता नहीं मिला। कृपया पहले पंजीकरण करें।';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = currentLanguage === 'en'
          ? 'Incorrect password. Please try again.'
          : 'गलत पासवर्ड। कृपया पुनः प्रयास करें।';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = currentLanguage === 'en'
          ? 'Too many failed attempts. Please try again later.'
          : 'बहुत सारे विफल प्रयास। कृपया बाद में पुनः प्रयास करें।';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = currentLanguage === 'en'
          ? 'Invalid email format. Please provide a valid email (e.g., user@example.com).'
          : 'अमान्य ईमेल प्रारूप। कृपया वैध ईमेल प्रदान करें।';
      }

      setErrors({ form: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      await loginAsGuest();
      navigate('/home-dashboard');
    } catch (error) {
      console.error('Guest login error:', error);
      setErrors({ form: currentLanguage === 'en' ? 'Failed to continue as guest. Please try again.' : 'गेस्ट के रूप में जारी रखने में विफल। कृपया पुनः प्रयास करें।' });
    } finally {
      setIsLoading(false);
    }
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
        label={currentLanguage === 'en' ? 'Email Address' : 'ईमेल पता'}
        type="email"
        name="email"
        placeholder={currentLanguage === 'en' ? 'Enter your email address' : 'अपना ईमेल पता दर्ज करें'}
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
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